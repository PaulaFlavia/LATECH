const sequelize = require('sequelize');
// 2 - Criar um objeto contendo os dados da conexão
const config = require('./config.js');
// 3 - Cria a conexão
const conexao = new sequelize(config);
// 4 - Realiza a consulta (assíncronas)!!!
let resultado = conexao.query("SELECT * FROM produtos");
console.log(resultado)


async function levantarProdutos() {

    try {
        let resultado = await conexao.query("SELECT * FROM produtos");
        console.log(resultado);
    } catch (error) {
        console.log("Deu muito ruim!");
        console.log(error.parent.errno);
    }

    conexao.close();
}
levantarProdutos()