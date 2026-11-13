# API de Jogos

API feita com Node.js e Express para a atividade de Desenvolvimento Web 2.

## Como instalar e rodar

1. Abra o terminal na pasta do projeto.
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor:

```bash
node index.js
```

O servidor vai rodar em `http://localhost:3000`.

## Rotas

| Método | Endereço de exemplo | O que faz |
|---|---|---|
| GET | `http://localhost:3000/` | Mostra uma mensagem de bem vindo. |
| GET | `http://localhost:3000/jogos` | Mostra todos os jogos. |
| GET | `http://localhost:3000/jogos/3` | Mostra o jogo com id 3. |
| GET | `http://localhost:3000/jogos?categoria=rpg` | Filtra os jogos pela categoria. |
| GET | `http://localhost:3000/jogos?limite=3` | Mostra somente os três primeiros jogos. |
| GET | `http://localhost:3000/jogos/total` | Mostra a quantidade total de jogos. |

## Requisito próprio

A rota `/jogos/total` foi adicionada para mostrar quantos jogos existem no array.
