//Array.map((params) => return);
//retorna um novo array
let pessoas = [
    { nome: 'Gabriel', sobrenome: 'Kunz', telefone: '49988576745' },
    { nome: 'Joao', sobrenome: 'Silva', telefone: '3123123123' },
    { nome: 'Pedro', sobrenome: 'Souza', telefone: '12312312334' },
];

let nomesCompletos = pessoas.map(pessoa => `${pessoa.nome} ${pessoa.sobrenome}`)

//console.log(nomesCompletos);

// Array.reduce((acumulador, elementoAtual) => return);
// Fazer somas
let movimentacoes = [
    { descricao: 'Salário', valor: 1000 },
    { descricao: 'Pagamento de Conta de Luz', valor: -50 },
    { descricao: 'Pagamento de Internet', valor: -100 },
    { descricao: 'Pagamento de Mercado', valor: -600 },
    { descricao: 'Empréstimo do Agiota', valor: 350 },
    { descricao: 'Pagamento de Mercado', valor: -900 },
];

// objetivo: saber meu saldo
let saldo = movimentacoes
    .map((movimentacao) => movimentacao.valor)
    .reduce((soma, valorAtual) => soma + valorAtual);

//console.log(saldo);

// movimentacoes.map((movimentacao, posicao) => {
//     console.log(`Movimentação ${posicao}: ${movimentacao.descricao}`)
// });

//FIND - Encontrar um elemento e RETORNAR caso encontrar.
// caso tenha mais de um igual no array, nao importa, vai retornar o primeiro;
console.log(movimentacoes.find(movimentacao => movimentacao.descricao === 'Pagamento de Mercado'));


//FILTER - Mesma sequencia do FIND, porem retorna TODOS os que atendem a condicao
let animais = [
    { nome: 'Bilu', especie: 'gato' },
    { nome: 'Tobi', especie: 'cachorro' },
    { nome: 'Bob', especie: 'cachorro' },
    { nome: 'Rex', especie: 'cachorro' },
    { nome: 'Mia', especie: 'gato' },
];

console.log(animais.filter(animal => animal.especie === 'cachorro'))


console.log('Receitas!!!')
console.log(movimentacoes.filter(m => m.valor > 0));

//Includes
// Saber se já existe no array;

let numeros = [1, 2, 3];
console.log(numeros.includes(4))