# -*- coding: utf-8 -*-
"""
Bộ máy luật phản ứng hữu cơ v0 (nguyên mẫu chạy bằng Python + RDKit).
Luật được viết lại theo SLIDE BÀI GIẢNG (chương 6, 7, 8, 9, 10, 11), không chép nguyên văn.
Mỗi luật có: id, chương nguồn, tên, từ khóa tác nhân (regex), điều kiện chất đầu (requires),
nhóm chức cấm (forbid), lời giải thích tiếng Việt, ghi chú quy ước.
"""
import re
from rdkit import Chem, RDLogger
from rdkit.Chem import AllChem

RDLogger.DisableLog("rdApp.*")

# ----------------------------------------------------------------- tiện ích
def norm(reagent):
    """Chuẩn hóa chuỗi tác nhân: chữ thường, bỏ khoảng trắng, bỏ số thứ tự bước."""
    s = (reagent or "").lower()
    for a, b in {"ν": "v", "₂": "2", "₃": "3", "₄": "4", "⁺": "+", "⁻": "-", "°": "", "º": "", "→": ";"}.items():
        s = s.replace(a, b)
    s = re.sub(r"\s+", "", s)
    s = re.sub(r"(^|[;,])\d\.", r"\1", s)
    return s

def mol(smi):
    m = Chem.MolFromSmiles(smi)
    if m is None:
        raise ValueError("SMILES không hợp lệ: " + smi)
    return m

def canon(m):
    m = Chem.Mol(m)
    for at in m.GetAtoms():
        if at.GetNumRadicalElectrons() == 0 and at.GetFormalCharge() == 0 and at.GetAtomicNum() in (6, 7, 8, 9, 12, 15, 16, 17, 35, 53) and at.GetNumExplicitHs() == 0:
            at.SetNoImplicit(False)
    try:
        m.UpdatePropertyCache(False)
    except Exception:
        pass
    smi = Chem.MolToSmiles(m)
    if "[Mg]" in smi:  # hợp chất cơ magie: bỏ ngoặc thừa quanh nguyên tử trung hòa
        m2 = Chem.MolFromSmiles(re.sub(r"\[(C|N|O|Br|Cl|I|F|S|P|Mg)\]", r"\1", smi))
        if m2 is not None:
            smi = Chem.MolToSmiles(m2)
    return smi

def clean(m):
    try:
        m = Chem.Mol(m)
        for a in m.GetAtoms():
            if a.GetNumRadicalElectrons() == 0 and a.GetFormalCharge() == 0 and a.GetAtomicNum() in (6, 7, 8, 9, 12, 15, 16, 17, 35, 53) and a.GetNumExplicitHs() == 0:
                a.SetNoImplicit(False)
        Chem.SanitizeMol(m)
        return m
    except Exception:
        return None

def split_products(m):
    return [Chem.MolToSmiles(x) for x in Chem.GetMolFrags(m, asMols=True)]

def run_smarts(smarts, *reactants):
    """Chạy một mẫu phản ứng, trả về tập SMILES sản phẩm (đã khử trùng lặp)."""
    rxn = AllChem.ReactionFromSmarts(smarts)
    out = []
    try:
        sets = rxn.RunReactants(tuple(reactants))
    except Exception:
        return out
    for ps in sets:
        parts = []
        ok = True
        for p in ps:
            q = clean(p)
            if q is None:
                ok = False
                break
            parts.append(canon(q))
        if ok:
            s = ".".join(sorted(parts))
            if s not in out:
                out.append(s)
    return out

def has(m, smarts):
    return m.HasSubstructMatch(Chem.MolFromSmarts(smarts))

def heavy_nbrs(a, exclude=()):
    return [n for n in a.GetNeighbors() if n.GetIdx() not in exclude and n.GetAtomicNum() > 1]

# nhóm chức dùng chung
FG = {
    "OH": "[OX2H][CX4]", "COOH": "[CX3](=O)[OX2H]", "NH": "[NX3;H1,H2;!$(NC=O)]",
    "CO": "[CX3]=[OX1]", "alkyneH": "[CX2;H1]#[CX2]", "SH": "[SX2H]", "nitro": "[N+](=O)[O-]",
    "phenolOH": "[OX2H]c",
}

# --------------------------------------------------------------- handler riêng
def h_radical_halogenation(m, X, selective, **kw):
    """Thế gốc tự do: ưu tiên vị trí benzyl/allyl; Br2 chọn chọn lọc, Cl2 cho hỗn hợp."""
    pat_special = Chem.MolFromSmarts("[CX4;!H0;$(C-[c,$(C=C)])]")
    special = {a[0] for a in m.GetSubstructMatches(pat_special)}
    sites = [a.GetIdx() for a in m.GetAtoms() if a.GetAtomicNum() == 6 and not a.GetIsAromatic()
             and a.GetHybridization() == Chem.HybridizationType.SP3 and a.GetTotalNumHs() > 0]
    if special:
        sites = [i for i in sites if i in special]
    if not sites:
        return []
    if selective:
        best = max(len(heavy_nbrs(m.GetAtomWithIdx(i))) for i in sites)
        sites = [i for i in sites if len(heavy_nbrs(m.GetAtomWithIdx(i))) == best]
    out = []
    for i in sites:
        rw = Chem.RWMol(m)
        x = rw.AddAtom(Chem.Atom(X))
        rw.AddBond(i, x, Chem.BondType.SINGLE)
        q = clean(rw)
        if q is not None:
            s = canon(q)
            if s not in out:
                out.append(s)
    return out

def _alkene_bonds(m):
    return [b for b in m.GetBonds() if b.GetBondType() == Chem.BondType.DOUBLE
            and b.GetBeginAtom().GetAtomicNum() == 6 and b.GetEndAtom().GetAtomicNum() == 6
            and not b.GetIsAromatic()]

def h_alkene_addition(m, group, anti=False, **kw):
    """Cộng H-Y vào anken theo Markovnikov (hoặc ngược lại)."""
    out = []
    for b in _alkene_bonds(m):
        a, c = b.GetBeginAtom(), b.GetEndAtom()
        na, nc = len(heavy_nbrs(a, {c.GetIdx()})), len(heavy_nbrs(c, {a.GetIdx()}))
        if na == nc:
            targets = [a.GetIdx(), c.GetIdx()]
        else:
            more = a.GetIdx() if na > nc else c.GetIdx()
            less = c.GetIdx() if na > nc else a.GetIdx()
            targets = [less] if anti else [more]
        for t in targets:
            rw = Chem.RWMol(m)
            rw.GetBondBetweenAtoms(a.GetIdx(), c.GetIdx()).SetBondType(Chem.BondType.SINGLE)
            y = rw.AddAtom(Chem.Atom(group))
            rw.AddBond(t, y, Chem.BondType.SINGLE)
            q = clean(rw)
            if q is not None and canon(q) not in out:
                out.append(canon(q))
    return out

def _cleave(m, bond_idx, oxidative, triple=False):
    rw = Chem.RWMol(m)
    b = rw.GetBondWithIdx(bond_idx)
    i, j = b.GetBeginAtomIdx(), b.GetEndAtomIdx()
    rw.RemoveBond(i, j)
    for k in (i, j):
        at = rw.GetAtomWithIdx(k)
        at.SetNoImplicit(False)
        at.SetNumExplicitHs(0)
        n_heavy = len(heavy_nbrs(at))
        o1 = rw.AddAtom(Chem.Atom(8))
        rw.AddBond(k, o1, Chem.BondType.DOUBLE)
        if triple or (oxidative and n_heavy == 1) or (oxidative and n_heavy == 0):
            o2 = rw.AddAtom(Chem.Atom(8))
            rw.AddBond(k, o2, Chem.BondType.SINGLE)
            if n_heavy == 0:  # CO2
                o3 = rw.AddAtom(Chem.Atom(8))
                # biến thành CO2: đổi o2 thành liên kết đôi
                rw.GetBondBetweenAtoms(k, o2).SetBondType(Chem.BondType.DOUBLE)
                rw.RemoveAtom(o3)
    return clean(rw)

def h_cleave_alkene(m, oxidative, **kw):
    out = []
    for b in _alkene_bonds(m):
        q = _cleave(m, b.GetIdx(), oxidative)
        if q is not None:
            s = ".".join(sorted(split_products(q)))
            if s not in out:
                out.append(s)
    return out

def h_cleave_alkyne(m, **kw):
    out = []
    pat = Chem.MolFromSmarts("[CX2]#[CX2]")
    for a, c in m.GetSubstructMatches(pat):
        if a > c:
            continue
        bidx = m.GetBondBetweenAtoms(a, c).GetIdx()
        q = _cleave(m, bidx, True, triple=True)
        if q is not None:
            s = ".".join(sorted(split_products(q)))
            if s not in out:
                out.append(s)
    return out

def _set_geometry(m, cis):
    """Đặt dạng cis/trans cho liên kết đôi vừa tạo từ ankin (nếu có thể)."""
    out = []
    for b in _alkene_bonds(m):
        a, c = b.GetBeginAtom(), b.GetEndAtom()
        na, nc = heavy_nbrs(a, {c.GetIdx()}), heavy_nbrs(c, {a.GetIdx()})
        if len(na) == 1 and len(nc) == 1:
            b.SetStereoAtoms(na[0].GetIdx(), nc[0].GetIdx())
            b.SetStereo(Chem.BondStereo.STEREOCIS if cis else Chem.BondStereo.STEREOTRANS)
    return m

