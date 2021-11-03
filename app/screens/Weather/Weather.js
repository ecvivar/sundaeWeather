import React, { useState, version } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
//import {openDatabase} from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const db = SQLite.openDatabase('city_db.db');

export default function Weather ({route, navigation}) {
  let [userCity, setUserCity] = useState({});
  let [state, setState] = useState({});

  state = {
    temperature: '',
    description: '',
    humidity: '',
    wind_speed: 0,
    city: '',
    country: '',
    error: null,
  }

//  setUserCity({});
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tbl_city where city_id = ?',
      [route.params.paramKey],
      (tx, results) => {
        var len = results.rows.length;
        // console.log('len',len);
        // console.log(results.rows.item(0));
        
        if (len > 0) {
          setUserCity(results.rows.item(0));
        } else {
          alert ('City Not Found')
        }
      });
    });

//API_KEY = '562c8cf7ac4589daca68d9eeaa5237ea';



  let getWeather = () => {
   // e.preventDefault();
    // nameCity=route.params.paramKey
    const cityValue = userCity.city_name;
    const countryValue = userCity.city_country;
    console.log(userCity.city_name);
    console.log(userCity.city_state);

    if (cityValue && countryValue) {
      axios.get('https://api.openweathermap.org/data/2.5/weather?q={cityValue},{countryValue}&appid={128cbb6d697b9515f235f503e5961922}&units=metric')
      .then(response => {const posts = response.data; setState(posts); console.log('weather',posts)});
      
      // const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${API_KEY}&units=metric';

      // const response = fetch(API_URL);
      // const data = response.json() ;

     // console.log(userCity.city_name)
      //console.log(userCity.city_country)
      //console.log(json);

      // setState({
      //   temperature: response.main.temp,
      //   description: data.weather[0].description,
      //   humidity: data.main.humidity,
      //   wind_speed: data.wind.speed,
      //   city: data.name,
      //   country: data.sys.country,
      //   error: null
      // });
    } else {
      setState({
        error: 'Please enter a City and a Country.'
      });
    };
  }
      return (
        <View style={styles.container}>
          <Text>Weather City</Text>
          <Text>{route.params.paramKey}</Text>

          <View>
            <Text> City Id: {userCity.city_id} </Text>
            <Text> City Name: {userCity.city_name} </Text>
            <Text> City State: {userCity.city_state} </Text>
            <Text> City Country: {userCity.city_country} </Text>
          </View>
          <View style={styles.btn_row} >
          <Button
            title="Weather"
            color="#CD5C5C"
            onPress={getWeather}
          />
          <Button
            title="Cerrar"
            color="#CD5C5C"
            onPress={() => navigation.push('ViewAllCities')}
          />
          </View>
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
      btn_row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    });
  
