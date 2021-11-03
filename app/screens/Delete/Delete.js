import React, { useState } from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
//import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('city_db.db');

const Delete = ({route, navigation}) => {
  let [userCity, setUserCity]=useState({});

  let deleteCity = () => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM tbl_city where city_id = ?',
      [route.params.paramKey],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert('Success','La ciudad seleccionada ha sido borrada', [{text: 'Ok', onPress: () => navigation.navigate('ViewAllCities'),},],{cancelable: false},);
        } else {
          alert('No se encontron datos');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text>Desea Eliminar de la Lista?</Text>
      {/* <Text>{route.params.paramKey}</Text> */}

      <Button
        title="Delete"
        color="#CD5C5C"
        // onPress = {navigation.navigate('ViewAllCities')}
        onPress={deleteCity}
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
});

export default Delete;