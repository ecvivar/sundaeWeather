import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';

export default function Maps({navigation}) {
  return (
    <View style={styles.container}>
      <MapView
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: -38.3995345,
          longitude: -58.1909796,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}
        mapType="standard"
      ></MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
