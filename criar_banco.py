import sqlite3

# Conecta (ou cria) o banco banco.db
conexao = sqlite3.connect('banco.db')
cursor = conexao.cursor()

# Cria a tabela CLIENTES (se ainda não existir)
cursor.execute('''
CREATE TABLE IF NOT EXISTS CLIENTES (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT
)
''')

clientes = [
    ('Maria Silva', 'maria@email.com', '11999999999'),
    ('João Oliveira', 'joao@email.com', '21988887777'),
    ('Anna Marinho', 'anna@email.com', '31977776666'),
    ('Carlos Souza', 'carlos@email.com', '41966665555'),
    ('Beatriz Lima', 'beatriz@email.com', '51955554444'),
]

#Inserir todos os clientes
cursor.executemany('''
INSERT INTO CLIENTES (nome, email, telefone)
VALUES (?, ?, ?)
''', clientes)

conexao.commit()
conexao.close()

print("Banco criado com 5 clientes fictícios.")
