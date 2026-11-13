const express = require("express");

const app = express();
const PORTA = 3000;

// Dados dos jogos da API
const jogos = [
    { id: 1, nome: "Minecraft", categoria: "aventura", ano: 2011, plataforma: "PC" },
    { id: 2, nome: "GTA V", categoria: "acao", ano: 2013, plataforma: "PC" },
    { id: 3, nome: "The Witcher 3", categoria: "rpg", ano: 2015, plataforma: "PC" },
    { id: 4, nome: "Stardew Valley", categoria: "simulacao", ano: 2016, plataforma: "PC" },
    { id: 5, nome: "Elden Ring", categoria: "rpg", ano: 2022, plataforma: "PlayStation" },
    { id: 6, nome: "God of War Ragnarok", categoria: "acao", ano: 2022, plataforma: "PlayStation" },
    { id: 7, nome: "Hollow Knight", categoria: "aventura", ano: 2017, plataforma: "PC" },
    { id: 8, nome: "Cyberpunk 2077", categoria: "rpg", ano: 2020, plataforma: "PC" }
];

// Mostrar informações de cada requisição
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

// Rota inicial
app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo à API de Jogos!"
    });
});

// Lista os jogos e permite filtrar por categoria e limite
app.get("/jogos", (req, res) => {
    let resultado = jogos;

    if (req.query.categoria) {
        resultado = resultado.filter(jogo =>
            jogo.categoria === req.query.categoria
        );
    }

    if (req.query.limite !== undefined) {
        const limite = parseInt(req.query.limite);

        if (isNaN(limite) || limite < 0) {
            return res.status(400).json({
                erro: "O limite deve ser um número válido."
            });
        }

        resultado = resultado.slice(0, limite);
    }

    res.status(200).json(resultado);
});

// Requisito próprio: mostra a quantidade de jogos cadastrados
app.get("/jogos/total", (req, res) => {
    res.status(200).json({
        total: jogos.length
    });
});

// Busca um jogo pelo id
app.get("/jogos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            erro: "O id deve ser um número."
        });
    }

    const jogo = jogos.find(item => item.id === id);

    if (!jogo) {
        return res.status(404).json({
            erro: "Jogo não encontrado."
        });
    }

    res.status(200).json(jogo);
});

// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
