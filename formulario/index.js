const formulario = document.getElementById('formulario');
const tabelaProdutos = document.getElementById('tabelaProdutos');

popularTabelaAoCarregarPagina();
adicionarEventosDosBotoesDeExclusao();

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let data = $('#formulario').serializeArray();
    let produto = arrayToObject(data);

    //SET - Setar, definir, salvar
    //GET - Pegar, buscar

    //recuperar os registros já cadastrados no banco
    //como no banco ta cadastrado como string, precisamos do JSON.parse()
    //para forçar a ser um objeto/array
    let produtosCadastrados = JSON.parse(localStorage.getItem('produtos')) || [];

    let codigoDuplicado = produtosCadastrados
        .map(produtoCadastrado => (JSON.parse(produtoCadastrado)).codigo) //percorrendo o array de produtos e formando um novo array só com o código
        .includes(produto.codigo); // verifica com o array formado se o código do produto novo já está cadastrado

    if (codigoDuplicado) {
        alert('Já existe um produto cadastrado com esse código. Não é possível cadastrar esse produto.');
        return;
    }

    //adiciona o produto que esta sendo cadastrado ao array de produtos ja
    //cadastrados no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    produtosCadastrados.push(JSON.stringify(produto));

    //atualizar os produtos no banco de dados
    //- precisa ser com JSON.stringify() pois o banco apenas aceita string
    localStorage.setItem('produtos', JSON.stringify(produtosCadastrados))

    //adiciona produto cadastrado na tabela visualmente
    adicionarProdutoNaTabela(produto);
    adicionarEventosDosBotoesDeExclusao();
});

// o parametro "array" deve ser gerado a partir da funcao
// .serializeArray() do jQuery para funcionar corretamente
function arrayToObject(array) {
    let object = {};
    array.forEach(campo => {
        object[campo.name] = campo.value;
    });
    return object;
}

function adicionarProdutoNaTabela(produto) {
    //cria um novo elemento <tr><tr> e atribui pra variavel tr
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <tr>
            <td>${produto.codigo}</td>
            <td>${produto.descricao}</td>
            <td>R$ ${Number(produto.valorVenda).toFixed(2)}</td>
            <td>R$ ${Number(produto.precoCusto).toFixed(2)}</td>
            <td>
                <button class="btn btn-outline-danger exclusao" data-produto="${produto.codigo}">
                    Excluir
                </button>
            </td>
        </tr>
    `;
    tabelaProdutos.appendChild(tr);
}

function popularTabelaAoCarregarPagina() {
    let produtosDoLocalStorage = JSON.parse(localStorage.getItem('produtos')) || [];
    produtosDoLocalStorage.forEach(produto => {
        produto = JSON.parse(produto);
        adicionarProdutoNaTabela(produto);
    });
};

function adicionarEventosDosBotoesDeExclusao() {
    //para garantir, a gente remove os eventos de todos os botoes
    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.removeEventListener('click', (evento) => excluirRegistro(evento))
    });

    //cria os eventos novamente para os botoes
    $('.exclusao').toArray().forEach(botaoExclusao => {
        botaoExclusao.addEventListener('click', (evento) => excluirRegistro(evento))
    });

    function excluirRegistro(evento) {
        console.log(evento);
        let produtoParaExcluir = evento.target.dataset.produto;
        if (confirm(`Deseja excluir o produto ${produtoParaExcluir}?`)) {
            //buscamos todos os produtos cadastrados
            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

            //percorremos o array de produtos cadastrados e transformamos
            //cada produto em um objeto (JSON.parse()) por que a gente precisa
            //acessar as propriedades do produto. sem o JSON.parse() o produto seria
            //uma string.
            produtos = produtos.map(produto => JSON.parse(produto));
            
            //findIndex
            // é um laço que percorre todo o array ATÉ QUE a condição seja TRUE
            let index = produtos.findIndex(produto => produto.codigo == produtoParaExcluir);
            
            //remover do array com base do index retornado anteriormente
            produtos.splice(index, 1);

            produtos = produtos.map(produto => JSON.stringify(produto));
            localStorage.setItem('produtos', JSON.stringify(produtos));
            document.location.reload(true);
        };
    }
}