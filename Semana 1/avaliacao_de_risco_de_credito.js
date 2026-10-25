const prompt = require('prompt-sync')();

function avaliarRiscoDeCredito(rendaMensal, dividaAtual) {
    rendaMensal = parseFloat(rendaMensal);
    dividaAtual = parseFloat(dividaAtual);

    const TE = (dividaAtual / rendaMensal) * 100;

    if (TE < 10) {
        return "Risco Baixo";
    } else if (TE < 30) {
        return "Risco Moderado";
    } else {
        return "Risco Alto";
    }
}

let renda = prompt("Digite sua renda mensal: ");
let divida = prompt("Digite sua dívida atual: ");

let resultado = avaliarRiscoDeCredito(renda, divida);

console.log(`Classificação: ${resultado}`);