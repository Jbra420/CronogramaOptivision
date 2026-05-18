import os

files = ['index.html', 'src/main.ts']
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('PostgreSQL', 'SQLite')
    content = content.replace('PostgresSQL', 'SQLite')
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Reemplazo completado.")
