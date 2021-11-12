import React, {useEffect} from 'react';
import {Text, View, Animated, StyleSheet, Button} from 'react-native';
import Fondo from '../../assets/sundae.png';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('city_db.db');

export default function Home ({ navigation }) {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tbl_city'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tbl_city', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tbl_city(city_id INTEGER PRIMARY KEY AUTOINCREMENT, city_name VARCHAR(100), city_state VARCHAR(100), city_country VARCHAR(100))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image source={Fondo} style={styles.image} />
      <Animated.Text style={styles.text}>Sundae Weather</Animated.Text>
      <Text style={styles.descripcion}>
        Informacion del proyecto, proposito de la aplicacion, descripcion de
        funcionalidades y uso de la misma.
      </Text>
      <Button
        title="Iniciar"
        color="#CD5C5C"
        onPress={() => navigation.navigate('ViewAllCities')}
      />
    </View>
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
    // fontFamily: 'FredokaOne-Regular',
    color: '#CD5C5C',
    fontSize: 50,
  },
  descripcion: {
    // fontFamily: 'Gluten-Bold',
    color: '#CD5C5C',
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    color: '#CD5C5C',
  },
});
