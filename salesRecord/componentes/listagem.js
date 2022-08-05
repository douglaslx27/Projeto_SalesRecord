import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';

export default function Listagem(props) {
    return (

        <FlatList
            data={props.dividas}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <View style={styles.listagem}>
                    <TouchableHighlight
                        activeOpacity={0.7} underlayColor='#7FFFD4'
                        onPress={() => props.navigation.navigate('Dados da Dívida', item)}
                    >
                        <View style={styles.card}>
                            <Text style={styles.titulo}>Nome </Text>
                            <Text style={styles.text}>{item.nome} </Text>
                            <Text style={styles.titulo}>Apelido</Text>
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
        backgroundColor: '#00FA9A',
        borderRadius: 15,
    },
    card: {
        alignItems: 'center'
    },
    titulo: {
        fontSize: 16,
        color: '#2F4F2F'
    },
    text: {
        fontSize: 14,
        color: '#238E23'
    }
})