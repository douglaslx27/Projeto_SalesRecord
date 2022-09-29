import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';
import Model from '../componentes/model'

import colors from './colors';

export default function Listagem(props) {

    return (

        <FlatList
            data={props.dividas}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <View style={styles.listagem}>
                    <TouchableHighlight
                        activeOpacity={0.7} underlayColor={colors.underlayColorBtn}
                        onPress={() => props.navigation.navigate('Dados da Dívida', item)}
                    >
                        <View style={styles.card}>
                            {
                                item.tCliente == 'Pessoa' ?
                                    <Text style={styles.titulo}>
                                        Nome
                                    </Text>
                                    :
                                    <Text style={styles.titulo}>
                                        CNPJ
                                    </Text>
                            }
                            <Text style={styles.text}>{item.nome} </Text>
                            {
                                item.tCliente == 'Pessoa' ?
                                    <Text style={styles.titulo}>
                                        Apelido
                                    </Text>
                                    :
                                    <Text style={styles.titulo}>
                                        Nome da empresa
                                    </Text>
                            }
                            <Text style={styles.text}>{item.apelido} </Text>
                            <Text style={styles.titulo}>Valor</Text>
                            <Text style={styles.text}>R$ {item.valor.toFixed(2)}</Text>
                        </View>


                    </TouchableHighlight>
                </View>

            }
        />
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: '80%',
        flexDirection: 'row',
    },
    listagem: {
        borderWidth: 1,
        margin: 5,
        padding: 3,
        width: '30%',
        backgroundColor: colors.backgroundSubContainer,
        borderRadius: 15,
    },
    card: {
        alignItems: 'center'
    },
    titulo: {
        fontSize: 16,
        color: colors.colorTitle
    },
    text: {
        fontSize: 14,
        color: colors.colorText
    }
})