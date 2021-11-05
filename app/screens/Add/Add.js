import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  SafeAreaView, 
  ScrollView
} from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('city_db.db');

const Add = ({ navigation }) => {
  let [userCity, setUserCity] = useState('');
  let [userState, setUserState] = useState('');
  let [userCountry, setUserCountry] = useState('');

  let registerCity = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
              <TextInput
                placeholder="City"
                onChangeText={
                  (userCity) => setUserCity(userCity)
                }
                style={{ padding: 10 }}
              />
              <TextInput
                placeholder="State"
                onChangeText={
                  (userState) => setUserState(userState)
                }
                style={{ padding: 10 }}
              />
              <TextInput
                placeholder="Country"
                onChangeText={
                  (userCountry) => setUserCountry(userCountry)
                }
                style={{ padding: 10 }}
              />
              <Button 
              title="Submit"
              color="#CD5C5C" 
              onPress={
                () => { registerCity(); navigation.navigate('Maps');
                }
              } 
              />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    //alignItems: 'center',
    backgroundColor: '#FDEDEC',
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10,
  },
});

export default Add;
