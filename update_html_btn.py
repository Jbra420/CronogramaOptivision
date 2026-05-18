import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace info-btn with detail-btn
pattern = re.compile(r'<button class="info-btn" data-info-id="([^"]+)" title="Ver detalles">\s*<svg.*?</svg>\s*</button>', re.DOTALL)
replacement = r'<button class="detail-btn" data-info-id="\1">\n                    <span>Descripción</span>\n                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>\n                  </button>'

content = pattern.sub(replacement, content)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("HTML buttons updated")