def h_alkyne_to_alkene(m, cis, **kw):
    out = []
    for a, c in m.GetSubstructMatches(Chem.MolFromSmarts("[CX2]#[CX2]")):
        if a > c:
            continue
        rw = Chem.RWMol(m)
        rw.GetBondBetweenAtoms(a, c).SetBondType(Chem.BondType.DOUBLE)
        q = clean(rw)
        if q is None:
            continue
        q = _set_geometry(q, cis)
        Chem.AssignStereochemistry(q, force=True)
        s = canon(q)
        if s not in out:
            out.append(s)
    return out

def _beta_elimination(m, leaving_smarts):
    """Tách loại theo Zaitsev: chọn anken nhiều nhóm thế nhất."""
    cands = []
    pat = Chem.MolFromSmarts(leaving_smarts)  # [C:alpha]-[LG]
    for match in m.GetSubstructMatches(pat):
        ca, lg = match[0], match[1]
        for nb in m.GetAtomWithIdx(ca).GetNeighbors():
            if nb.GetIdx() == lg or nb.GetAtomicNum() != 6 or nb.GetIsAromatic():
                continue
            if nb.GetHybridization() != Chem.HybridizationType.SP3 or nb.GetTotalNumHs() == 0:
                continue
            rw = Chem.RWMol(m)
            rw.GetBondBetweenAtoms(ca, nb.GetIdx()).SetBondType(Chem.BondType.DOUBLE)
            rw.RemoveBond(ca, lg)
            # xóa nhóm đi: tìm thành phần chứa lg
            q = clean(rw)
            if q is None:
                continue
            frags = Chem.GetMolFrags(q, asMols=True, sanitizeFrags=True)
            main = max(frags, key=lambda f: f.GetNumHeavyAtoms())
            nsub = len(heavy_nbrs(rw.GetAtomWithIdx(ca), {nb.GetIdx(), lg})) + len(heavy_nbrs(nb, {ca}))
            cands.append((nsub, canon(main)))
    if not cands:
        return []
    best = max(c[0] for c in cands)
    out = []
    for n, s in cands:
        if n == best and s not in out:
            out.append(s)
    return out

def h_elim_halide(m, **kw):
    return _beta_elimination(m, "[CX4][Cl,Br,I]")

def h_dehydrate_alcohol(m, **kw):
    return _beta_elimination(m, "[CX4][OX2H]")

# ---- hóa học cơ magie
def h_grignard_form(m, **kw):
    pat = Chem.MolFromSmarts("[#6;$([CX4]),c][Cl,Br,I]")
    out = []
    for c_idx, x_idx in m.GetSubstructMatches(pat):
        rw = Chem.RWMol(m)
        rw.RemoveBond(c_idx, x_idx)
        mg = rw.AddAtom(Chem.Atom(12))
        rw.AddBond(c_idx, mg, Chem.BondType.SINGLE)
        rw.AddBond(mg, x_idx, Chem.BondType.SINGLE)
        q = clean(rw)
        if q is not None:
            out.append(canon(q))
    return out

def h_grignard_add(m, partner, **kw):
    p = mol(partner)
    if has(p, "O=C=O"):
        t = "[#6:1][Mg:5][Cl,Br,I].[O:2]=[C:3]=[O:4]>>[#6:1][C:3](=[O:2])[O:4]"
    elif has(p, "[CH2]=O"):
        t = "[#6:1][Mg][Cl,Br,I].[CH2:2]=[O:3]>>[#6:1][C:2][O:3]"
    elif has(p, "[CX3;H1](=O)[#6]"):
        t = "[#6:1][Mg][Cl,Br,I].[C:2](=[O:3])>>[#6:1][C:2][O:3]"
    elif has(p, "[#6][CX3](=O)[#6]"):
        t = "[#6:1][Mg][Cl,Br,I].[C:2](=[O:3])>>[#6:1][C:2][O:3]"
    elif has(p, "[CX4]1[OX2][CX4]1"):
        t = "[#6:1][Mg][Cl,Br,I].[CH2:2]1[O:3][C:4]1>>[#6:1][C:2][C:4][O:3]"
    else:
        return []
    return run_smarts(t, m, p)

# ---- thế ái điện tử vào nhân thơm
STRONG_ACT = ["[OX2H]", "[OX2][CX4]", "[OX1-]", "[NX3;H2]", "[NX3;H1;!$(NC=O)]", "[NX3;H0;!$(NC=O);!$([N+])]"]
MED_ACT = ["[NX3]C=O", "[OX2]C=O", "[CX4]", "c"]
HALOGEN = ["[F,Cl,Br,I]"]
META_DIR = ["[CX3]=O", "[N+](=O)[O-]", "C#N", "S(=O)(=O)[OH]", "[N+;!$([N+][O-])]", "C(F)(F)F"]

def _ring_substituents(m):
    """Tìm vòng benzen đầu tiên và nhóm thế trên từng vị trí."""
    ri = m.GetRingInfo()
    for ring in ri.AtomRings():
        if len(ring) == 6 and all(m.GetAtomWithIdx(i).GetIsAromatic() and m.GetAtomWithIdx(i).GetAtomicNum() == 6 for i in ring):
            return list(ring)
    return None

def _rank(m, ring_atom, sub_atom):
    """Điểm định hướng: dương = đẩy điện tử (o/p), âm = hút (meta), 1 = halogen."""
    # đánh giá bằng cách khớp nhóm thế tại nguyên tử gắn vào vòng
    sa = m.GetAtomWithIdx(sub_atom)
    sym, n_h = sa.GetSymbol(), sa.GetTotalNumHs()
    nbrs = [n.GetIdx() for n in sa.GetNeighbors() if n.GetIdx() != ring_atom]
    if sa.GetFormalCharge() == -1 and sym == "O":
        return 5
    if sym == "O":
        acyl = any(m.GetAtomWithIdx(k).GetSymbol() == "C" and any(
            nb.GetSymbol() == "O" and m.GetBondBetweenAtoms(k, nb.GetIdx()).GetBondType() == Chem.BondType.DOUBLE
            for nb in m.GetAtomWithIdx(k).GetNeighbors()) for k in nbrs)
        return 3 if acyl else 5
    if sym == "N":
        if sa.GetFormalCharge() == 1:
            return -3
        if has_pattern_at(m, sub_atom, "N(=O)=O") or any(m.GetAtomWithIdx(k).GetSymbol() == "O" for k in nbrs):
            return -5
        acyl = any(m.GetAtomWithIdx(k).GetSymbol() == "C" and any(
            nb.GetSymbol() == "O" and m.GetBondBetweenAtoms(k, nb.GetIdx()).GetBondType() == Chem.BondType.DOUBLE
            for nb in m.GetAtomWithIdx(k).GetNeighbors()) for k in nbrs)
        return 3 if acyl else 5
    if sym in ("F", "Cl", "Br", "I"):
        return 1
    if sym == "S":
        return -4
    if sym == "C":
        if sa.GetIsAromatic():
            return 2
        dbl_o = any(m.GetBondBetweenAtoms(sub_atom, k).GetBondType() == Chem.BondType.DOUBLE and m.GetAtomWithIdx(k).GetSymbol() == "O" for k in nbrs)
        trip_n = any(m.GetBondBetweenAtoms(sub_atom, k).GetBondType() == Chem.BondType.TRIPLE for k in nbrs)
        cf3 = sum(1 for k in nbrs if m.GetAtomWithIdx(k).GetSymbol() == "F") >= 3
        if dbl_o or trip_n or cf3:
            return -4
        return 2
    return 0

def has_pattern_at(m, idx, smarts):
    return False

def _eas_positions(m, ring):
    """Trả về (tập vị trí cho phép, tên, ghi chú) theo nhóm thế mạnh nhất."""
    subs = {}
    for pos, a in enumerate(ring):
        for nb in m.GetAtomWithIdx(a).GetNeighbors():
            if nb.GetIdx() not in ring and nb.GetAtomicNum() > 1:
                subs[pos] = nb.GetIdx()
    free = [p for p, a in enumerate(ring) if p not in subs and m.GetAtomWithIdx(ring[p]).GetTotalNumHs() > 0]
    if not subs:
        return free[:1], "benzen (mọi vị trí tương đương)", []
    ranks = {p: _rank(m, ring[p], s) for p, s in subs.items()}
    top = max(ranks.values())
    dirs = [p for p, r in ranks.items() if r == top]
    notes = []
    allowed_sets = []
    for p in dirs:
        if top > 0:  # o/p
            pos = {(p + 1) % 6, (p - 1) % 6, (p + 3) % 6}
        else:        # meta
            pos = {(p + 2) % 6, (p - 2) % 6}
        allowed_sets.append(pos & set(free))
    allowed = set.intersection(*allowed_sets) if len(allowed_sets) > 1 and set.intersection(*allowed_sets) else set.union(*allowed_sets)
    kind = "o/p" if top > 0 else "meta"
    def flanked(p):
        return (((p + 1) % 6) in subs) and (((p - 1) % 6) in subs)
    unhindered = {p for p in allowed if not flanked(p)}
    if unhindered:
        allowed = unhindered
    return sorted(allowed), kind, ranks

