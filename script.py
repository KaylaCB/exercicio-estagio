import sqlite3
import json

conexao = sqlite3.connect('banco.db')
cursor = conexao.cursor()

cursor.execute("SELECT * FROM CLIENTES")
linha = cursor.fetchone()

colunas = [descricao[0] for descricao in cursor.description]

if linha:
    dados = dict(zip(colunas, linha))

    with open('clientes.json', 'w', encoding='utf-8') as arquivo_json:
        json.dump(dados, arquivo_json, ensure_ascii=False, indent=4)
else:
    print("Nenhum dado encontrado na tabela CLIENTES.")

conexao.close()
