import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext} from 'react';
import LogoTitle from '../screens/LogoTitle';
import {useNavigation} from '@react-navigation/native';
import {exportvalues} from '../contextApi/ContextTab';
import {TextInput, Button} from 'react-native-paper';
const License = () => {
  const navigation = useNavigation();
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const {Rest, setRest} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);

  console.log();
  return (
    <View style={styles.container}>
      <LogoTitle />
      <View style={{backgroundColor: 'orange'}}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          Restaurant Licenses
        </Text>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 15,
          alignSelf: 'center',
        }}>
        {Brand.brand}
      </Text>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 15,
          alignSelf: 'center',
        }}>
        {Rest.restaurant}
      </Text>

      <View style={styles.bottomView}>
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

export default License;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  bottomView: {
    width: '100%',
    height: 50,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    // marginTop: -500,
  },
});