def _attach(m, ring_atom, group_mol, group_atom, leaving=None):
    """Nối nguyên tử vòng với nguyên tử group_atom của gốc group_mol; bỏ nhóm leaving nếu có."""
    c = Chem.CombineMols(m, group_mol)
    rw = Chem.RWMol(c)
    off = m.GetNumAtoms()
    rw.AddBond(ring_atom, off + group_atom, Chem.BondType.SINGLE)
    if leaving is not None:
        rw.RemoveBond(off + group_atom, off + leaving)
    q = clean(rw)
    if q is None:
        return None
    frags = Chem.GetMolFrags(q, asMols=True)
    for f in frags:
        pass
    # giữ mảnh lớn nhất chứa vòng
    main = max(frags, key=lambda f: f.GetNumHeavyAtoms())
    return main

def h_eas(m, group, partner=None, tri=False, only_para=False, **kw):
    ring = _ring_substituents(m)
    if ring is None:
        return []
    allowed, kind, ranks = _eas_positions(m, ring)
    if not allowed:
        return []
    if only_para:
        sub_pos = [p for p in allowed if any(((p - q) % 6) == 3 for q in (ranks or {}).keys())]
        allowed = sub_pos or allowed
    # nhóm thế sẽ gắn
    if group == "NO2":
        g, ga, lv = mol("[N+](=O)[O-]"), 0, None
    elif group == "SO3H":
        g, ga, lv = mol("S(=O)(=O)O"), 0, None
    elif group in ("Br", "Cl", "I"):
        g, ga, lv = mol(group), 0, None
    elif group == "alkyl":
        g = mol(partner)
        mt = g.GetSubstructMatches(Chem.MolFromSmarts("[CX4][Cl,Br,I]"))
        if not mt:
            return []
        ga, lv = mt[0]
    elif group == "acyl":
        g = mol(partner)
        mt = g.GetSubstructMatches(Chem.MolFromSmarts("[CX3](=O)[Cl,$(O[CX3]=O)]"))
        if not mt:
            return []
        ga, lv = mt[0][0], mt[0][2]
    else:
        return []
    if tri:
        cur = Chem.Mol(m)
        positions = list(allowed)
        # thay lần lượt cho đến hết các vị trí o/p
        idxs = [ring[p] for p in positions]
        for ra in idxs:
            cur = _attach(cur, ra, g, ga, lv)
            if cur is None:
                return []
        return [canon(cur)]
    out = []
    for p in allowed:
        q = _attach(m, ring[p], g, ga, lv)
        if q is not None and canon(q) not in out:
            out.append(canon(q))
    return out

def h_azo_coupling(m, partner, **kw):
    """Muối điazoni ghép với arene giàu điện tử, thế ở vị trí para (hoặc ortho nếu para bị chiếm)."""
    p = mol(partner)
    ring = _ring_substituents(p)
    allowed, kind, ranks = _eas_positions(p, ring)
    if not allowed:
        return []
    para = [pp for pp in allowed if any(((pp - q) % 6) == 3 for q in ranks.keys())]
    pos = (para or allowed)[0]
    d = Chem.RWMol(m)
    for a, b in d.GetSubstructMatches(Chem.MolFromSmarts("[c][N+]#[N]")) and [(0, 0)]:
        pass
    mt = m.GetSubstructMatches(Chem.MolFromSmarts("[c][N+:1]#[N:2]"))
    if not mt:
        return []
    c_i, n1, n2 = mt[0]
    rw = Chem.RWMol(Chem.CombineMols(m, p))
    rw.GetAtomWithIdx(n1).SetFormalCharge(0)
    rw.GetBondBetweenAtoms(n1, n2).SetBondType(Chem.BondType.DOUBLE)
    rw.AddBond(n2, m.GetNumAtoms() + ring[pos], Chem.BondType.SINGLE)
    q = clean(rw)
    return [canon(q)] if q is not None else []

def _anhydride_open(ag, nu):
    """Anhydrit (kể cả vòng) + amin/ancol: cắt liên kết C(=O)-O-C(=O), nhóm Nu gắn vào một C=O, nửa kia thành axit."""
    pat = Chem.MolFromSmarts("[CX3:1](=O)[OX2:2][CX3:3]=O")
    nu_pat = Chem.MolFromSmarts("[$([NX3;H3,H2,H1;!$(NC=O)]),$([OX2H][#6;!$(C=O)])]")
    outs = []
    for c1, _o, o2, c3 in [(m[0], m[2], m[3], m[4]) for m in ag.GetSubstructMatches(pat)] if False else []:
        pass
    seen = []
    for mt in ag.GetSubstructMatches(Chem.MolFromSmarts("[CX3](=O)[OX2][CX3]=O")):
        c1, o1, ob, c2, o2 = mt
        for acyl_c in (c1, c2):
            for nm in nu.GetSubstructMatches(nu_pat):
                key = (acyl_c, nm[0])
                if key in seen:
                    continue
                seen.append(key)
                comb = Chem.CombineMols(ag, nu)
                rw = Chem.RWMol(comb)
                rw.RemoveBond(acyl_c, ob)
                rw.AddBond(acyl_c, ag.GetNumAtoms() + nm[0], Chem.BondType.SINGLE)
                q = clean(rw)
                if q is None:
                    continue
                frags = Chem.GetMolFrags(q, asMols=True)
                main = max(frags, key=lambda f: f.GetNumHeavyAtoms())
                s = canon(main)
                if s not in outs:
                    outs.append(s)
    return outs

def h_acyl_transfer(a, b, **kw):
    """Axyl hóa: clorua axit hoặc anhydrit + amin/ancol/phenol/NH3."""
    acyl_p = Chem.MolFromSmarts("[CX3](=O)[Cl,$(O[CX3]=O)]")
    if a.HasSubstructMatch(acyl_p):
        ag, nu = a, b
    elif b is not None and b.HasSubstructMatch(acyl_p):
        ag, nu = b, a
    else:
        return []
    outs = []
    t_n = "[CX3:1](=[O:2])Cl.[NX3;H3,H2,H1;!$(NC=O):3]>>[C:1](=[O:2])[N:3]"
    t_o = "[CX3:1](=[O:2])Cl.[OX2H:3][#6;!$(C=O):4]>>[C:1](=[O:2])[O:3][#6:4]"
    t_n2 = "[CX3:1](=[O:2])[O:5][CX3:6]=[O:7].[NX3;H3,H2,H1;!$(NC=O):3]>>[C:1](=[O:2])[N:3].[C:6](=[O:7])[O:5]"
    t_o2 = "[CX3:1](=[O:2])[O:5][CX3:6]=[O:7].[OX2H:3][#6;!$(C=O):4]>>[C:1](=[O:2])[O:3][#6:4].[C:6](=[O:7])[O:5]"
    for q in _anhydride_open(ag, nu):
        if q not in outs:
            outs.append(q)
    for t in (t_n, t_o):
        for s in run_smarts(t, ag, nu):
            # chỉ giữ sản phẩm chứa nhóm acyl vừa tạo; bỏ mảnh phụ
            frags = [f for f in s.split(".")]
            main = max(frags, key=len)
            if main not in outs:
                outs.append(main)
    return outs

# ------------------------------------------------------------------ bảng luật
def _gate(m, smarts):
    return smarts is None or has(m, smarts)

RULES = []

def rule(id, chap, name, all_of, why, requires=None, forbid=None, none_of=(), smarts=None, handler=None,
         params=None, needs_partner=False, partner_kind=None, convention=None, byproducts=None):
    RULES.append(dict(id=id, chap=chap, name=name, all_of=all_of, none_of=list(none_of), why=why,
                      requires=requires, forbid=forbid, smarts=smarts, handler=handler,
                      params=params or {}, needs_partner=needs_partner, partner_kind=partner_kind, convention=convention,
                      byproducts=byproducts))

# ---- Ankan / aren: thế gốc (C7, C8)
rule("R_RAD_CL", "C7,C8", "Thế gốc tự do bằng Cl2/hv", [r"cl2", r"hv|as$|as;|uv|130|ánh|anh"], 
     "Cl2 + ánh sáng tạo gốc Cl•. Cl• ít chọn lọc nên thế vào mọi vị trí C-H (cho hỗn hợp); nếu có H ở vị trí benzyl/allyl thì thế ở đó vì gốc bền hơn.",
     requires="[CX4;!H0]", handler="radical", params=dict(X=17, selective=False), none_of=[r"febr3|fecl3|alcl3"])
rule("R_RAD_BR", "C7,C8", "Thế gốc tự do bằng Br2/hv", [r"br2", r"hv|as$|as;|uv|ánh|anh"],
     "Br2 + ánh sáng: Br• chọn lọc cao, thế vào C có bậc cao nhất (bậc 3 > bậc 2 > bậc 1); vị trí benzyl/allyl được ưu tiên hơn cả.",
     requires="[CX4;!H0]", handler="radical", params=dict(X=35, selective=True), none_of=[r"febr3|fecl3|alcl3|ch3cooh|oh-"])

# ---- Anken: cộng (nền tảng cho C6, C9)
rule("R_ALK_HBR", "nền", "Cộng HX vào anken (Markovnikov)", [r"^h(br|cl|i)$"], 
     "H+ cộng vào C có nhiều H hơn, X- vào C có nhiều nhóm thế hơn (carbocation bậc cao bền hơn).",
     requires="[CX3;!$(C=O)]=[CX3]", handler="addition", params=dict(group=None, anti=False))
rule("R_ALK_HBR_PER", "nền", "Cộng HBr có peoxit (ngược Markovnikov)", [r"hbr", r"peoxit|peroxit|peroxide|roor|h2o2"],
     "Có peoxit: cơ chế gốc tự do, Br• cộng vào C ít nhóm thế hơn, tạo gốc bậc cao bền hơn. Chỉ đúng với HBr.",
     requires="[CX3]=[CX3]", handler="addition", params=dict(group=35, anti=True))
