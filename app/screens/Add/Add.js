import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Formik } from 'formik';
import * as yup from 'yup';

const db = SQLite.openDatabase('city_db.db');

//Schema validation
const addCityValidationSchema = yup.object().shape({
  city_name: yup.string()
    .min(3, 'Pocos Caracteres')
    .max(100, 'Demasiados Caracteres')
    .required('Debe ingresar el nombre de la Ciudad'),
  city_state: yup.string()
    .min(3, 'Pocos Caracteres')
    .max(100, 'Demasiados Caracteres')
    .required('Debe ingresar el nombre de la Provincia'),
  city_country: yup.string()
    .min(3, 'Pocos Caracteres')
    .max(100, 'Demasiados Caracteres')
    .required('Debe ingresar el nombre del Pais'),
});

const Add = ({ navigation }) => {

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.input}>
          <Formik
            validationSchema={addCityValidationSchema}
            initialValues={{
              city_name: '',
              city_state: '',
              city_country: ''
            }}
            onSubmit={values => console.log(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>

                <TextInput
                  name="city_name"
                  style={styles.text_input}
                  placeholder="Nombre de la Ciudad"
                  onChangeText={handleChange('city_name')}
                  onBlur={handleBlur('city_name')}
                  value={values.city_name}
                />

                {(errors.city_name && touched.city_name) &&
                  <Text style={styles.errorText}>
                    {errors.city_name}
                  </Text>
                }

                <TextInput
                  name="city_state"
                  style={styles.text_input}
                  placeholder="Nombre de la Provincia"
                  onChangeText={handleChange('city_state')}
                  onBlur={handleBlur('city_state')}
                  value={values.city_state}
                />

                {(errors.city_state && touched.city_state) &&
                  <Text style={styles.errorText}>
                    {errors.city_state}
                  </Text>
                }

                <TextInput
                  name="city_country"
                  style={styles.text_input}
                  placeholder="Nombre del Pais"
                  onChangeText={handleChange('city_country')}
                  onBlur={handleBlur('city_country')}
                  value={values.city_country}
                />

                {(errors.city_country && touched.city_country) &&
                  <Text style={styles.errorText}>
                    {errors.city_country}
                  </Text>
                }

                <TouchableOpacity
                  style={styles.btn_input}
                  onPress={
                    () => {
                      handleSubmit; navigation.navigate('Maps', { ciudad: values.city_name, provincia: values.city_name, pais: values.city_country });
                    }
                  }
                  title="Agregar Ciudad"
                  disabled={!isValid || values.city_name === ''}
                >
                  <Text style={styles.text_btn}> Agregar Ciudad</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </>
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
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  btn_input: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: '#CD5C5C',
    borderColor: '#CD5C5C',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_btn: {
    color: 'white',
  },
  btn_row: {
    top: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default Add;
