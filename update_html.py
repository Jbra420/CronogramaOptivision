import re

with open("index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Add info buttons
pattern = re.compile(r'(<input type="checkbox" data-task-id="([^"]+)" />[\s\S]*?)</label>\s*</td>')
replacement = r'\1</label>\n                  <button class="info-btn" data-info-id="\2" title="Ver detalles">\n                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>\n                  </button>\n                </td>'

content = pattern.sub(replacement, content)

# Add Modal
modal_html = """
    <!-- Task Modal -->
    <div id="task-modal" class="modal-overlay">
      <div class="modal-content">
        <button id="modal-close" class="modal-close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <div class="modal-header">
          <h3 id="modal-title">Título de la actividad</h3>
        </div>
        <div class="modal-body">
          <p id="modal-desc">Descripción de la actividad...</p>
        </div>
      </div>
    </div>
"""

content = content.replace('<script type="module" src="/src/main.ts"></script>', modal_html + '\n    <script type="module" src="/src/main.ts"></script>')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("HTML updated")
