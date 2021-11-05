import React from 'react';
import {Text, View, Animated, StyleSheet, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

//import Fondo from './assets/sundae.png';
import Home from './app/screens/Home';
import Detail from './app/screens/Detail';
import Maps from './app/screens/Maps';
import Weather from './app/screens/Weather';
import Add from './app/screens/Add';
import ViewAllCities from './app/screens/Detail/ViewAllCities';
import Delete from './app/screens/Delete';

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + 'SQLite/city.db'
//   );
//   return SQLite.openDatabase('city_db.db');
// }

const Stack = createNativeStackNavigator();

// Connction to access DB
//const db = openDatabase({name: 'city_db.db', createFromLocation: 1});

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Weather" component={Weather} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="ViewAllCities" component={ViewAllCities} />
        <Stack.Screen name="Delete" component={Delete} />
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