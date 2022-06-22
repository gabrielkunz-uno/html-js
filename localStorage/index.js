const meuFormulario = document.getElementById('meuForm');

meuFormulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let dados = $('#meuForm').serializeArray();
    let pessoa = arrayToObject(dados);

    let pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    pessoas.push(JSON.stringify(pessoa));
    localStorage.setItem('pessoas', JSON.stringify(pessoas));
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