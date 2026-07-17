from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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

    # -------------------------------------------------------------
    # SEU ESPAÇO PARA O SQLITE:
    # Como você comentou que já sabe fazer essa parte, seu código de 
    # abrir conexão, cursor.execute("INSERT INTO..."), e conexao.commit()
    # entra exatamente aqui!
    # -------------------------------------------------------------

    # Retorna uma resposta de sucesso para o JavaScript
    return {"status": "Sucesso", "mensagem": f"{usuario.nome} foi salvo!"}