rule("R_ALK_H2O", "C9", "Hiđrat hóa anken (H2O/H2SO4)", [r"h2o", r"h2so4|h3po4|h\+"], 
     "Cộng nước theo Markovnikov, OH vào C nhiều nhóm thế hơn.", requires="[CX3;!$(C=O)]=[CX3]",
     none_of=[r"b2h6|bh3|hgso4|lialh4|o3|kmno4"], handler="addition", params=dict(group=8, anti=False))
rule("R_ALK_HYDROB", "C6,C9", "Hiđrobo hóa – oxi hóa anken", [r"b2h6|bh3|bhr2", r"h2o2"],
     "Cộng ngược Markovnikov: B vào C ít nhóm thế, sau đó H2O2/OH- thay B bằng OH; cho ancol bậc thấp.",
     requires="[CX3;!$(C=O)]=[CX3]", handler="addition", params=dict(group=8, anti=True))
rule("R_ALK_H2", "nền", "Hiđro hóa anken/ankin (H2/Ni, Pt, Pd)", [r"h2", r"ni|pt|pd"], 
     "Cộng H2 vào nối đôi/ba trên xúc tác kim loại, thành ankan.", requires="[CX3,CX2;!$(C=O)]=,#[CX3,CX2]",
     none_of=[r"baso4|lindlar|nh3|ch3cho|nh2|nhch|rnh2|n2h4|ketone|=o"], smarts=["[CX3:1]=[CX3:2]>>[C:1][C:2]", "[CX2:1]#[CX2:2]>>[C:1][C:2]"], params=dict(exhaustive=True))
rule("R_ALK_BR2", "C6", "Cộng Br2/CCl4", [r"br2", r"ccl4"], "Br2 cộng trans vào nối đôi tạo dẫn xuất dibrom vic.",
     requires="[CX3]=[CX3]", smarts=["[CX3:1]=[CX3:2]>>[C:1](Br)[C:2]Br"])
rule("R_ALKYNE_BR2", "C6", "Cộng Br2/CCl4 vào ankin", [r"br2", r"ccl4"], "Mol đầu cho dibromanken (trans); dư Br2 cho tetrabromua.",
     requires="[CX2]#[CX2]", smarts=["[CX2:1]#[CX2:2]>>[C:1](Br)=[C:2]Br"])
rule("R_ALK_CLEAVE_RED", "C10,C9", "Ozon phân anken (khử: Zn/H3O+ hoặc Zn/CH3COOH)", [r"o3", r"zn|dms|me2s|\(ch3\)2s"],
     "Cắt nối đôi C=C, mỗi C thành C=O: anđehit nếu còn H, xeton nếu không còn H.",
     requires="[CX3;!$(C=O)]=[CX3]", handler="cleave_alkene", params=dict(oxidative=False))
rule("R_ALK_CLEAVE_O3_H2O", "C10", "Ozon phân anken (O3 rồi H2O)", [r"o3", r"h2o$|h2o;|h2o\b"], 
     "Cắt nối đôi C=C; theo cách ghi của đề, bước 2 là H2O (không có Zn) thì xem như xử lý khử.",
     requires="[CX3;!$(C=O)]=[CX3]", none_of=[r"zn"], handler="cleave_alkene", params=dict(oxidative=False),
     convention="Sách khác có thể coi H2O/H2O2 cho axit; đề yêu cầu ghi rõ có Zn hay không.")
rule("R_ALK_KMNO4", "nền,C9", "KMnO4 nóng cắt mạch anken", [r"kmno4", r"t|nong|nóng|dd"], 
     "KMnO4 nóng, đậm đặc cắt C=C: C còn H thành axit (C=CH2 thành CO2), C không còn H thành xeton.",
     requires="[CX3;!$(C=O)]=[CX3]", none_of=[r"h2so4.*ch3|cn"], handler="cleave_alkene", params=dict(oxidative=True))

# ---- Ankin (C6)
rule("R_YNE_LINDLAR", "C6", "Hiđro hóa ankin bằng Pd/BaSO4 (Lindlar) cho cis-anken", [r"h2", r"baso4|lindlar|pd.*(s|quinolin)"],
     "Xúc tác bị đầu độc dừng ở anken, cộng cùng phía nên cho dạng cis.", requires="[CX2]#[CX2]", handler="yne_ene", params=dict(cis=True))
rule("R_YNE_NA_NH3", "C6", "Khử ankin bằng Na/NH3 lỏng cho trans-anken", [r"na", r"nh3"], 
     "Khử qua gốc anion, cộng ngược phía nên cho dạng trans.", requires="[CX2]#[CX2]", none_of=[r"nanh2"], handler="yne_ene", params=dict(cis=False))
rule("R_YNE_H2O", "C6", "Hiđrat hóa ankin (HgSO4/H2SO4)", [r"hgso4"], 
     "Cộng nước theo Markovnikov cho enol, enol chuyển vị thành xeton (axetilen cho anđehit axetic).",
     requires="[CX2]#[CX2]", smarts=["[CH1:1]#[CH1:2]>>[CH3:1][CH1:2]=O", "[#6:1][CX2;H0:2]#[CH1:3]>>[#6:1][C:2](=O)[CH3:3]", "[#6;!$([CH1]):1][C;H0:2]#[C;H0:4][#6:5]>>[#6:1][C:2](=O)[CH2:4][#6:5]"])
rule("R_YNE_HYDROB", "C6", "Hiđrobo hóa – oxi hóa ankin đầu mạch", [r"bh3|bhr2|b2h6", r"h2o2"], 
     "Cộng ngược Markovnikov, enol chuyển thành anđehit (ankin đầu mạch cho anđehit).",
     requires="[CX2]#[CX2;H1]", smarts=["[#6:1][CX2:2]#[CH1:3]>>[#6:1][CH2:2][CH1:3]=O"])
rule("R_YNE_HX", "C6", "Cộng HX vào ankin (1 mol): halogenanken", [r"^h(cl|br|i)$"], 
     "Cộng theo Markovnikov, X vào C bậc cao hơn; dư HX cho gem-dihalogenua.", requires="[CX2]#[CX2]",
     smarts=["[#6:1][CX2;H0:2]#[CH1:3]>>[#6:1][C:2](Cl)=[CH2:3]"])
rule("R_YNE_HX_DU", "C6", "Cộng HX dư vào ankin: gem-dihalogenua", [r"^h(cl|br|i)(du|dư|excess|\(2)"], 
     "Mol thứ hai cộng tiếp vào C đã có X (Markovnikov), cho hai halogen cùng một C.", requires="[CX2]#[CX2]",
     smarts=["[#6:1][CX2;H0:2]#[CH1:3]>>[#6:1][C:2](Cl)(Cl)[CH3:3]", "[#6:1][CX2;H0:2]#[CX2;H0:3][#6:4]>>[#6:1][C:2](Cl)(Cl)[CH2:3][#6:4]"])
rule("R_YNE_ACID", "C6", "Ankin đầu mạch có tính axit (NaNH2)", [r"nanh2|na/nh3.*lỏng"], 
     "Liên kết ≡C-H có tính axit (sp) nên bị bazơ mạnh tách H+ cho muối axetilua.", requires="[CX2;H1]#[CX2]",
     smarts=["[#6:1]#[CH1:2]>>[#6:1]#[C-:2]", "[CH1:1]#[CH1:2]>>[CH1:1]#[C-:2]"], byproducts=".[Na+]")
rule("R_YNE_ALKYL", "C6", "Ankyl hóa axetilua bằng halogenua ankyl", [r"nanh2|na"], 
     "Ion axetilua là tác nhân ái nhân (SN2), tấn công halogenua ankyl bậc 1 để nối thêm mạch cacbon.",
     requires="[CX2;H1]#[CX2]", needs_partner=True, partner_kind="[CX4][Cl,Br,I]", forbid=None,
     smarts=["[#6:1]#[CH1:2].[CH3,CH2;X4:3][Cl,Br,I]>>[#6:1]#[C:2][C:3]", "[CH1:1]#[CH1:2].[CH3,CH2;X4:3][Cl,Br,I]>>[CH1:1]#[C:2][C:3]"])
rule("R_YNE_OX", "C6", "Oxi hóa ankin bằng KMnO4/t° hoặc O3 rồi H2O", [r"kmno4|o3"], 
     "Cắt nối ba: mỗi C thành axit cacboxylic; ankin đầu mạch cho thêm CO2.", requires="[CX2]#[CX2]", handler="cleave_alkyne")

# ---- Aren (C7)
rule("R_EAS_NITRO", "C7", "Nitro hóa (HNO3/H2SO4)", [r"hno3"], "Tác nhân điện tử NO2+ thế vào nhân thơm. Nhóm thế sẵn có quyết định vị trí.",
     requires="c", none_of=[r"nano2|ch3cooh"], handler="eas", params=dict(group="NO2"))
rule("R_EAS_SULFO", "C7", "Sunfo hóa (H2SO4 đặc)", [r"h2so4"], "Tác nhân SO3/HSO3+ thế vào nhân thơm (phản ứng thuận nghịch).",
     requires="c", none_of=[r"hno3|180|170|140|thuy|h3o|ch3cooh|ete|khan|/ho|kmno4|cro|cr2o7|mgbr|mgcl|ch3|^h2so4;h2o"], handler="eas", params=dict(group="SO3H"),
     convention="Slide phenol: ~20°C cho ortho, ~100°C cho para.")
