import AsyncStorage from '@react-native-async-storage/async-storage';

let pos

async function carregarDados() {
    let data
    data = await AsyncStorage.getItem('devedores')
    if (data) {
        return await JSON.parse(data);
    } else { return [] }
}

async function salvarDados(item) {
    let devedores = await carregarDados()
    let allDebts = []

    if (devedores[0]) {
        allDebts = devedores
        allDebts.push(item);
        await AsyncStorage.setItem('devedores', JSON.stringify(allDebts));
    } else {
        allDebts.push(item);
        await AsyncStorage.setItem('devedores', JSON.stringify(allDebts));
    }
}


async function editarDivida(item, novoProduto, somaValor) {
    let listDividas = await carregarDados()
    pos = listDividas.findIndex(dividas => dividas.id === item.id)

    let prod = item.produto + '\n' + novoProduto
    let novoValor = item.valor + parseInt(somaValor)
    let dadosEdicao = {
        id: item.id, tCliente: item.tCliente, nome: item.nome, apelido: item.apelido,
        produto: prod, valor: parseInt(novoValor)
    }

    listDividas[pos] = dadosEdicao
    await AsyncStorage.setItem('devedores', JSON.stringify(listDividas))

    return [prod, novoValor]

}

async function pagarDivida(item, abateValor) {

    let listDividas = await carregarDados()
    pos = listDividas.findIndex(dividas => dividas.id === item.id)

    if (abateValor) {

        let novoValor = item.valor - abateValor
        let restante = novoValor

        let dadosPagamento = {
            id: item.id, tCliente: item.tCliente, nome: item.nome, apelido: item.apelido,
            produto: item.produto, valor: parseInt(novoValor)
        }

        listDividas[pos] = dadosPagamento

        await AsyncStorage.setItem('devedores', JSON.stringify(listDividas));

        return restante

    } else { alert('Insira o valor para abater') }
}
module.exports = {
    carregarDados,
    salvarDados,
    editarDivida,
    pagarDivida
}