from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

conexao_inicial = sqlite3.connect("banco.db")
cursor_inicial = conexao_inicial.cursor()

cursor_inicial.execute("""CREATE TABLE IF NOT EXISTS cadastros(
               id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
               nome TEXT NOT NULL,
               email TEXT NOT NULL UNIQUE
               )""")

conexao_inicial.commit()
conexao_inicial.close()  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Cadastro(BaseModel):
    nome: str
    email: str

@app.post("/cadastrar")
def registrar_cadastro(usuario: Cadastro):

    print(f"Python recebeu: Nome = {usuario.nome} | Email = {usuario.email}")

    conexao = sqlite3.connect("banco.db")
    cursor = conexao.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO cadastros (nome, email) VALUES (?, ?)", 
            (usuario.nome, usuario.email)
        )
        conexao.commit()
        resposta = {"status": "Sucesso", "mensagem": f"{usuario.nome} foi salvo!"}
        
    except sqlite3.IntegrityError:
        resposta = {"status": "Erro", "mensagem": "Este e-mail já está cadastrado!"}
        
    finally:
        conexao.close()

    return resposta

@app.get("/listar")
def listar_cadastro():

    conexao = sqlite3.connect("banco.db")

    conexao.row_factory = sqlite3.Row
    cursor = conexao.cursor()

    cursor.execute("""SELECT * FROM cadastros""")
    cadastros = cursor.fetchall()

    conexao.close()

    return cadastros