rule("R_EAS_HALO", "C7", "Halogen hóa nhân thơm (X2 + xúc tác axit Lewis)", [r"(cl2|br2)", r"fe|alcl3|zncl2|febr3|xt"], 
     "X2 phân cực bởi axit Lewis thành X+ thế vào nhân thơm (không dùng ánh sáng).", requires="c",
     handler="eas", params=dict(group=None))
rule("R_EAS_FC_ALKYL", "C7", "Ankyl hóa Friedel-Crafts (R-X/AlCl3)", [r"alcl3|axitlewis|acidlewis|febr3|fecl3|bf3|zncl2"],
     "Cacbocation R+ thế vào nhân thơm; nhóm ankyl đẩy điện tử nên dễ thế nhiều lần.", requires="c", needs_partner=True,
     partner_kind="[CX4][Cl,Br,I]", handler="eas", params=dict(group="alkyl"),
     convention="Thực tế vòng bị khử hoạt hóa mạnh (NO2, C=O...) thường không tham gia F-C; đề vẫn có thể cho đáp án thế vào meta.")
rule("R_EAS_FC_ACYL", "C7,C9", "Axyl hóa Friedel-Crafts (RCOCl hoặc anhydrit/AlCl3)", [r"alcl3|axitlewis|acidlewis"],
     "Cation acylium RCO+ thế vào nhân thơm cho ceton thơm; nhóm axyl hút điện tử nên chỉ thế một lần.", requires="c",
     needs_partner=True, partner_kind="[CX3](=O)[Cl,$(O[CX3]=O)]", handler="eas", params=dict(group="acyl"),
     convention="Thực tế vòng bị khử hoạt hóa mạnh (NO2, CHO...) thường không tham gia F-C; đề vẫn có thể cho đáp án thế vào meta.")

# ---- Phenol (C9)
rule("R_PHENOL_BR_H2O", "C9", "Phenol + Br2/H2O: 2,4,6-tribromphenol", [r"br2", r"h2o"], "OH rất mạnh đẩy điện tử, nước làm phân cực Br2 nên thế cả 3 vị trí o, p.",
     requires="[OX2H]c", none_of=[r"ccl4"], handler="eas", params=dict(group="Br", tri=True))
rule("R_PHENOL_BR_CCL4", "C9", "Phenol + Br2/CCl4 (0°C): 4-bromphenol", [r"br2", r"ccl4"], "Dung môi không phân cực, nhiệt độ thấp: chỉ thế một lần, ưu tiên para (theo slide).",
     requires="[OX2H]c", handler="eas", params=dict(group="Br", only_para=True))
rule("R_PHENOL_HNO3_LOANG", "C9", "Phenol + HNO3 loãng: o- và p-nitrophenol", [r"hno3", r"loang|loãng|dilute"], "OH định hướng o/p; axit loãng chỉ nitro hóa một lần.",
     requires="[OX2H]c", handler="eas", params=dict(group="NO2"))
rule("R_PHENOL_HNO3_DAC", "C9", "Phenol + HNO3 đặc: 2,4,6-trinitrophenol (axit picric)", [r"hno3", r"dac|đặc|conc|dd$|đđ|ññ"], "Axit đặc nitro hóa cả 3 vị trí o, p.",
     requires="[OX2H]c", none_of=[r"loang|loãng"], handler="eas", params=dict(group="NO2", tri=True))
rule("R_ACID_PHENOL", "C9", "Phenol có tính axit: phản ứng với NaOH", [r"naoh|koh"], "Phenol axit mạnh hơn nước (nhờ liên hợp +C của anion phenolat) nên tác dụng với bazơ mạnh cho muối phenolat.",
     requires="[OX2H]c", none_of=[r"nahco3"], smarts=["[OX2H:1][c:2]>>[O-:1][c:2]"], byproducts=".[Na+]")
rule("R_PHENOL_NAHCO3", "C9", "Phenol không phản ứng với NaHCO3", [r"nahco3"], "Phenol yếu hơn axit cacbonic nên không đẩy được CO2 khỏi NaHCO3.", requires="[OX2H]c", smarts=["[OX2H:1][c:2]>>[OX2H:1][c:2]"],
     convention="Đáp án là 'không phản ứng'.")
rule("R_WILLIAMSON_ARYL", "C9", "Ete hóa phenol bằng halogenua ankyl (Williamson)", [r"naoh|koh|oh-"], "Phenolat là tác nhân ái nhân (SN2) tấn công halogenua ankyl cho aryl ete.",
     requires="[OX2H]c", needs_partner=True, partner_kind="[CX4][Cl,Br,I]", smarts=["[OX2H:1][c:2].[CX4:3][Cl,Br,I]>>[O:1]([c:2])[C:3]"])

# ---- Dẫn xuất halogen (C8)
rule("R_SN_OH", "C8", "Thế ái nhân bằng OH- (NaOH/KOH loãng, dd)", [r"naoh|koh", r"dd|aq|h2o|loang|loãng"], "OH- thay halogen (SN2/SN1) cho ancol.",
     requires="[CX4][Cl,Br,I]", none_of=[r"etoh|ancol|dmso|alc|nahco3|ruou|rượu"], smarts=["[CX4:1][Cl,Br,I]>>[C:1][OH]"])
rule("R_SN_CN", "C8", "Tạo nitril (KCN/NaCN)", [r"kcn|nacn|cn-"], "CN- là tác nhân ái nhân, thay halogen và nối thêm một carbon; nitril thủy phân thành axit.", requires="[CX4][Cl,Br,I]",
     smarts=["[CX4:1][Cl,Br,I]>>[C:1]C#N"])
rule("R_SN_NH3", "C8", "Amoniac giải halogenua ankyl", [r"nh3"], "NH3 thay halogen cho amin bậc 1 (thực tế lẫn amin bậc cao do thế nhiều lần).", requires="[CX4][Cl,Br,I]",
     none_of=[r"ch3cocl|lialh4|nano2|agnh3|ag\(nh3|ag\(nh|h2.*ni"], smarts=["[CX4:1][Cl,Br,I]>>[C:1][NH2]"])
rule("R_E2", "C8", "Tách loại HX (KOH/EtOH, OH-/DMSO, nhiệt): quy tắc Zaitsev", [r"koh|naoh|oh-|etok|etona|ona", r"etoh|ancol|dmso|alc|ruou|rượu|t$|^t"], "Bazơ mạnh kèm đun nóng tách H ở C bên cạnh, tạo anken nhiều nhóm thế nhất (Zaitsev).",
     requires="[CX4][Cl,Br,I]", none_of=[r"dd"], handler="elim_halide")
rule("R_ALKYNE_FROM_DIHALIDE", "C6", "Dihalogenua + bazơ mạnh tạo ankin", [r"koh/etoh|nanh2"], "Tách hai phân tử HX liên tiếp từ dihalogenua cho ankin.",
     requires="[CX4]([Br,Cl])[CX4][Br,Cl]", smarts=["[C:1]([Br,Cl])[C:2][Br,Cl]>>[C:1]#[C:2]"], none_of=[r"^$"])
rule("R_GRIGNARD_FORM", "C8", "Tạo tác chất Grignard (Mg/ete khan)", [r"^mg", r"ete|eter|ether"], "Mg chèn vào liên kết C-X trong ete khan cho R-MgX; nguyên tử C trở thành tác nhân ái nhân và bazơ mạnh.",
     requires="[#6;$([CX4]),c][Cl,Br,I]", handler="grignard_form",
     forbid=["[OX2H]", "[NX3;H1,H2]", "[CX3]=O", "[CX2;H1]#[CX2]", "[SX2H]", "[N+](=O)[O-]", "C#N", "[CX3](=O)[OX2H]"])
rule("R_GRIGNARD_ADD", "C10,C8", "Grignard cộng vào C=O / CO2 / epoxit, rồi H3O+", [r"h3o\+|h\+|h2o"], "R- tấn công C của C=O (cộng AN); bước H3O+ proton hóa ancolat. CO2 cho axit, HCHO cho ancol bậc 1, anđehit khác cho ancol bậc 2, xeton cho bậc 3, epoxit thêm 2 C và cho ancol bậc 1.",
     requires="[Mg]", needs_partner=True, partner_kind="[$(O=C=O),$([CX3]=O),$([CX4]1[OX2][CX4]1)]", handler="grignard_add")
rule("R_GRIGNARD_H2O", "C8", "Grignard bị proton hóa bởi H2O/ancol/axit (H linh động)", [r"^h2o$"], "R-MgX là bazơ rất mạnh, lấy H linh động (H2O, ROH, RCOOH, NH3, ankin đầu mạch) cho ankan R-H.",
     requires="[Mg]", smarts=["[#6:1][Mg][Cl,Br,I]>>[#6:1]"])

# ---- Ancol (C9)
rule("R_OX_PCC", "C9", "PCC/CH2Cl2: oxi hóa ancol dừng ở anđehit/xeton", [r"pcc"], "PCC là chất oxi hóa êm: ancol bậc 1 thành anđehit (không lên axit), ancol bậc 2 thành xeton.",
     requires="[CX4;H1,H2][OX2H]", smarts=["[CX4;H1,H2:1][OX2H:2]>>[C:1]=[O:2]"])
