import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

const Nodata = () => {
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  return (
    <View
      style={{
        backgroundColor: '#fdfdfe',
        // height: DeviceHeight,
        height: 220,
        width: DeviceWidth,
      }}>
      <Image
        source={require('../assets/no-data.gif')}
        style={{
          width: 200,
          height: 200,
          borderRadius: 5,
          marginLeft: 5,
          marginTop: 5,
          alignSelf: 'center',
        }}
      />

      <Image
        source={require('../assets/nodatatext.png')}
        style={{
          width: 145,
          height: 20,
          borderRadius: 5,
          marginLeft: 5,
          marginTop: -60,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default Nodata;
