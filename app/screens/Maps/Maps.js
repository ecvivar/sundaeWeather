import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Button,
  Alert
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

const db = SQLite.openDatabase('city_db.db');

const Maps = ({ route, navigation }) => {

  const { ciudad, provincia, pais } = route.params;
  const [coordCity, setCoordCity] = useState({});

  //Obtenemos las coordenadas de la API de Openweather para pasarlas al mapa
  function getCoord() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=128cbb6d697b9515f235f503e5961922&units=metric&lang=esp`)
      .then(response => {
        const info = response.data;
        setCoordCity({
          ciudad: info.name,
          pais: info.sys.country,
          lon: info.coord.lon,
          lat: info.coord.lat
        });
        //console.log('weather', info);
        console.log('Longitud:', info.coord.lon);
        console.log('Latitud:', info.coord.lat);
      }).catch((error) => {
        Alert.alert(
          'Advertencia', 'Ciudad no encontrada, revise los datos ingresados',
          [
            {
              text: 'Ok',
              onPress: () => navigation.navigate('Add'),
            },
          ],
          { cancelable: false },
        );
      })
  }

  useEffect(() => {
    getCoord()
  }, []);

  //Definimos la localizacion con los datos obtenidos de la consulta a la API OpenWeather
  const location = {
    latitude: coordCity.lat,
    longitude: coordCity.lon,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5
  }

  //Funcion para registrar Ciudad en la Base de Datos si la localizacion es la correcta
  function registerCity() {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tbl_city (city_name, city_state, city_country) VALUES (?,?,?)',
        [ciudad, provincia, pais],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'La ciudad ha sido agregada correctamente',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAllCities'),
                },
              ],
              { cancelable: false },
            );
          } else {
            alert('La ciudad no se agrego');
          }
        });
    });
  }

  return (

    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType='hybrid'
        region={location}
      ></MapView>
      <View style={styles.btn_row}>
        <Button
          title="Cancelar"
          color="#CD5C5C"
          onPress={
            () => {
              navigation.navigate('Add');
            }
          }
        />
        <Button
          title="Confirmar"
          color="#CD5C5C"

          onPress={
            () => {
              registerCity();
            }
          }
        />
      </View>
      <View style={styles.txt_map}>
        <Text>Ciudad: {route.params.ciudad} </Text>
        <Text>Latitud: {coordCity.lat} </Text>
        <Text>Longitud: {coordCity.lon} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  btn_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  txt_map: {
    height: 80,
    width: '60%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Maps;