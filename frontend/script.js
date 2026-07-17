let cadastro = {
  nome: "",
  email: "",
};

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
});
