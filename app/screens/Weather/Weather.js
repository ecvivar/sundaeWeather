import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import Bg from '../../assets/bg-gradient.jpg';


const db = SQLite.openDatabase('city_db.db');

function Weather({ route, navigation }) {
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
          alert('Ciudad no encontrada!');
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
          console.log('weather', info)
        })
    }
  }

  useEffect(() => {
    getWeather()
  }, [userCity.city_name]);


  const { ciudad, pais, condiciones, temperatura, humedad, viento } = infoCity;
  return (
    <ImageBackground source={Bg} resizeMode="cover" style={styles.bg}>

    <View style={styles.container}>

      <View style={styles.card}>
        <Text style={styles.card_title}>{ciudad}, {infoCity.pais}</Text>
        <Text style={styles.card_text_temp}>{infoCity.temperatura}°</Text>

      <View style={styles.card_info}> 
        <Text style={styles.card_text}>Condiciones: {infoCity.condiciones}</Text>
        <Text style={styles.card_text}>Humedad: {infoCity.humedad} % </Text>
        <Text style={styles.card_text}>Viento: {infoCity.viento} km/h</Text>
      </View>

      </View>

    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
    },

    bg: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around'
    },

    
    card: {
      padding: 10,
      marginHorizontal: 8,
      borderRadius: 15,
      backgroundColor: 'rgba(255, 255, 255, 0.270)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '80%',
      width: '80%',
    },
    
    card_title: {
      color: 'white',
      fontSize: 25,
      marginTop: 20,
    },

    card_text_temp: {
      color: 'white',
      fontSize: 55,
      fontWeight: "400",
    },
    
    card_text: {
      color: 'white',
      fontSize: 18,
      fontWeight: "400",
      paddingTop: 8,
    },

    card_info: {
     alignItems: 'center',
    },




  
    btn_row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },





});

export default Weather;

