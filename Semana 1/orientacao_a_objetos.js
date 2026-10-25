class Livro {
    constructor(titulo, autor, ano) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }

    detalhes() {
        console.log(`Livro: ${this.titulo} | Autor: ${this.autor} | Ano: ${this.ano}`);
    }
}

let livro1 = new Livro("Dom Casmurro", "Machado de Assis", 1899);

let livro2 = new Livro("O Pequeno Príncipe", "Antoine de Saint-Exupéry", 1943);

livro1.detalhes();

livro2.detalhes();