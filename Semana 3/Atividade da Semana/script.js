const formulario = document.getElementById("form-busca");
const campoBusca = document.getElementById("numero-personagem");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

// Busca personagem na API
async function buscarPersonagem(numero) {
    try {
        mensagem.textContent = "Carregando...";
        resultado.textContent = "";

        const resposta = await fetch(`https://rickandmortyapi.com/api/character/${numero}`);

        if (!resposta.ok) {
            throw new Error("Personagem não encontrado. Digite outro número.");
        }

        const dados = await resposta.json();
        mostrarPersonagem(dados);

        mensagem.textContent = "";
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
}

// Mostra as informações do personagem
function mostrarPersonagem(personagem) {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");

    const nome = document.createElement("h2");
    nome.textContent = personagem.name;

    const imagem = document.createElement("img");
    imagem.src = personagem.image;
    imagem.alt = "Imagem de " + personagem.name;

    const status = document.createElement("p");
    status.textContent = "Status: " + personagem.status;

    const especie = document.createElement("p");
    especie.textContent = "Espécie: " + personagem.species;

    const genero = document.createElement("p");
    genero.textContent = "Gênero: " + personagem.gender;

    const origem = document.createElement("p");
    origem.textContent = "Origem: " + personagem.origin.name;

    const localizacao = document.createElement("p");
    localizacao.textContent = "Localização: " + personagem.location.name;

    cartao.appendChild(nome);
    cartao.appendChild(imagem);
    cartao.appendChild(status);
    cartao.appendChild(especie);
    cartao.appendChild(genero);
    cartao.appendChild(origem);
    cartao.appendChild(localizacao);

    resultado.appendChild(cartao);
}

// Faz uma nova busca quando o formulário é enviado
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const numero = campoBusca.value.trim();

    if (numero === "" || Number(numero) < 1) {
        mensagem.textContent = "Digite um número válido.";
        return;
    }

    buscarPersonagem(numero);
});

// Mostra o primeiro personagem ao abrir a página
buscarPersonagem(1);
