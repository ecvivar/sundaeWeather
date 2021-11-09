import React from 'react';
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

const db = SQLite.openDatabase('city_db.db');

const Maps = ({ route, navigation }) => {
  const { cityLon, cityLat, ciudad, provincia, pais } = route.params;

  const lon = parseFloat(route.params.cityLon);
  const lat = parseFloat(route.params.cityLat);

  const location = {
    latitude: route.params.cityLat,
    longitude: route.params.cityLon,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5
  }

  const registerCity = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tbl_city (city_name, city_state, city_country) VALUES (?,?,?)',
        [route.params.ciudad, route.params.provincia, route.params.pais],
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
           } else {alert('La ciudad no se agrego')
           }
        });
    });
  }

  return (

    <View style={styles.container}>
      <MapView
        //customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        mapType='standar'
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
      <View>
        <Text>Longitud:{route.params.cityLon}</Text>
        <Text>Latitud:{route.params.cityLat}</Text>
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
});

export default Maps;