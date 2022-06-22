const formulario = document.getElementById('formulario');
const tabelaProdutos = document.getElementById('tabelaProdutos');

popularTabelaAoCarregarPagina();

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
            <td><button class="btn btn-outline-danger">Excluir</button></td>
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