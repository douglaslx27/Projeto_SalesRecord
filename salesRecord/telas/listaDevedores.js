import React, { useCallback, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Listagem from '../componentes/listagem';

export default function ListaDevedores({ navigation }) {

    const [dados, setDados] = useState();
    const [pesquisa, setPesquisa] = useState('');
    const [pesquisaFocused, setPesquisaFocused] = useState(false);
    let pesquisaNome = '';
    let pesquisaApelido = '';
    let qtdDevedores;
    let totalDivida = 0;

    let listDividas


    useFocusEffect(useCallback(() => {

        async function carregarDados() {
            let data
            data = await AsyncStorage.getItem('devedores')
            setDados(await JSON.parse(data))
        }
        carregarDados()

    }, []))
    if (dados) {
        listDividas = dados
        pesquisaNome = listDividas.filter(
            dividas => dividas.nome.toLocaleLowerCase().
                startsWith(pesquisa.toLocaleLowerCase())
        )
        pesquisaApelido = listDividas.filter(
            dividas => dividas.apelido.toLocaleLowerCase().
                startsWith(pesquisa.toLocaleLowerCase())
        )
    }

    if (listDividas) {
        qtdDevedores = listDividas.length
        for (let x = 0; x <= qtdDevedores - 1; x++) {
            totalDivida += listDividas[x].valor
        }
        totalDivida = totalDivida.toFixed(2)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={
                    pesquisaFocused == true
                        ?
                        styles.campoPesquisaTrue
                        :
                        styles.campoPesquisaFalse
                }
                placeholder={'Pesquisar'}
                onFocus={() => setPesquisaFocused(true)}
                onBlur={() => setPesquisaFocused(false)}
                onChangeText={(text) => setPesquisa(text)}
            />
            <Text style={styles.textTotal}>
                Total a Receber: R${totalDivida}
            </Text>

            <View style={styles.estiloLista}>

                {
                    pesquisaNome != ''
                        ?
                        <Listagem dividas={pesquisaNome} navigation={navigation} />
                        :
                        <Listagem dividas={pesquisaApelido} navigation={navigation} />
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#7FFFD4'
    },
    textTotal: {
        fontSize: 20,
        color: '#2F4F2F'
    },
    campoPesquisaFalse: {
        borderWidth: 2,
        width: '70%',
        borderRadius: 20,
        padding: 3,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18
    },
    campoPesquisaTrue: {
        borderWidth: 4,
        width: '70%',
        borderRadius: 20,
        padding: 3,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18,
        backgroundColor: '#fff',
        borderColor: '#9f9'
    },
    estiloLista: {
        marginTop: 10,
        width: '99%',
        height: '85%',
        flexDirection: 'row',
    }
})