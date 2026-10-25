const prompt = require('prompt-sync')();

let numeros = [];

let quantidade = parseInt(prompt("Quantos números deseja inserir? "));

for (let i = 0; i < quantidade; i++) {
    let numero = parseFloat(prompt(`Digite o ${i + 1}º número: `));
    numeros.push(numero);
}

console.log("\nArray original:", numeros);

console.log("Maior valor:", Math.max(...numeros));
console.log("Menor valor:", Math.min(...numeros));

let dobro = numeros.map(numero => numero * 2);

console.log("Dobro dos números:", dobro);

let maioresQueCinco = numeros.filter(numero => numero > 5);

console.log("Números maiores que 5:", maioresQueCinco);