rule("R_OX_STRONG", "C9", "K2Cr2O7, Na2Cr2O7, H2CrO4, KMnO4: oxi hóa ancol", [r"cr2o7|h2cro4|kmno4|cro3|jones"], "Chất oxi hóa mạnh: ancol bậc 1 lên axit, ancol bậc 2 thành xeton, ancol bậc 3 không bị oxi hóa.",
     requires="[CX4;H1,H2][OX2H]", none_of=[r"pcc"], smarts=["[CX4;H2:1][OX2H:2]>>[C:1](=[O:2])O", "[CX4;H1:1]([#6:3])([#6:4])[OX2H:2]>>[C:1](=[O:2])([#6:3])[#6:4]"],
     convention="Với anken/ankin, các chất này cắt mạch (xem luật KMnO4).")
rule("R_OX_ALDEHYDE_STRONG", "C10", "Oxi hóa anđehit lên axit", [r"cr2o7|h2cro4|kmno4|cro3"], "Anđehit còn H ở C=O rất dễ bị oxi hóa thành axit.",
     requires="[CX3;H1](=O)[#6]", smarts=["[CX3;H1:1](=[O:2])[#6:3]>>[C:1](=[O:2])([#6:3])O"])
rule("R_TOLLENS", "C10", "Thuốc thử Tollens [Ag(NH3)2]+/NH3: anđehit lên muối cacboxylat", [r"ag\(nh3\)2|agnh|ag\(nh3|\[ag"], "Anđehit khử Ag+ thành Ag, tự bị oxi hóa thành axit (dạng muối amoni trong NH3). Xeton không phản ứng.",
     requires="[CX3;H1](=O)[#6]", smarts=["[CX3;H1:1](=[O:2])[#6:3]>>[C:1](=[O:2])([#6:3])[O-]"], byproducts=".[NH4+].[Ag]")
rule("R_DEHYDR_ALC", "C9", "Tách nước nội phân tử (H2SO4 đặc, 170°C)", [r"h2so4|h\+|h3po4", r"170|180|h\+,?tc?$|so4,?tc?$|h\+;?t"], "Tách H2O tạo anken, theo Zaitsev.", requires="[CX4][OX2H]", handler="dehydrate")
rule("R_ETHER_140", "C9", "Tách nước liên phân tử (H2SO4 đặc, 140°C): ete", [r"h2so4", r"140"], "Hai phân tử ancol bậc 1 tách một H2O thành ete đối xứng.",
     requires="[CX4;H2][OX2H]", smarts=["[CX4:1][OX2H].[CX4:2][OX2H]>>[C:1]O[C:2]"])
rule("R_ESTER", "C9", "Este hóa (RCOOH + R'OH, H2SO4)", [r"h2so4|h\+"], "Axit và ancol tách nước cho este (thuận nghịch, xúc tác axit).",
     requires="[CX3](=O)[OX2H]", needs_partner=True, partner_kind="[OX2H][CX4,c]", none_of=[r"cr2o7|kmno4|170|140|hno3|br2|alcl3"],
     smarts=["[CX3:1](=[O:2])[OX2H:4].[OX2H:5][#6:3]>>[C:1](=[O:2])[O:5][#6:3]"])
rule("R_ROH_PX", "C8", "Ancol + PX3, PX5, SOCl2 (pyridin): R-X, không chuyển vị", [r"pbr3|pcl3|pcl5|socl2"], "Tác nhân biến OH thành nhóm đi tốt, X- thế bằng SN2; pyridin trung hòa HCl; ít chuyển vị cacbocation.",
     requires="[CX4][OX2H]", smarts=["[CX4:1][OX2H]>>[C:1]Cl"], convention="Br dùng cho PBr3; Cl dùng cho SOCl2, PCl3, PCl5.")
rule("R_ROH_HX", "C8", "Ancol + HX (H2SO4)", [r"hbr|hcl|hi"], "Ancol bị proton hóa rồi bị X- thế (bậc 3 > bậc 2 > bậc 1).", requires="[CX4][OX2H]",
     none_of=[r"mg|socl2|pbr3"], smarts=["[CX4:1][OX2H]>>[C:1]Br"], convention="Đề thường bỏ qua chuyển vị cacbocation.")
rule("R_ROH_BASE", "C9", "Ancol + KOH/Na: tạo ancolat", [r"^(koh|na|naoh)$"], "Ancol có H linh động (rất yếu), với Na tạo ancolat; với KOH/NaOH cân bằng lệch trái.", requires="[CX4][OX2H]",
     smarts=["[OX2H:1][CX4:2]>>[O-:1][C:2]"], byproducts=".[K+]")
rule("R_WILLIAMSON", "C9", "Ete hóa Williamson (ancolat + R'X)", [r"^"], "Ancolat là tác nhân ái nhân SN2, thế halogenua ankyl bậc 1 cho ete.", requires="[OX1-][CX4]", needs_partner=True,
     partner_kind="[CX4][Cl,Br,I]", smarts=["[OX1-:1][CX4:2].[CX4:3][Cl,Br,I]>>[O+0:1]([C:2])[C:3]"])

# ---- Cacbonyl (C10)
rule("R_CARB_NABH4", "C10", "NaBH4 / LiAlH4: khử anđehit, xeton thành ancol", [r"nabh4|lialh4"], "H- tấn công C=O (AN), sau đó H2O/H3O+ proton hóa: anđehit cho ancol bậc 1, xeton cho bậc 2.",
     requires="[CX3;!$(C-[OX2,NX3,Cl,Br])]=O", smarts=["[CX3;!$(C-[OX2,NX3,Cl,Br]):1]=[O:2]>>[C:1][O:2]"])
rule("R_LIALH4_ESTER", "C9,C10", "LiAlH4 khử este thành hai ancol", [r"lialh4"], "LiAlH4 mạnh khử este: phần axyl thành ancol bậc 1, phần ancol được giải phóng.", requires="[CX3](=O)[OX2][#6]",
     smarts=["[CX3:1](=[O:2])[OX2:3][#6:4]>>[C:1][O:2].[O:3][#6:4]"])
rule("R_LIALH4_ACID", "C9,C10", "LiAlH4 khử axit cacboxylic thành ancol bậc 1", [r"lialh4"], "LiAlH4 khử được axit; NaBH4 thì không.", requires="[CX3](=O)[OX2H]",
     smarts=["[CX3:1](=[O:2])[OX2H:3]>>[C:1][O:2]"])
rule("R_LIALH4_AMIDE", "C11", "LiAlH4 khử amit thành amin", [r"lialh4"], "C=O của amit bị khử hoàn toàn thành CH2, thu amin (cùng bậc).", requires="[CX3](=O)[NX3]",
     smarts=["[CX3:1](=[O])[NX3:3]>>[C:1][N:3]"])
