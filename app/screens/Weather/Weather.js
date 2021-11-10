import React, { useEffect, useState } from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const db = SQLite.openDatabase('city_db.db');

function Weather ({route, navigation}) {
  const [userCity, setUserCity] = useState({});
  const [infoCity, setInfoCity] = useState({});

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_city where city_id = ?',
      [route.params.paramKey],
      (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          setUserCity(results.rows.item(0));
        } else {
          alert ('City Not Found');
        }
      });
    });

//API_KEY = '562c8cf7ac4589daca68d9eeaa5237ea';

  function getWeather() {

    // console.log(userCity.city_name);
    // console.log(userCity.city_state);

    if (userCity.city_name != null) {  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userCity.city_name},${userCity.city_country}&appid=128cbb6d697b9515f235f503e5961922&units=metric&lang=esp`)
      .then(response => {
        const info = response.data;
        setInfoCity({
          ciudad: info.name,
          pais: info.sys.country,
          condiciones: info.weather[0].description,
          temperatura: info.main.temp,
          humedad: info.main.humidity,
          viento: info.wind.speed,
        })
        console.log('weather',info)
      })
    }
  }

  useEffect(() => {
    getWeather()
  },[userCity.city_name]);
  
      
        const {ciudad, pais, condiciones, temperatura, humedad, viento}=infoCity;
        return (
        <View style={styles.container}>
          <Text>Weather City</Text>
          <Text>{route.params.paramKey}</Text>
          {/* <View>
            <Text> City Id: {userCity.city_id} </Text>
            <Text> City Name: {userCity.city_name} </Text>
            <Text> City State: {userCity.city_state} </Text>
            <Text> City Country: {userCity.city_country} </Text>
          </View> */}
          <View>
            <Text>Ciudad: {ciudad}</Text>
            <Text>Pais: {infoCity.pais}</Text>
            <Text>Condiciones: {infoCity.condiciones}</Text>
            <Text>Temperatura: {infoCity.temperatura}</Text>
            <Text>Humedad: {infoCity.humedad}</Text>
            <Text>Viento: {infoCity.viento}</Text>
          </View>
          <View style={styles.btn_row} >
          {/* <Button
            title="Weather"
            color="#CD5C5C"
            onPress={getWeather}
          /> */}
          <Button
            title="Cerrar"
            color="#CD5C5C"
            onPress={() => navigation.push('ViewAllCities')}
          />
          </View>
        </View>
        )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FDEDEC',
    },
    btn_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });

export default Weather;

