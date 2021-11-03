import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Search = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Agregar Ciudad</Text>
      <ScrollView style={styles.scroll}>
        <View style={styles.form_group}>
          <Text style={styles.form_text}>Pais</Text>
          <TextInput
            style={styles.form_input}
            placeholder={'Pais'}
            keyboardType="default"
          />

          <Text style={styles.form_text}>Ciudad</Text>
          <TextInput
            style={styles.form_input}
            placeholder={'Ciudad'}
            keyboardType="default"
          />

          <TouchableOpacity
            style={styles.btn}
            title="Buscar"
            color="#CD5C5C"
            onPress={() => navigation.navigate('Weather')}>
            <Text style={styles.btn_txt}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  title_text: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  scroll: {
    paddingHorizontal: 10,
  },
  form_group: {
    marginTop: 20,
  },
  form_text: {
    fontWeight: 'bold',
  },
  form_input: {
    backgroundColor: '#E3E3E3',
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  btn: {
    display: 'flex',
    position: 'relative',
    height: 60,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#CD5C5C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_txt: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Search;
