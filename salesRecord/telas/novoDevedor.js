import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard,
    Modal
} from 'react-native';

import colors from '../componentes/colors';
import Model from '../componentes/model'
import uuid from 'react-native-uuid'

export default function NovoDevedor({ navigation }) {

    const [id, setId] = useState(uuid.v4());
    const [nome, setNome] = useState();
    const [apelido, setApelido] = useState();
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState(parseFloat(0.00));
    const [nProduto, setNProduto] = useState();
    const [nValor, setNValor] = useState();
    const [onFocusedNome, setonFocusedNome] = useState(false)
    const [onFocusedApelido, setonFocusedApelido] = useState(false)
    const [onFocusedProduto, setonFocusedProduto] = useState(false)
    const [onFocusedValor, setonFocusedValor] = useState(false)
    const [visible, setVisible] = useState(false)
    const [visibleTC, setVisibleTC] = useState(true)
    const [tCliente, setTCliente] = useState()

    function onFocused() {

        setonFocusedNome(false)
        setonFocusedApelido(false)
        setonFocusedProduto(false)
        setonFocusedValor(false)
    }
    function setTipoCLiente(text) {
        setVisibleTC(false)
        setTCliente(text)
    }

    function novoProduto(text, val, action) {

        if (!val) {
            val = parseFloat(0.00)
        }
        if (text) {
            if (produto == '') {
                setProduto(text)
            } else {
                setProduto(produto + '\n' + text)
            }
        }
        if (valor == '') {
            setValor(parseFloat(val))
        } else {
            setValor(parseFloat(valor) + parseFloat(val))
        }

        if (action == 'Finalizar') {
            setVisible(true)
        }
        if (action == 'Adicionar') {
            setNProduto('')
            setNValor('')
        }
    }

    async function salvar() {

        setId(uuid.v4())

        const newDebt = { id, tCliente, nome, apelido, produto, valor };

        if (!nome) {
            setVisible(false)
            return (alert('Preencha o campo com *'))
        }
        if (tCliente == 'Empresa' && nome.length != 14) {

            return (alert('O CNPJ DEVE TER 14 NÚMEROS'))

        }
        if (produto && !valor) {
            setProduto('')
            setVisible(false)
            return (alert('Insira o Valor'))
        }

        await Model.salvarDados(newDebt)

        setNome('')
        setApelido('')
        setProduto('')
        setValor('')
        setVisible(false)
        setNProduto('')
        setNValor('')
        navigation.navigate('Lista de Devedores')
    }

    return (

        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style={styles.container}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={visible}
                >
                    <View style={styles.containerModal}>

                        <Text style={styles.title}>
                            ESTÁ TUDO CERTO?
                        </Text>

                        {
                            tCliente == 'Pessoa' ?
                                <Text style={styles.subTitle}>
                                    NOME
                                </Text>
                                :
                                <Text style={styles.subTitle}>
                                    CNPJ
                                </Text>
                        }

                        <Text style={styles.text}>
                            {nome}
                        </Text>
                        {
                            tCliente == 'Pessoa' ?
                                <Text style={styles.subTitle}>
                                    Apelido
                                </Text>
                                :
                                <Text style={styles.subTitle}>
                                    Nome da empresa
                                </Text>
                        }
                        <Text style={styles.text}>
                            {apelido}
                        </Text>
                        <Text style={styles.subTitle}>
                            PRODUTO / SERVIÇO
                        </Text>
                        <Text style={styles.text}>
                            {produto}
                        </Text>
                        <Text style={styles.subTitle}>
                            TOTAL
                        </Text>
                        <Text style={styles.text}>
                            R$ {valor}
                        </Text>
                        <TouchableHighlight
                            style={styles.btn}
                            activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                            onPress={() => salvar()}
                        >
                            <Text style={styles.text}>
                                Salvar
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.btn}
                            activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={styles.text}>
                                Voltar
                            </Text>
                        </TouchableHighlight>

                    </View>

                </Modal>

                <View style={styles.containerTipoCliente}>
                    <Text style={styles.text}>
                        QUAL O TIPO DE CLIENTE?
                    </Text>
                    <View style={styles.containerTCliente}>
                        <TouchableHighlight
                            style={styles.btn}
                            activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                            onPress={() => setTipoCLiente('Pessoa')}
                        >
                            <Text style={styles.textTCliente}>
                                PESSOA
                            </Text>

                        </TouchableHighlight>
                        <TouchableHighlight
                            style={styles.btn}
                            activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                            onPress={() => setTipoCLiente('Empresa')}
                        >
                            <Text style={styles.textTCliente}>
                                EMPRESA
                            </Text>

                        </TouchableHighlight>

                    </View>
                </View>

                {
                    tCliente == 'Pessoa' ?
                        <Text style={styles.text}>
                            Nome do cliente
                        </Text>
                        :
                        <Text style={styles.text}>
                            CNPJ do cliente
                        </Text>
                }
                <TextInput
                    style={
                        onFocusedNome == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    }
                    placeholder={'* Digite Aqui'}
                    value={nome}
                    keyboardType={tCliente == 'Pessoa' ? 'default' : 'number-pad'}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setonFocusedNome(true)}
                    onBlur={() => onFocused()}
                    maxLength={tCliente == 'Pessoa' ? 50 : 14}
                />

                {
                    tCliente == 'Pessoa' ?
                        <Text style={styles.text}>
                            Apelido
                        </Text>
                        :
                        <Text style={styles.text}>
                            Nome da empresa
                        </Text>
                }
                <TextInput
                    style={
                        onFocusedApelido == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    }
                    placeholder={'Digite Aqui'}
                    value={apelido}
                    onChangeText={text => setApelido(text)}
                    onFocus={() => setonFocusedApelido(true)}
                    onBlur={() => onFocused()}
                />
                <View style={styles.containerProdutoValor}>
                    <View style={styles.containerProduto} >
                        <Text style={styles.text}>
                            Produto / Serviço
                        </Text>
                        <TextInput
                            style={
                                onFocusedProduto == true
                                    ?
                                    styles.inputProdutoTrue
                                    :
                                    styles.inputProdutoFalse
                            }
                            //
                            placeholder={'Produto ou serviço'}
                            onChangeText={text => setNProduto(text)}
                            value={nProduto}
                            onFocus={() => setonFocusedProduto(true)}
                            onBlur={() => onFocused()}
                        />

                    </View>

                    <View style={styles.containerValor}>
                        <Text style={styles.text}>
                            Valor
                        </Text>
                        <TextInput
                            style={
                                onFocusedValor == true
                                    ?
                                    styles.inputValorTrue
                                    :
                                    styles.inputValorFalse
                            }
                            placeholder={'Valor'}
                            value={nValor}
                            keyboardType={'decimal-pad'}
                            onChangeText={text => setNValor(text)}
                            onFocus={() => setonFocusedValor(true)}
                            onBlur={() => onFocused()}
                        />

                    </View>

                </View>
                <TouchableHighlight
                    style={styles.btn}
                    activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                    onPress={() => novoProduto(nProduto, nValor, 'Adicionar')}
                >
                    <Text style={styles.text}>
                        Novo produto/serviço
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.btn}
                    activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                    onPress={() => novoProduto(nProduto, nValor, 'Finalizar')}
                >
                    <Text style={styles.text}>
                        Finalizar Venda
                    </Text>
                </TouchableHighlight>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: colors.backgroundContainer
    },
    containerModal: {
        margin: 20,
        width: '90%',
        // flex: 0.5,
        justifyContent: 'flex-start',
        //paddingTop: 30,
        alignItems: 'center',
        backgroundColor: colors.backgroundContainer
    },
    containerTipoCliente: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.backgroundContainer,
        borderWidth: 1,
        borderColor: colors.borderColorInputFalse,
        borderRadius: 20,
        marginBottom: 10
    },
    containerTCliente: {
        flexDirection: 'row',
    },
    containerProdutoValor: {
        flexDirection: 'row',
        width: '90%'
    },
    containerProduto: {
        width: '80%'
    },
    containerValor: {
        width: '20%'
    },
    title: {
        fontSize: 25,
        color: colors.colorTitle,
        marginTop: 10
    },
    subTitle: {
        fontSize: 22,
        color: colors.colorTitle,
        marginTop: 10
    },
    text: {
        fontSize: 20,
        color: colors.colorText
    },
    textTCliente: {
        fontSize: 16,
        color: colors.colorText
    },
    inputFalse: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColorInputFalse,
        marginBottom: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        width: '90%',
        padding: 5,
    },
    inputTrue: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: colors.borderColorInputTrue,
        marginBottom: 10,
        width: '90%',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: colors.backgroundInputTrue
    },
    inputProdutoFalse: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColorInputFalse,
        marginBottom: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        width: '90%',
        padding: 5,
    },
    inputProdutoTrue: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColorInputTrue,
        marginBottom: 10,
        width: '90%',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: colors.backgroundInputTrue
    },
    inputValorFalse: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColorInputFalse,
        marginBottom: 10,
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        //width: '25%',
        padding: 5,
    },
    inputValorTrue: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.borderColorInputTrue,
        marginBottom: 10,
        //width: '90%',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: colors.backgroundInputTrue
    },
    btn: {
        padding: 5,
        margin: 10,
        backgroundColor: colors.btn,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.borderColorInputFalse,
        //width: '30%',
        alignItems: 'center'
    },
});
/*
<TouchableHighlight
    style={styles.btn}
    activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
    onPress={() => salvar()}
>
    <Text style={styles.text}>
        Salvar
    </Text>
</TouchableHighlight>
*/