import React, {useEffect} from 'react';
import {Text, View, Animated, StyleSheet, Button, ImageBackground, TouchableOpacity} from 'react-native';
import Logo from '../../assets/sundae.png';
import * as SQLite from 'expo-sqlite';
import Bg from '../../assets/bg-gradient.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


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
      <ImageBackground source={Bg} resizeMode="cover" style={styles.bg}>
          <Animated.Image source={Logo} style={styles.image} />

          <Animated.Text style={styles.text}>The Sundae app</Animated.Text>

          <Text style={styles.descripcion}>
          ¡Busca tu ciudad y accede al pronostico en tiempo real!
          </Text>

          <TouchableOpacity
            title="Iniciar"
            style={styles.btn}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ViewAllCities')}
          >     
          <FontAwesomeIcon icon={ faArrowDown } style={styles.icon} />
          
          </TouchableOpacity>

        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },

  bg: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    //fontFamily: 'Roboto_400Regular',
    color: '#ffffff',
    fontSize: 35,
  },
  descripcion: {
    color: '#ffffff',
    fontSize: 20,
    textAlign: 'center',
    padding: 25,
  },
  btn: {
    color: 'white',
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
