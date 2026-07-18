let cadastro = {
  nome: "",
  email: "",
};

const lista_cadastros = document.querySelector(".lista-cadastros");

document.querySelector("#cadastrar").addEventListener("click", (evento) => {
  evento.preventDefault();
  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  if (nome != "" && email != "") {
    cadastro.nome = nome;
    cadastro.email = email;
    console.log(cadastro);

    // ================= MÁGICA DA CONEXÃO AQUI =================
    fetch("http://127.0.0.1:8000/cadastrar", {
      method: "POST", // Tipo da requisição
      headers: {
        "Content-Type": "application/json", // Avisa o Python que estamos mandando um JSON
      },
      body: JSON.stringify(cadastro), // Transforma o objeto JS em texto JSON
    })
      .then((resposta) => resposta.json()) // Pega a resposta do Python e transforma em objeto JS
      .then((dados) => {
        console.log("Resposta do Python:", dados);
        alert("Usuário cadastrado com sucesso!");

        // Limpa os campos do HTML após o sucesso
        document.querySelector("#nome").value = "";
        document.querySelector("#email").value = "";
      })
      .catch((erro) => {
        console.error("Erro na conexão:", erro);
        alert("Não foi possível conectar ao servidor.");
      });
    // ==========================================================
  } else {
    alert("Por favor, insira valores válidos !");
  }
  listar_cadastros();
});

document.querySelector("#listar").addEventListener("click", () => {
  if (lista_cadastros.classList.contains("ativo")) {
    lista_cadastros.classList.remove("ativo");
  } else {
    lista_cadastros.classList.add("ativo");
    listar_cadastros();
  }
});

async function buscar_dados() {
  return fetch("http://127.0.0.1:8000/listar")
    .then((resposta) => resposta.json())
    .then((dados) => {
      return dados;
    })
    .catch((erro) => console.error("Erro ao buscar:", erro));
}

async function listar_cadastros() {
  lista_cadastros.innerHTML = "";
  const dados = await buscar_dados();
  dados.forEach((element) => {
    const h1 = document.createElement("h4");
    h1.textContent = `Cadastro: ${element.id}`;
    const p1 = document.createElement("p");
    p1.textContent = `Nome: ${element.nome}`;
    const p2 = document.createElement("p");
    p2.textContent = `Email: ${element.email}`;

    const div_cadastrado = document.createElement("div");

    div_cadastrado.classList.add("cadastrado");
    div_cadastrado.appendChild(h1);
    div_cadastrado.appendChild(p1);
    div_cadastrado.appendChild(p2);

    lista_cadastros.appendChild(div_cadastrado);

    console.log(div_cadastrado);
  });
}
