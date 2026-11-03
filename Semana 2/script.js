// ---------- Seleção de elementos ----------
const form = document.getElementById("formGasto");
const campoDescricao = document.getElementById("descricao");
const campoValor = document.getElementById("valor");
const campoCategoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");
const totalGeral = document.getElementById("totalGeral");
const vazio = document.getElementById("vazio");
const listaGastos = document.getElementById("listaGastos");

// Categorias
const nomesCategorias = {
    alimentacao: "Alimentação",
    transporte: "Transporte",
    lazer: "Lazer",
    estudos: "Estudos",
    outros: "Outros",
};

// Carregar dados salvos
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Formatar valores em reais
function formatar(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// Mostrar mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
}

// Salvar gastos
function salvar() {
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Validação
function validar(descricao, textoValor, categoria) {
    if (descricao === "") {
        return "Informe a descrição do gasto.";
    }

    if (textoValor === "" || isNaN(Number(textoValor))) {
        return "Informe um valor numérico.";
    }

    if (Number(textoValor) <= 0) {
        return "O valor deve ser maior que zero.";
    }

    if (categoria === "") {
        return "Selecione uma categoria.";
    }

    return "";
}

// Criar linha na tabela
function criarLinha(gasto) {
    const tr = document.createElement("tr");
    tr.dataset.id = gasto.id;

    const tdDescricao = document.createElement("td");
    tdDescricao.textContent = gasto.descricao;

    const tdCategoria = document.createElement("td");
    const badge = document.createElement("span");

    badge.classList.add("badge", gasto.categoria);
    badge.textContent = nomesCategorias[gasto.categoria];

    tdCategoria.appendChild(badge);

    const tdValor = document.createElement("td");
    tdValor.classList.add("valor");
    tdValor.textContent = formatar(gasto.valor);

    const tdAcao = document.createElement("td");
    const botao = document.createElement("button");

    botao.type = "button";
    botao.classList.add("remover");
    botao.textContent = "Remover";

    tdAcao.appendChild(botao);

    tr.appendChild(tdDescricao);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdValor);
    tr.appendChild(tdAcao);

    return tr;
}

// Atualizar os totais
function atualizarTotais() {
    let total = 0;

    const totais = {
        alimentacao: 0,
        transporte: 0,
        lazer: 0,
        estudos: 0,
        outros: 0
    };

    for (const gasto of gastos) {
        total += Math.round(gasto.valor * 100);
        totais[gasto.categoria] += Math.round(gasto.valor * 100);
    }

    totalGeral.textContent = formatar(total / 100);

    for (const categoria in totais) {
        document.getElementById("total-" + categoria).textContent =
            formatar(totais[categoria] / 100);
    }
}

// Mostrar os gastos na tabela
function mostrarGastos() {
    listaGastos.textContent = "";

    for (const gasto of gastos) {
        listaGastos.appendChild(criarLinha(gasto));
    }

    vazio.classList.toggle("oculto", listaGastos.children.length > 0);

    atualizarTotais();
}

// Cadastrar gasto
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = campoDescricao.value.trim();
    const preco = campoValor.value;
    const tipo = campoCategoria.value;

    const erro = validar(nome, preco, tipo);

    if (erro !== "") {
        mostrarMensagem(erro, "erro");
        return;
    }

    const novoGasto = {
        id: Date.now(),
        descricao: nome,
        valor: Number(preco),
        categoria: tipo
    };

    gastos.push(novoGasto);

    salvar();
    mostrarGastos();

    form.reset();
    campoDescricao.focus();

    mostrarMensagem("Gasto adicionado com sucesso!", "sucesso");
});

// Remover gasto
listaGastos.addEventListener("click", function(evento) {
    if (evento.target.classList.contains("remover")) {
        const linha = evento.target.closest("tr");
        const id = Number(linha.dataset.id);

        gastos = gastos.filter(function(gasto) {
            return gasto.id !== id;
        });

        salvar();
        mostrarGastos();
    }
});

// Iniciar página
mostrarGastos();