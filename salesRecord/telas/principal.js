import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import Model from '../componentes/model';

export default function Principal({ navigation }) {

    async function ListaDeDevedores() {
        let listDividas = await Model.carregarDados();
        if (listDividas[0]) {
            navigation.navigate('Lista de Devedores')
        } else (alert('AINDA NÃO POSSUI VENDAS CADASTRADAS'))
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.btn}
                activeOpacity={0.4} underlayColor='#7FFFD4'
                onPress={() => navigation.navigate('Novo Devedor')}
            >
                <Text style={styles.textBtn}>
                    Nova Venda
                </Text>
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.btn}
                activeOpacity={0.4} underlayColor='#7FFFD4'
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
        backgroundColor: '#7FFFD4'
    },
    btn: {
        padding: 20,
        margin: 10,
        backgroundColor: '#00FA9A',
        borderWidth: 2,
        borderRadius: 20,
        width: '50%',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: 20,
        color: '#000'
    }
})