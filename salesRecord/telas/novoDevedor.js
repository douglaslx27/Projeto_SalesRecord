import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'

export default function NovoDevedor({ navigation }) {

    const [id, setId] = useState(uuid.v4());
    const [nome, setNome] = useState();
    const [apelido, setApelido] = useState();
    const [produto, setProduto] = useState();
    const [valor, setValor] = useState();
    const [onFocusedNome, setonFocusedNome] = useState(false)
    const [onFocusedApelido, setonFocusedApelido] = useState(false)
    const [onFocusedProduto, setonFocusedProduto] = useState(false)
    const [onFocusedValor, setonFocusedValor] = useState(false)

    function onFocused() {

        setonFocusedNome(false)
        setonFocusedApelido(false)
        setonFocusedProduto(false)
        setonFocusedValor(false)
    }

    async function salvarDados() {

        setId(uuid.v4())

        const newDebt = { id, nome, apelido, produto, valor: parseFloat(valor) };
        let allDebts = [];
        let devedores = await AsyncStorage.getItem('devedores')

        if (!nome) {
            return (alert('Insira o Nome'))
        }
        if (!produto) {
            return (alert('Insira o Produto'))
        }
        if (!valor) {
            return (alert('Insira o Valor'))
        }

        if (devedores) {
            allDebts = JSON.parse(devedores)
            allDebts.push(newDebt);
            await AsyncStorage.setItem('devedores', JSON.stringify(allDebts));
        } else {
            allDebts.push(newDebt);
            await AsyncStorage.setItem('devedores', JSON.stringify(allDebts));
        }

        devedores = await AsyncStorage.getItem('devedores')
        setNome('')
        setApelido('')
        setProduto('')
        setValor('')
        navigation.navigate('Lista de Devedores')
    }

    return (

        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <View style={styles.container}>
                <Text style={styles.text}>
                    Nome do Cliente
                </Text>
                <TextInput
                    style={
                        onFocusedNome == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    }
                    placeholder={'Digite o nome aqui'}
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setonFocusedNome(true)}
                    onBlur={() => onFocused()}
                />
                <Text style={styles.text}>
                    Apelido
                </Text>
                <TextInput
                    style={
                        onFocusedApelido == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    }
                    placeholder={'Digite o apelido aqui'}
                    value={apelido}
                    onChangeText={text => setApelido(text)}
                    onFocus={() => setonFocusedApelido(true)}
                    onBlur={() => onFocused()}
                />
                <Text style={styles.text}>
                    Produto / Serviço
                </Text>
                <TextInput
                    style={
                        onFocusedProduto == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    } placeholder={'Digite o produto / serviço aqui'}
                    onChangeText={text => setProduto(text)}
                    value={produto}
                    onFocus={() => setonFocusedProduto(true)}
                    onBlur={() => onFocused()}
                />
                <Text style={styles.text}>
                    Valor
                </Text>
                <TextInput
                    style={
                        onFocusedValor == true
                            ?
                            styles.inputTrue
                            :
                            styles.inputFalse
                    }
                    placeholder={'Digite o valor aqui'}
                    value={valor}
                    keyboardType={'decimal-pad'}
                    onChangeText={text => setValor(text)}
                    onFocus={() => setonFocusedValor(true)}
                    onBlur={() => onFocused()}
                />
                <TouchableHighlight
                    style={styles.btn}
                    onPress={() => salvarDados()}
                >
                    <Text style={styles.text}>
                        Salvar
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
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#7FFFD4'
    },
    text: {
        fontSize: 20,
        color: '#252'
    },
    inputFalse: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#060',
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
        borderColor: '#9f9',
        marginBottom: 10,
        width: '90%',
        padding: 5,
        paddingLeft: 10,
        fontSize: 18,
        backgroundColor: '#fff'
    },
    btn: {
        padding: 5,
        margin: 10,
        backgroundColor: '#00FA9A',
        borderWidth: 2,
        borderRadius: 20,
        width: '50%',
        alignItems: 'center'
    },
});