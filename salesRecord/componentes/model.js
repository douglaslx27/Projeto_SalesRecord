import AsyncStorage from '@react-native-async-storage/async-storage';

let pos

async function carregarDados() {
    let data
    data = await AsyncStorage.getItem('devedores')
    if (data) {
        return await JSON.parse(data);
    } else { return [] }
}

async function editarDivida(item, novoProduto, somaValor) {
    let listDividas = await carregarDados()
    pos = listDividas.findIndex(dividas => dividas.id === item.id)

    let prod = item.produto + ', ' + novoProduto
    let novoValor = item.valor + parseInt(somaValor)
    let dadosEdicao = {
        id: item.id, nome: item.nome, apelido: item.apelido,
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
            id: item.id, nome: item.nome, apelido: item.apelido,
            produto: item.produto, valor: parseInt(novoValor)
        }
        if (novoValor > 0) {
            listDividas[pos] = dadosPagamento
        } else {
            listDividas.splice(pos, 1)
        }

        await AsyncStorage.setItem('devedores', JSON.stringify(listDividas));

        return restante

    } else { alert('Insira o valor para abater') }
}
module.exports = {
    carregarDados,
    editarDivida,
    pagarDivida
}