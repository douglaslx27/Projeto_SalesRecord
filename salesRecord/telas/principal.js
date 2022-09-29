import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Modal
} from 'react-native';
import Model from '../componentes/model';
import colors from '../componentes/colors';

export default function Principal({ navigation }) {

    async function ListaDeDevedores() {
        let listDividas = await Model.carregarDados();
        if (listDividas[0]) {
            navigation.navigate('Lista de Devedores')
        } else (alert('NÃO POSSUI VENDAS CADASTRADAS'))
    }

    return (
        <View style={styles.container}>

            <TouchableHighlight
                style={styles.btn}
                activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                onPress={() => navigation.navigate('Novo Devedor')}
            >
                <Text style={styles.textBtn}>
                    Nova Venda
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.btn}
                activeOpacity={0.4} underlayColor={colors.underlayColorBtn}
                onPress={() => ListaDeDevedores()}
            >
                <Text style={styles.textBtn}>
                    Lista de Vendas
                </Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundContainer
    },
    containerTipoCliente: {
        marginTop: '50%',
        marginLeft: 20,
        paddingTop: 20,
        width: '90%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.backgroundContainer,
        borderRadius: 20
    },
    btn: {
        padding: 20,
        margin: 10,
        backgroundColor: colors.btn,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: colors.borderColorInputFalse,
        width: '50%',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: 20,
        color: colors.textBtn
    }
})