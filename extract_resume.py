from pypdf import PdfReader
reader = PdfReader("santhosh p.pdf")
out = []
for i, page in enumerate(reader.pages):
    out.append(f"----- PAGE {i+1} -----")
    out.append(page.extract_text() or "")
with open("resume_text.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("done, pages:", len(reader.pages))
