import sqlite3
import json

conexao = sqlite3.connect('banco.db')
cursor = conexao.cursor()
#SQLite vai gerar automaticamente os id
cursor.execute('''
CREATE TABLE IF NOT EXISTS CLIENTES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT
)
''')

#Verifica se já tem dados na tabela para não duplicar
cursor.execute('SELECT COUNT(*) FROM CLIENTES')
total = cursor.fetchone()[0]

if total == 0:
    clientes = [
        ('Maria Silva', 'maria@email.com', '11999999999'),
        ('João Oliveira', 'joao@email.com', '21988887777'),
        ('Anna Marinho', 'anna@email.com', '31977776666'),
        ('Carlos Souza', 'carlos@email.com', '41966665555'),
        ('Bia Lima', 'bia@email.com', '51955554444'),
    ]
    cursor.executemany('''
    INSERT INTO CLIENTES (nome, email, telefone)
    VALUES (?, ?, ?)
    ''', clientes)
    conexao.commit()

# ler todos os clientes da tabela
cursor.execute('SELECT * FROM CLIENTES')
linhas = cursor.fetchall()
#fetchal pegar todos os dados e não só primeira linha

colunas = [desc[0] for desc in cursor.description]

if linhas:
    dados = [dict(zip(colunas, linha)) for linha in linhas]

    with open('clientes.json', 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=4)
else:
    print("Tabela CLIENTES está vazia.")

conexao.close()

print("Script finalizado: banco criado (se não existia), JSON gerado.")