rule("R_LIALH4_NITRILE", "C11", "LiAlH4 khử nitril thành amin bậc 1", [r"lialh4"], "C≡N bị khử thành CH2-NH2: thêm một carbon vào amin.", requires="[CX2]#N", smarts=["[CX2:1]#[N:2]>>[CH2:1][N:2]"])
rule("R_CARB_HCN", "C10", "Cộng HCN: xianhiđrin", [r"hcn"], "CN- tấn công C=O (AN), proton hóa cho α-hiđroxinitril; là chất trung gian để điều chế axit, amin bậc 1.", requires="[CX3;!$(C-[OX2,NX3])]=O",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O:2]>>[C:1]([O:2])C#N"])
rule("R_CARB_OXIME", "C10", "Cộng hiđroxylamin: oxim", [r"nh2oh"], "Nhóm NH2 tấn công C=O rồi mất H2O cho C=N-OH.", requires="[CX3;!$(C-[OX2,NX3])]=O",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O:2]>>[C:1]=NO"])
rule("R_CARB_HYDRAZONE", "C10", "Cộng hiđrazin: hiđrazon", [r"^(nh2nh2|hydrazin|hidrazin|h2nnh2)$"], "Hiđrazin cho hiđrazon; có KOH đun nóng thì đi tiếp thành ankan (Wolff-Kishner).", requires="[CX3;!$(C-[OX2,NX3])]=O",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O:2]>>[C:1]=NN"])
rule("R_CARB_WK", "C10", "Wolff-Kishner (H2NNH2/KOH): C=O thành CH2", [r"nh2nh2|h2nnh2|hydrazin", r"koh"], "Qua hiđrazon, loại N2 dưới KOH nóng: C=O thành CH2.", requires="[CX3;!$(C-[OX2,NX3])]=O",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O]>>[C:1]"])
rule("R_CARB_CLEMMENSEN", "C7,C10", "Clemmensen (Zn(Hg)/HCl): C=O thành CH2", [r"zn\(hg\)|zn-hg|zn/hg"], "Khử hoàn toàn C=O thành CH2 trong môi trường axit.", requires="[CX3;!$(C-[OX2,NX3])]=O",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O]>>[C:1]"], convention="Đề có thể ghi Zn(Hg)/HCl hoặc Zn/Hg.")
rule("R_CARB_IMINE", "C10", "Amin bậc 1 + anđehit/xeton: imin", [r""], "Amin bậc 1 cộng AN vào C=O rồi mất H2O cho imin (C=N-R).",
     requires="[CX3;!$(C-[OX2,NX3])]=O", needs_partner=True, partner_kind="[NX3;H2][#6]",
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O:2].[NX3;H2:3][#6:4]>>[C:1]=[N:3][#6:4]"])
rule("R_CARB_ENAMINE", "C10", "Amin bậc 2 + xeton có Hα: enamin", [r""], "Amin bậc 2 không tạo được imin trung hòa nên mất Hα tạo enamin.",
     requires="[CX3;!$(C-[OX2,NX3])](=O)[CX4;!H0]", needs_partner=True, partner_kind="[NX3;H1;!$(NC=O)]([#6])[#6]",
     smarts=["[CX3:1](=[O:2])[CX4;!H0:3].[NX3;H1:4]>>[C:1]([N:4])=[C:3]"])
rule("R_CARB_ACETAL", "C10", "Ancol dư + H+: axetal", [r"h\+|hcl|h2so4"], "C=O cộng hai phân tử ancol (axit xúc tác, thuận nghịch) cho axetal/xetal.", requires="[CX3;!$(C-[OX2,NX3,Cl])]=O",
     needs_partner=True, partner_kind="[OX2H][CX4]", none_of=[r"cr2o7|kmno4|hno3"],
     smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O:2].[OX2H:3][CX4:4].[OX2H:5][CX4:6]>>[C:1]([O:3][C:4])[O:5][C:6]"], params=dict(partner_twice=True))
rule("R_CARB_ALPHA_HAL", "C10", "Halogen hóa α của xeton (X2/CH3COOH hoặc H+)", [r"br2|cl2", r"ch3cooh|h\+|acid"], "Trong axit, enol hóa rồi cộng X2: H ở Cα bị thay bằng X.", requires="[CX3](=O)[CX4;!H0]",
     none_of=[r"oh-|naoh"], smarts=["[CX3:1](=[O:2])[CX4;!H0:3]>>[C:1](=[O:2])[C:3]Br"], convention="Cl2 cho Cl; ở đây dùng Br2.")
rule("R_CARB_HALOFORM", "C10", "Phản ứng haloform (X2 dư/NaOH) của metyl xeton", [r"br2|cl2|i2", r"oh-|naoh|koh"], "Metyl xeton bị thế hết 3 H của CH3 rồi bị cắt: cho muối cacboxylat và CHX3.", requires="[#6][CX3](=O)[CH3]",
     smarts=["[#6:1][C:2](=[O:3])[CH3:4]>>[#6:1][C:2](=[O:3])[O-].[C:4](Br)(Br)Br"])

# ---- Amin, điazoni, axit (C11, C10, C9)
rule("R_NITRO_RED", "C11", "Khử nitro thành amin (Fe, HCl hoặc Sn, HCl rồi OH-; hoặc H2/Ni)", [r"fe.*hcl|sn.*hcl|h2.*(ni|pd|pt)"], "Nhóm NO2 bị khử qua nhiều bậc thành NH2 (trong HCl là muối, thêm OH- để thu amin).",
     requires="[#6][N+](=O)[O-]", smarts=["[#6:1][N+:2](=[O:3])[O-:4]>>[#6:1][NH2+0:2]"], none_of=[r"^$"])
rule("R_AMINE_ALKYLATION", "C11", "Alkyl hóa amin bằng halogenua ankyl", [r"^$|ch3br|ch3i|rx|br|i"], "Amin là tác nhân ái nhân SN2. Amin bậc 3 + RX cho muối amoni bậc 4.", requires="[NX3;!$(NC=O)]",
     needs_partner=True, partner_kind="[CX4][Cl,Br,I]",
     smarts=["[CX4:1][Cl,Br,I].[NX3;H2,H1;!$(NC=O):2]>>[C:1][N:2]", "[CX4:1][Cl,Br,I:5].[NX3;H0;!$(NC=O):2]>>[C:1][N+:2].[Br-:5]"])
rule("R_AMINE_ALKYLATION_REV", "C11", "Halogenua ankyl + amin", [r"^$"], "Như trên.", requires="[CX4][Cl,Br,I]", needs_partner=True, partner_kind="[NX3;!$(NC=O)]",
     smarts=["[CX4:1][Cl,Br,I].[NX3;H2,H1;!$(NC=O):2]>>[C:1][N:2]", "[CX4:1][Cl,Br,I:5].[NX3;H0;!$(NC=O):2]>>[C:1][N+:2].[Br-:5]"])
rule("R_ACYLATION", "C11,C10", "Axyl hóa bằng clorua axit hoặc anhydrit", [r"^$|pyridin|rcocl"], "Nhóm NH2, OH tấn công C=O của clorua axit/anhydrit (cộng-tách) cho amit hoặc este.", requires=None,
     needs_partner=True, partner_kind="[CX3](=O)[Cl,$(O[CX3]=O)]", handler="acyl")
rule("R_SALT", "C11", "Amin + axit cacboxylic (điều kiện thường): muối amoni", [r"^$"], "Amin là bazơ, axit cho H+: tạo muối amoni cacboxylat (không tạo amit ở nhiệt độ thường).", requires="[NX3;H2,H1,H0;!$(NC=O)]",
     needs_partner=True, partner_kind="[CX3](=O)[OX2H]", smarts=["[NX3;!$(NC=O):1].[CX3:2](=[O:3])[OX2H:4]>>[N+:1].[C:2](=[O:3])[O-:4]"])
rule("R_HCL_AMINE", "C11", "Amin + HX: muối amoni", [r"^h(cl|br)$"], "Amin là bazơ nên nhận H+ cho muối amoni.", requires="[NX3;!$(NC=O);!$(N-a)]", smarts=["[NX3:1]>>[N+:1]"])
rule("R_HOFMANN", "C11", "Hofmann (Br2/NaOH): amit thành amin kém 1 carbon", [r"br2|cl2", r"naoh|ho-"], "Amit bậc 1 mất C=O thành CO2, N gắn vào gốc R: amin bậc 1 ít hơn một carbon.", requires="[#6][CX3](=O)[NH2]",
     smarts=["[#6:1][CX3](=O)[NH2:3]>>[#6:1][N:3]"])
rule("R_DIAZONIUM", "C11", "Điazoni hóa amin thơm bậc 1 (NaNO2/H+, 0-5°C)", [r"nano2"], "Amin thơm bậc 1 + HNO2 lạnh cho muối điazoni (bền ở 0-5°C).", requires="[c][NX3;H2]",
     smarts=["[c:1][NX3;H2:2]>>[c:1][N+:2]#N"])
rule("R_SANDMEYER_CL", "C8,C11", "Sandmeyer: muối điazoni + CuCl", [r"cucl"], "Cu(I) xúc tác thay N2+ bằng Cl.", requires="[c][N+]#N", smarts=["[c:1][N+]#N>>[c:1]Cl"])
rule("R_SANDMEYER_BR", "C8,C11", "Sandmeyer: muối điazoni + CuBr", [r"cubr"], "Cu(I) xúc tác thay N2+ bằng Br.", requires="[c][N+]#N", smarts=["[c:1][N+]#N>>[c:1]Br"])
rule("R_SANDMEYER_CN", "C11", "Sandmeyer: muối điazoni + CuCN", [r"cucn"], "Thay N2+ bằng CN; nitril thủy phân thành axit.", requires="[c][N+]#N", smarts=["[c:1][N+]#N>>[c:1]C#N"])
rule("R_DIAZ_I", "C8,C11", "Muối điazoni + KI", [r"^ki$"], "I- thay N2+ (không cần Cu).", requires="[c][N+]#N", smarts=["[c:1][N+]#N>>[c:1]I"])
rule("R_DIAZ_PHENOL", "C9", "Thủy phân muối điazoni thành phenol", [r"h2o|40-50"], "Đun ấm với nước: N2+ bị thay bằng OH.", requires="[c][N+]#N", smarts=["[c:1][N+]#N>>[c:1]O"])
rule("R_AZO", "C11", "Ghép azo: điazoni + arene giàu điện tử", [r"^$"], "Cation điazoni là tác nhân điện tử yếu, chỉ ghép với vòng giàu điện tử (phenol, anilin), thế ở vị trí para.",
     requires="[c][N+]#N", needs_partner=True, partner_kind="[c]", handler="azo")
rule("R_NITRILE_HYDR", "C8,C11", "Thủy phân nitril thành axit (H3O+, nhiệt)", [r"h3o\+"], "Nitril thủy phân qua amit thành axit cacboxylic.", requires="[CX2]#N", smarts=["[#6:1][CX2]#N>>[#6:1]C(=O)O"])
rule("R_ACID_SOCL2", "C8,C10", "Axit + SOCl2: clorua axit", [r"socl2"], "Nhóm OH của axit bị thay bằng Cl, tạo clorua axit hoạt động mạnh.", requires="[CX3](=O)[OX2H]", smarts=["[CX3:1](=[O:2])[OX2H]>>[C:1](=[O:2])Cl"])
rule("R_ACYLCHLORIDE_NH3", "C10,C11", "Clorua axit + NH3: amit", [r"nh3"], "NH3 tấn công C=O của clorua axit rồi tách HCl cho amit bậc 1.", requires="[CX3](=O)Cl", smarts=["[CX3:1](=[O:2])Cl>>[C:1](=[O:2])N"])
rule("R_ARENE_SIDECHAIN_OX", "C7", "KMnO4/t° oxi hóa mạch nhánh ankyl của aren", [r"kmno4"], "Mạch nhánh có H benzyl bị cắt thành -COOH bất kể dài bao nhiêu; tert-butyl (không có H benzyl) không bị oxi hóa.",
     requires="c[CX4;!H0]", none_of=[r"^$"], smarts=["[c:1][CX4;!H0]>>[c:1]C(=O)O"], convention="Đứng trước các luật KMnO4 khác khi chất đầu là aren.")


rule("R_GRIG_ACIDH", "C8", "Grignard lấy H linh động của ankin đầu mạch", [r""], "R-MgX là bazơ rất mạnh: lấy H+ của ≡C-H (axit mạnh hơn ankan) cho ankan R-H và ankinyl magie.",
     requires="[CX2;H1]#[CX2]", needs_partner=True, partner_kind="[Mg]", smarts=["[CX2;H1:1]#[C:2].[CH3:3][Mg:4][Br,Cl,I:5]>>[C:1](#[C:2])[Mg:4][*:5].[C:3]"])
rule("R_IMINE_H2", "C11", "Khử imin bằng H2/Ni, Pt, Pd: amin (amin hóa khử)", [r"h2", r"ni|pt|pd"], "C=N bị hiđro hóa thành C-N: tổng hợp amin từ anđehit/xeton qua imin.", requires="[CX3]=[NX2]",
     smarts=["[CX3:1]=[NX2:2]>>[C:1][N:2]"])
rule("R_CARB_NH3", "C10,C11", "NH3 + anđehit/xeton: imin", [r"nh3"], "NH3 cộng AN vào C=O rồi mất H2O cho imin N-H; khử tiếp cho amin bậc 1.", requires="[CX3;!$(C-[OX2,NX3])]=O",
     none_of=[r"ag"], smarts=["[CX3;!$(C-[OX2,NX3,Cl]):1]=[O]>>[C:1]=[NH]"])
rule("R_CYCLOPROPANE_H2", "nền", "Hiđro hóa xiclopropan (H2/Ni, 120°C): mở vòng", [r"h2", r"ni"], "Vòng 3 cạnh căng nên H2/Ni đun nóng mở vòng thành ankan mạch hở.", requires="[CX4;r3]1[CX4;r3][CX4;r3]1",
     smarts=["[CX4:1]1[CX4:2][CX4:3]1>>[C:1][C:2][C:3]"])
rule("R_DIELS_ALDER", "nền", "Diels-Alder: đien + đienophin", [r""], "[4+2]: đien liên hợp + anken (hút điện tử) tạo vòng 6 cạnh có một nối đôi mới.", requires="[CX3]=[CX3][CX3]=[CX3]",
     needs_partner=True, partner_kind="[CX3]=[CX3]", smarts=["[C:1]=[C:2][C:3]=[C:4].[C:5]=[C:6]>>[C:1]1[C:2]=[C:3][C:4][C:6][C:5]1"])

# ------------------------------------------------------------------ bộ điều phối
def _reagent_key(chem):
    return chem

def applicable_rules(m, nreag, partner_mol):
    out = []
    for r in RULES:
        if not all(re.search(p, nreag) for p in r["all_of"]):
            continue
        if any(re.search(p, nreag) for p in r["none_of"]):
            continue
        if r["requires"] is not None and not has(m, r["requires"]):
            continue
        if r["needs_partner"]:
            if partner_mol is None:
                continue
            if r["partner_kind"] and not has(partner_mol, r["partner_kind"]):
                continue
        out.append(r)
    return out

def _group_for_halogen(nreag):
    return 35 if "br2" in nreag else 17

def _apply(r, m, partner_mol, nreag):
    h = r["handler"]
    p = r["params"]
    if h == "radical":
        return h_radical_halogenation(m, **p)
    if h == "addition":
        grp = p["group"]
        if grp is None:
            grp = 35 if nreag.startswith("hbr") else (17 if nreag.startswith("hcl") else 53)
        return h_alkene_addition(m, grp, anti=p["anti"])
    if h == "cleave_alkene":
        return h_cleave_alkene(m, **p)
    if h == "cleave_alkyne":
        return h_cleave_alkyne(m)
    if h == "yne_ene":
        return h_alkyne_to_alkene(m, **p)
    if h == "elim_halide":
        return h_elim_halide(m)
    if h == "dehydrate":
        return h_dehydrate_alcohol(m)
    if h == "grignard_form":
        return h_grignard_form(m)
    if h == "grignard_add":
        return h_grignard_add(m, Chem.MolToSmiles(partner_mol))
    if h == "eas":
        g = p.get("group")
        if g is None:
            g = "Br" if "br2" in nreag else "Cl"
        return h_eas(m, g, partner=Chem.MolToSmiles(partner_mol) if partner_mol else None,
                     tri=p.get("tri", False), only_para=p.get("only_para", False))
    if h == "acyl":
        return h_acyl_transfer(m, partner_mol)
    if h == "azo":
        return h_azo_coupling(m, Chem.MolToSmiles(partner_mol))
    # luật theo mẫu SMARTS
    outs = []
    smarts_list = r["smarts"] or []
    X_over = None
    if r["id"] in ("R_ROH_PX",):
        X_over = "Br" if "pbr3" in nreag else "Cl"
    if r["id"] == "R_ROH_HX":
        X_over = "Br" if "hbr" in nreag else ("Cl" if "hcl" in nreag else "I")
    if r["id"] == "R_CARB_HALOFORM":
        X_over = "Br" if "br2" in nreag else ("Cl" if "cl2" in nreag else "I")
    if r["id"] == "R_CARB_ALPHA_HAL":
        X_over = "Br" if "br2" in nreag else "Cl"
    if r["id"] == "R_YNE_HX" or r["id"] == "R_YNE_HX_DU":
        X_over = "Br" if "hbr" in nreag else ("Cl" if "hcl" in nreag else "I")
    for sm in smarts_list:
        if X_over:
            if r["id"] in ("R_ROH_PX", "R_ROH_HX"):
                sm = sm.replace(">>[C:1]Cl", ">>[C:1]" + X_over).replace(">>[C:1]Br", ">>[C:1]" + X_over)
            elif r["id"] == "R_CARB_HALOFORM":
                sm = sm.replace("(Br)(Br)Br", "(" + X_over + ")(" + X_over + ")" + X_over)
            elif r["id"] == "R_CARB_ALPHA_HAL":
                sm = sm.replace("Br", X_over)
            elif r["id"] in ("R_YNE_HX", "R_YNE_HX_DU"):
                sm = sm.replace("Cl", X_over)
        exh = r["params"].get("exhaustive")
        if r["id"] == "R_CARB_ACETAL":
            res = run_smarts(sm, m, partner_mol, partner_mol)
        elif partner_mol is not None and ".[" in sm.split(">>")[0] or (partner_mol is not None and r["needs_partner"]):
            # chất đầu có thể là phản ứng với hai tác chất (chất đầu + partner)
            res = run_smarts(sm, m, partner_mol)
            if not res:
                res = run_smarts(sm, partner_mol, m)
        else:
            res = run_smarts(sm, m)
            if exh:
                # lặp đến khi hết nối bội
                cur = res
                for _ in range(6):
                    nxt = []
                    for s in cur:
                        mm = Chem.MolFromSmiles(s)
                        more = run_smarts(sm, mm)
                        nxt.extend(more or [s])
                    if set(nxt) == set(cur):
                        break
                    cur = nxt
                res = sorted(set(cur))
        outs.extend(x for x in res if x not in outs)
    if r["id"] == "R_ROH_PX" and "pbr3" in nreag:
        pass
    # sản phẩm phụ cần ghi thêm
    if r.get("byproducts"):
        outs = [o + r["byproducts"] for o in outs]
    if r["id"] == "R_ARENE_SIDECHAIN_OX":
        pass
    return outs

def run_step(smiles, reagent, partner=None):
    """Chạy một bước. Nếu có partner thì thử cả hai vai trò (chất đầu / tác chất)."""
    res = _run_step(smiles, reagent, partner)
    if partner:
        seen = {(r["rule"], p) for r in res for p in r["products"]}
        for r in _run_step(partner, reagent, smiles):
            new = [p for p in r["products"] if (r["rule"], p) not in seen]
            if new:
                r = dict(r); r["products"] = new
                res.append(r)
    return res

def _run_step(smiles, reagent, partner=None):
    m = mol(smiles)
    nreag = norm(reagent)
    pm = mol(partner) if partner else None
    results = []
    warnings = []
    for r in applicable_rules(m, nreag, pm):
        # kiểm tra nhóm chức cấm (Grignard)
        if r["forbid"]:
            bad = [f for f in r["forbid"] if has(m, f)]
            if bad:
                results.append(dict(rule=r["id"], name=r["name"], products=[], why=r["why"],
                                    warnings=["Không tạo được Grignard: phân tử có nhóm hoạt động/H linh động tự phá hủy tác chất."],
                                    convention=r["convention"]))
                continue
        prods = _apply(r, m, pm, nreag)
        if prods:
            results.append(dict(rule=r["id"], name=r["name"], products=prods, why=r["why"], warnings=[], convention=r["convention"]))
    return results

def run_chain(smiles, steps):
    """steps: list[(reagent, partner|None)]; trả về lịch sử từng bước (đi theo sản phẩm đầu tiên của luật phù hợp nhất)."""
    cur = [smiles]
    history = []
    for reagent, partner in steps:
        nxt = []
        step_info = []
        for s in cur:
            base = s.split(".")[0] if "." in s else s
            res = run_step(base, reagent, partner)
            # ưu tiên luật đặc hiệu: luật có nhiều ràng buộc hơn lên trước
            for r in res:
                for p in r["products"]:
                    if p not in nxt:
                        nxt.append(p)
                step_info.append(r)
        history.append(dict(reagent=reagent, partner=partner, results=step_info))
        cur = nxt if nxt else cur
    return history

def can(s):
    """Chuẩn hóa chuỗi SMILES nhiều mảnh để so sánh."""
    parts = []
    for x in s.split("."):
        m = Chem.MolFromSmiles(x)
        parts.append(canon(m) if m else x)
    return ".".join(sorted(parts))
