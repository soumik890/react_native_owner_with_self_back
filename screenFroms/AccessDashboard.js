import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import LogoTitle from '../screens/LogoTitle';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const AccessDashboard = () => {
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <LogoTitle />
      <Text style={{color: 'red'}}>AccessDashboard</Text>
      {/* <TextInput /> */}
      {/* <TextInput /> */}
      {/* <Button /> */}

      <View
        style={{
          width: '100%',
          height: 50,
          // backgroundColor: '#EE5407',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: '#4c6aff',
            height: 40,
            justifyContent: 'center',
            width: DeviceWidth - 20,
            alignSelf: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            GO BACK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccessDashboard;
