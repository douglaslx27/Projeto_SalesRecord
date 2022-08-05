import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Principal from './telas/principal';
import NovoDevedor from './telas/novoDevedor';
import ListaDevedores from './telas/listaDevedores';
import DadosDivida from './telas/dadosDivida';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Principal'
          component={Principal}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#00FA9A',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,

            },
          }}
        />
        <Stack.Screen
          name='Novo Devedor'
          component={NovoDevedor}
          options={{
            title: 'Nova Venda',
            headerStyle: {
              backgroundColor: '#00FA9A',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,

            },
          }}
        />
        <Stack.Screen
          name='Lista de Devedores'
          component={ListaDevedores}
          options={{
            title: 'Lista de Vendas',
            headerStyle: {
              backgroundColor: '#00FA9A',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,

            },
          }}
        />
        <Stack.Screen
          name='Dados da Dívida'
          component={DadosDivida}
          options={{
            title: 'Dados da Venda',
            headerStyle: {
              backgroundColor: '#00FA9A',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 30,

            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}