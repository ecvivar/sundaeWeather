import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  SafeAreaView,
  StatusBar
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';

const db = SQLite.openDatabase('city_db.db');

const Add = ({ navigation }) => {
  const [userCity, setUserCity] = useState('');
  const [userState, setUserState] = useState('');
  const [userCountry, setUserCountry] = useState('');

  //useState para tomar las coordenadas
  const [coordCity, setCoordCity] = useState({});

  const registerCity = () => {
    console.log(userCity, userState, userCountry);

    if (!userCity) {
      alert('Please fill City');
      return;
    }
    if (!userState) {
      alert('Please fill State');
      return;
    }
    if (!userCountry) {
      alert('Please fill Country');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tbl_city (city_name, city_state, city_country) VALUES (?,?,?)',
        [userCity, userState, userCountry],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          // if (results.rowsAffected > 0) {
          //   Alert.alert(
          //     'Success',
          //     'You are Registered Successfully',
          //     [
          //       {
          //         text: 'Ok',
          //         onPress: () => navigation.navigate('ViewAllCities'),
          //       },
          //     ],
          //     { cancelable: false },
          //   );
          // } else {alert('Registration Failed')
          // }
        });
    });
  };

  //Vamos a intentar obtener coordenadas de la API de Openweather para pasarlas al mapa


  const getWeather = () => {

    // infoCity= ({
    //   ciudad: '',
    //   pais: '',
    //   lon: 0,
    //   lat: 0,
    // })

    console.log(userCity);
    console.log(userCountry);

    if (userCity != null) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${userCity},${userCountry}&appid=128cbb6d697b9515f235f503e5961922&units=metric&lang=esp`)
        .then(response => {
          const info = response.data;
          setCoordCity({
            ciudad: info.name,
            pais: info.sys.country,
            lon: info.coord.lon,
            lat: info.coord.lat
          });
          console.log('weather', info);
          console.log('Longitud:', info.coord.lon);
          console.log('Latitud:', info.coord.lat);
        })

    } else {
      Alert.alert("Ciudad no encontrada");
    }

  }

  console.log(coordCity.lon);
  console.log(coordCity.lat);
  //

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.text_input}
          placeholder="City"
          onChangeText={
            (userCity) => setUserCity(userCity)
          }
        />
        <TextInput
        style={styles.text_input}
          placeholder="State"
          onChangeText={
            (userState) => setUserState(userState)
          }
        />
        <TextInput
        style={styles.text_input}
          placeholder="Country"
          onChangeText={
            (userCountry) => setUserCountry(userCountry)
          }
        />
        <View style={styles.btn_row} >
          <Button
            title="Agregar"
            color="#CD5C5C"

            onPress={
              () => {
                getWeather(); navigation.navigate('Maps', { cityLon: coordCity.lon, cityLat: coordCity.lat, ciudad: userCity, provincia: userState, pais: userCountry });
              }
            }

          // onPress={
          //   () => { registerCity(); navigation.navigate('Maps');
          //   }
          // } 
          />
          <Button
            title="Cancelar"
            color="#CD5C5C"
            onPress={
              () => {
                navigation.navigate('ViewAllCities');
              }
            }
          />
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#FDEDEC',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    height: 300,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 40,
    marginTop: StatusBar.currentHeight || 0,
  },
  text_input: {
    height: 30,

  },
  btn_row: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
});

export default Add;
