import React from 'react';
import {Text, View, Animated, StyleSheet, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import Fondo from './assets/sundae.png';
import Home from './app/screens/Home';
import Detail from './app/screens/Detail';
import Maps from './app/screens/Maps';
import Weather from './app/screens/Weather';
import Add from './app/screens/Add';
import ViewAllCities from './app/screens/Detail/ViewAllCities';
import Delete from './app/screens/Delete';


const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={ {title: 'Home'} } />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Maps" component={Maps} options={ {title: 'Ubicación'} }/>
        <Stack.Screen name="Weather" component={Weather} options={ {title: 'Clima actual'} }/>
        <Stack.Screen name="Add" component={Add} options={ {title: 'Agregar ciudad'} }/>
        <Stack.Screen name="ViewAllCities" component={ViewAllCities} options={ {title: 'Mis ciudades'} } />
        <Stack.Screen name="Delete" component={Delete} options={ {title: 'Eliminar ciudad'} }/>
      </Stack.Navigator>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FDEDEC',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'FredokaOne-Regular',
    color: '#CD5C5C',
    fontSize: 50,
  },
  descripcion: {
    fontFamily: 'Gluten-Bold',
    color: '#CD5C5C',
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    color: '#CD5C5C',
  },
});

export default App;