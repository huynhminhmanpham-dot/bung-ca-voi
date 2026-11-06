# Bộ luật phản ứng hữu cơ v0 (nguyên mẫu)

## Chạy thử (máy bạn hoặc Google Colab)
    pip install rdkit
    python tests.py            # 68 ca thử viết theo ví dụ trong slide, in "Đạt 68/68"
    python PRIVATE_exam_check.py   # chỉ chạy riêng, KHÔNG đưa file này lên GitHub

## Dùng thử trong Python
    from engine import run_step
    for r in run_step("Cc1ccccc1", "Br2/as"):
        print(r["name"], r["products"], r["why"])
    # có tác chất thứ hai: run_step("CC(C)CBr", "1. epoxit 2. H3O+", partner="C1CO1")

SMILES là cách viết cấu trúc thành chữ (toluen = Cc1ccccc1). Tra tên sang SMILES trên PubChem.

## Thêm luật mới
Mở engine.py, thêm một dòng `rule(...)` theo mẫu các luật có sẵn:
mã luật, chương, tên, từ khóa tác nhân (regex), lời giải thích, điều kiện chất đầu (SMARTS),
và mẫu phản ứng (SMARTS). Luật khó (chọn lọc vị trí) viết thành hàm `h_...`.
Sau đó thêm ca thử vào tests.py và chạy lại.

## Đưa lên web (sau này)
Luật dạng SMARTS dùng được nguyên trong RDKit.js. Các hàm `h_...` phải viết lại bằng JavaScript.

## Bản quyền
Slide và đề của giảng viên chỉ dùng riêng trên máy bạn. Chỉ đưa lên GitHub: engine.py, tests.py,
rules_catalog.json, DANH_MUC_LUAT.md (luật là kiến thức hóa học, viết lại bằng lời của bạn).
