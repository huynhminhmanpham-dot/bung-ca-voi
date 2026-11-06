# -*- coding: utf-8 -*-
import sys
from engine import *

def prods_of(smiles, reagent, partner=None):
    out = []
    for r in run_step(smiles, reagent, partner):
        out += [can(p) for p in r["products"]]
    return out

# (mô tả, chất đầu, tác nhân, partner, sản phẩm mong đợi (một hoặc nhiều), nguồn)
T = [
 ("Toluen + Br2/as: thế mạch nhánh", "Cc1ccccc1", "Br2/as", None, ["BrCc1ccccc1"], "C7"),
 ("Benzyl bromua + NaOH(dd)", "BrCc1ccccc1", "NaOH(dd)", None, ["OCc1ccccc1"], "C8"),
 ("Ancol benzylic + PCC", "OCc1ccccc1", "PCC", None, ["O=Cc1ccccc1"], "C9"),
 ("Neopentan + Cl2/hv", "CC(C)(C)C", "Cl2/hv", None, ["CC(C)(C)CCl"], "C8"),
 ("Neopentyl clorua + Mg/ete", "CC(C)(C)CCl", "Mg/ete khan", None, ["CC(C)(C)C[Mg]Cl"], "C8"),
 ("Grignard + CO2", "CC(C)(C)C[Mg]Cl", "1. CO2 2. H3O+", "O=C=O", ["CC(C)(C)CC(=O)O"], "C10"),
 ("PhMgBr + pentanal", "[Mg](Br)c1ccccc1", "1. RCHO 2. H3O+", "CCCCC=O", ["CCCCC(O)c1ccccc1"], "C10"),
 ("Benzanđehit + Tollens", "O=Cc1ccccc1", "[Ag(NH3)2]+/NH3", None, ["O=C([O-])c1ccccc1.[NH4+].[Ag]"], "C10"),
 ("Clorocyclohexan + Mg, rồi axeton", "ClC1CCCCC1", "Mg/ete", None, ["Cl[Mg]C1CCCCC1"], "C8"),
 ("CyclohexylMgCl + axeton", "Cl[Mg]C1CCCCC1", "1. aceton 2. H3O+", "CC(C)=O", ["CC(C)(O)C1CCCCC1"], "C10"),
 ("Benzanđehit + NH2OH", "O=Cc1ccccc1", "NH2OH", None, ["ON=Cc1ccccc1"], "C10"),
 ("Benzanđehit + etylamin", "O=Cc1ccccc1", "", "CCN", ["CCN=Cc1ccccc1"], "C10"),
 ("Axit pentanoic + benzyl ancol", "CCCCC(=O)O", "H2SO4", "OCc1ccccc1", ["CCCCC(=O)OCc1ccccc1"], "C9"),
 ("Etynylcyclohexan + O3 rồi H2O", "C#CC1CCCCC1", "1. O3 2. H2O", None, ["O=C(O)C1CCCCC1"], "C6"),
 ("Axetylclorua + NH3", "CC(=O)Cl", "NH3", None, ["CC(N)=O"], "C11"),
 ("Axetamit + LiAlH4", "CC(N)=O", "1. LiAlH4 2. H2O", None, ["CCN"], "C11"),
 ("m-Tolylnitril + H3O+ (thủy phân)", "Cc1cccc(C#N)c1", "H3O+", None, ["Cc1cccc(C(=O)O)c1"], "C11"),
 ("Điazoni + CuCN", "Cc1cccc([N+]#N)c1", "CuCN", None, ["Cc1cccc(C#N)c1"], "C11"),
 ("Triethylamin + CH3Br", "CCN(CC)CC", "", "CBr", ["CC[N+](C)(CC)CC.[Br-]"], "C11"),
 ("Dietylamin + CH3Br (1:1)", "CCNCC", "CH3Br", "CBr", ["CCN(C)CC"], "C11"),
 ("p-Nitrotoluen + KMnO4", "Cc1ccc([N+](=O)[O-])cc1", "KMnO4/t°", None, ["O=C(O)c1ccc([N+](=O)[O-])cc1"], "C7"),
 ("Benzen + HNO3/H2SO4", "c1ccccc1", "HNO3/H2SO4", None, ["O=[N+]([O-])c1ccccc1"], "C7"),
 ("Nitrobenzen + Fe/HCl", "O=[N+]([O-])c1ccccc1", "Fe/HCl", None, ["Nc1ccccc1"], "C11"),
 ("Anilin + NaNO2/HCl", "Nc1ccccc1", "NaNO2/HCl 0-5°C", None, ["N#[N+]c1ccccc1"], "C11"),
 ("Điazoni + KI", "N#[N+]c1ccccc1", "KI", None, ["Ic1ccccc1"], "C8"),
 ("Phenol + Br2/H2O", "Oc1ccccc1", "Br2/H2O", None, ["Oc1c(Br)cc(Br)cc1Br"], "C9"),
 ("Phenol + Br2/CCl4", "Oc1ccccc1", "Br2/CCl4", None, ["Oc1ccc(Br)cc1"], "C9"),
 ("Phenol + HNO3 loãng", "Oc1ccccc1", "HNO3 loãng", None, ["O=[N+]([O-])c1ccc(O)cc1", "O=[N+]([O-])c1ccccc1O"], "C9"),
 ("Phenol + HNO3 đặc", "Oc1ccccc1", "HNO3 đặc", None, ["Oc1c([N+](=O)[O-])cc([N+](=O)[O-])cc1[N+](=O)[O-]"], "C9"),
 ("Xiclohexanon + CH3NH2", "O=C1CCCCC1", "", "CN", ["CN=C1CCCCC1"], "C10"),
 ("Axetophenon + Br2 dư/OH-", "CC(=O)c1ccccc1", "Br2 dư/OH-", None, ["O=C([O-])c1ccccc1", "BrC(Br)Br"], "C10"),
 ("Axetophenon + Br2/CH3COOH", "CC(=O)c1ccccc1", "Br2/CH3COOH", None, ["O=C(CBr)c1ccccc1"], "C10"),
 ("Metyl benzoat + LiAlH4", "COC(=O)c1ccccc1", "1. LiAlH4 2. H3O+", None, ["OCc1ccccc1", "CO"], "C9"),
 ("Propin + HgSO4/H2SO4", "CC#C", "H2O/HgSO4/H2SO4", None, ["CC(C)=O"], "C6"),
 ("Axetilen + H2O/HgSO4", "C#C", "H2O, HgSO4/H2SO4", None, ["CC=O"], "C6"),
 ("Propin + BH3/THF; H2O2/OH-", "CC#C", "1. BH3/THF 2. H2O2/OH-", None, ["CCC=O"], "C6"),
 ("Butanol-1 + PBr3/pyridin", "CCCCO", "PBr3/pyridin", None, ["CCCCBr"], "C8"),
 ("Isobutyl ancol + SOCl2/pyridin", "CC(C)CO", "SOCl2/pyridin", None, ["CC(C)CCl"], "C8"),
 ("Buten-1 + hiđrobo hóa", "C=CCC", "1. B2H6/THF 2. H2O2/OH-", None, ["CCCCO"], "C6"),
 ("Buten-1 + H2O/H2SO4", "C=CCC", "H2O/H2SO4", None, ["CCC(C)O"], "C9"),
 ("Propen + HBr (peoxit)", "C=CC", "HBr, peoxit", None, ["CCCBr"], "nền"),
 ("3-Cloro-2-metylpentan + OH-/DMSO", "CCC(Cl)C(C)C", "OH-/DMSO, t°", None, ["CCC=C(C)C"], "C8"),
 ("BuMgCl + HCHO", "CCCC[Mg]Cl", "1. HCHO 2. H3O+", "C=O", ["CCCCCO"], "C10"),
 ("iBuMgBr + epoxit", "CC(C)C[Mg]Br", "1. epoxit 2. H3O+", "C1CO1", ["CC(C)CCCO"], "C8"),
 ("Phenol + NaOH", "Oc1ccccc1", "NaOH", None, ["[O-]c1ccccc1.[Na+]"], "C9"),
 ("o-Cresol + benzyl bromua (NaOH)", "Cc1ccccc1O", "NaOH(dd)", "BrCc1ccccc1", ["Cc1ccccc1OCc1ccccc1"], "C9"),
 ("Xiclohexan + Br2/hv", "C1CCCCC1", "Br2/hv", None, ["BrC1CCCCC1"], "C8"),
 ("Bromxiclohexan + NaOH(dd)", "BrC1CCCCC1", "NaOH(dd)", None, ["OC1CCCCC1"], "C8"),
 ("Xiclohexanol + H2CrO4", "OC1CCCCC1", "H2CrO4", None, ["O=C1CCCCC1"], "C9"),
 ("Butan + Cl2/hv", "CCCC", "Cl2/hv", None, ["CCCCCl", "CCC(C)Cl"][:0] or ["CCCCCl", "CCC(C)Cl"], "C8"),
 ("Axit butanoic + LiAlH4", "CCCC(=O)O", "1. LiAlH4 2. H2O", None, ["CCCCO"], "C9"),
 ("Isopropanol + H2CrO4", "CC(C)O", "H2CrO4", None, ["CC(C)=O"], "C9"),
 ("Axetophenon + hiđrazin", "CC(=O)c1ccccc1", "hydrazin", None, ["CC(=NN)c1ccccc1"], "C10"),
 ("Axetilen + NaNH2", "C#C", "NaNH2", None, ["C#[C-].[Na+]"], "C6"),
 ("Clobenzen + CH3I/AlCl3", "Clc1ccccc1", "AlCl3", "CI", ["Cc1ccc(Cl)cc1", "Cc1ccccc1Cl"], "C7"),
 ("Benzanđehit + CH3COCl/AlCl3", "O=Cc1ccccc1", "AlCl3", "CC(=O)Cl", ["CC(=O)c1cccc(C=O)c1"], "C7"),
 ("Phenol + anhydrit axetic/AlCl3", "Oc1ccccc1", "AlCl3", "CC(=O)OC(C)=O", ["CC(=O)c1ccc(O)cc1", "CC(=O)c1ccccc1O"], "C9"),
 ("Etylbenzen + KMnO4", "CCc1ccccc1", "KMnO4/t°", None, ["O=C(O)c1ccccc1"], "C7"),
 ("1-Metylxiclopenten + hiđrobo hóa", "CC1=CCCC1", "1. B2H6/THF 2. H2O2/OH-", None, ["CC1CCCC1O"], "C6"),
 ("1-Metylxiclopentanol + H2SO4 170°C", "CC1(O)CCCC1", "H2SO4 170°C", None, ["CC1=CCCC1"], "C9"),
 ("Dietyl... clo + KCN", "CCBr", "KCN", None, ["CCC#N"], "C8"),
 ("Hex-2-in từ ankin: ankyl hóa propin", "CC#C", "NaNH2", "CCCCI", ["CC#CCCCC"], "C6"),
 ("Anken + H2/Ni", "CC=CC", "H2/Ni", None, ["CCCC"], "nền"),
 ("Propin + H2/Pd-BaSO4", "CC#CC", "H2/Pd-BaSO4", None, ["C/C=C\\C"], "C6"),
 ("Anilin... benzylamin + clorua propionyl", "NCc1ccccc1", "", "CCC(=O)Cl", ["CCC(=O)NCc1ccccc1"], "C11"),
 ("Benzylamin + CH3COOH", "NCc1ccccc1", "", "CC(=O)O", ["CC(=O)[O-].[NH3+]Cc1ccccc1"], "C11"),
 ("Benzanđehit + NH... Hofmann", "CC(N)=O", "Br2/NaOH", None, ["CN"], "C11"),
 ("Điazoni sunfanilic + dimetylanilin", "N#[N+]c1ccc(S(=O)(=O)O)cc1", "", "CN(C)c1ccccc1", ["CN(C)c1ccc(N=Nc2ccc(S(=O)(=O)O)cc2)cc1"], "C11"),
]

def main():
    ok = bad = 0
    for desc, sm, rg, part, expected, src in T:
        got = prods_of(sm, rg, part)
        exp_can = [can(e) for e in expected]
        # đạt nếu mỗi sản phẩm mong đợi nằm trong kết quả (một số luật cho thêm mảnh phụ)
        got_parts = set()
        for g in got:
            got_parts.add(g)
            for p in g.split("."):
                got_parts.add(can(p))
        good = all(e in got_parts or all(x in got_parts for x in e.split(".")) for e in exp_can)
        if good:
            ok += 1
        else:
            bad += 1
            print("✗", desc, "|", sm, "+", rg, "| mong đợi:", exp_can, "| nhận:", got)
    print(f"\nĐạt {ok}/{ok+bad}")

if __name__ == "__main__":
    main()
