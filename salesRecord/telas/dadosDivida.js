import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Model from '../componentes/model'

export default function DadosDivida({ navigation, route }) {
    const item = route.params
    const [restante, setRestante] = useState(item.valor)
    const [produtoServico, setprodutoServico] = useState(item.produto)
    const [onFocusedPagar, setOnFocusedPagar] = useState(false)
    const [onFocusedEditar, setOnFocusedEditar] = useState(false)
    const [onFocusedEditarV, setOnFocusedEditarV] = useState(false)
    const [edicaoPagamento, setEdicaoPagamento] = useState('')
    const [abateValor, setAbateValor] = useState()
    const [novoProdutoServico, setNovoProdutoServico] = useState()
    const [novoProdutoValor, setNovoProdutoValor] = useState()

    async function editarDivida() {
        if (novoProdutoServico && novoProdutoValor) {
            item.valor = restante
            item.produto = produtoServico;
            let novoProdValor = await Model.editarDivida(item, novoProdutoServico, novoProdutoValor)
            setRestante(novoProdValor[1])
            setprodutoServico(novoProdValor[0])
            setEdicaoPagamento('')
            console.log(restante, novoProdValor)
        } else {
            alert('Informe os novos Produtos/Serviços e o novo Valor.')
            setEdicaoPagamento('')
        }
    }

    async function pagar() {
        if (abateValor) {
            item.valor = restante
            item.produto = produtoServico;
            setRestante(await Model.pagarDivida(item, abateValor))
            setEdicaoPagamento('')
        } else {
            alert('Insira o valor para abater')
            setEdicaoPagamento('')
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>
                        NOME
                    </Text>
                    <Text style={styles.text}>
                        {item.nome}
                    </Text>
                    <Text style={styles.title}>
                        APELIDO
                    </Text>
                    <Text style={styles.text}>
                        {item.apelido}
                    </Text>
                    <Text style={styles.title}>
                        PRODUTO / SERVIÇO
                    </Text>
                    <Text style={styles.text}>
                        {produtoServico}
                    </Text>
                    <Text style={styles.title}>
                        TOTAL DA DÍVIDA
                    </Text>
                    <Text style={styles.text}>
                        R$ {restante.toFixed(2)}
                    </Text>

                </View>

                {
                    edicaoPagamento == ''
                        ?
                        <View style={styles.edicaoPagamento}>
                            <TouchableHighlight
                                style={styles.btn}
                                onPress={() => setEdicaoPagamento('edicao')}
                            >
                                <Text style={styles.textBtn}>
                                    Editar Dívida
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.btn}
                                onPress={() => setEdicaoPagamento('pagamento')}
                            >
                                <Text style={styles.textBtn}>
                                    Pagar Dívida
                                </Text>
                            </TouchableHighlight>
                        </View>
                        : edicaoPagamento == 'pagamento' ?
                            <View style={styles.viewPagamento}>
                                <TextInput
                                    placeholder={'Digite o valor'}
                                    keyboardType={'decimal-pad'}
                                    onFocus={() => setOnFocusedPagar(true)}
                                    onBlur={() => setOnFocusedPagar(false)}
                                    style={
                                        onFocusedPagar == false
                                            ?
                                            styles.inputFalse
                                            :
                                            styles.inputTrue
                                    }
                                    onChangeText={text => setAbateValor(text)}
                                />
                                <TouchableHighlight
                                    style={styles.btn}
                                    onPress={() => pagar()}
                                >
                                    <Text style={styles.textBtn}>
                                        Abater Valor
                                    </Text>

                                </TouchableHighlight>
                            </View>
                            :
                            <View style={styles.viewEditar}>
                                <TextInput
                                    placeholder='Informe os novos produtos ou serviços'
                                    onFocus={() => setOnFocusedEditar(true)}
                                    onBlur={() => setOnFocusedEditar(false)}
                                    style={
                                        onFocusedEditar == false
                                            ?
                                            styles.inputFalse
                                            :
                                            styles.inputTrue
                                    }
                                    onChangeText={text => setNovoProdutoServico(text)}
                                />
                                <TextInput
                                    placeholder='Informe o valor'
                                    keyboardType={'decimal-pad'}
                                    onFocus={() => setOnFocusedEditarV(true)}
                                    onBlur={() => setOnFocusedEditarV(false)}
                                    style={
                                        onFocusedEditarV == false
                                            ?
                                            styles.inputFalse
                                            :
                                            styles.inputTrue
                                    }
                                    onChangeText={text => setNovoProdutoValor(text)}
                                />
                                <TouchableHighlight
                                    style={styles.btn}
                                    onPress={() => editarDivida()}
                                >
                                    <Text style={styles.textBtn}>
                                        Salvar
                                    </Text>

                                </TouchableHighlight>
                            </View>
                }

            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#7FFFD4'
    },
    subContainer: {
        alignItems: 'center',
        paddingLeft: 7,
        paddingRight: 5,
        marginTop: 20,
        width: '80%',
        backgroundColor: '#00FA9A',
        borderWidth: 1,
        borderRadius: 20,
    },
    viewPagamento: {
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    viewEditar: {
        marginTop: 10,
        alignItems: 'center',
    },
    inputFalse: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#060',
        marginBottom: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        width: '40%',
        padding: 5,
        marginTop: 10
    },
    inputTrue: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#9f9',
        marginBottom: 10,
        width: '40%',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: '#fff',
        marginTop: 10
    },
    title: {
        fontSize: 25,
        color: '#2F4F2F',
        marginTop: 10
    },
    text: {
        fontSize: 22,
        color: '#238E23'
    },
    btn: {
        padding: 10,
        backgroundColor: '#00FA9A',
        borderWidth: 2,
        borderRadius: 20,
        marginLeft: 5,
        alignItems: 'center'
    },
    textBtn: {
        fontSize: 18,
        color: '#238E23'
    },
    edicaoPagamento: {
        flexDirection: 'row',
        marginTop: 10,
    }
})