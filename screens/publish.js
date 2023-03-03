import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import LogoTitle from './LogoTitle';
import {useNavigation} from '@react-navigation/native';
import {exportvalues} from '../contextApi/ContextTab';
import apiAxios1 from '../ApiCaller/apiAxios1';

const Publish = () => {
  const navigation = useNavigation();
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {UserID} = useContext(exportvalues);
  const [url, setUrl] = useState();

  // const url = 'https://quana-menumaster.netlify.app/?id=1';

  useEffect(() => {
    apiAxios1('allmenu', {
      userid: UserID,
      restid: Rest.restid,
      action: 'build',
    }).then(Response => {
      // setDispMenu(Response?.data);
      setUrl(Response?.data?.data?.restaurant[0].url);
      console.log(Response?.data?.data?.restaurant[0].url);
    });
  }, []);

  return (
    <View style={styles.containerMain}>
      <LogoTitle />
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'black', fontSize: 30, fontWeight: 'bold'}}>
          {Brand.brand}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text
          style={{
            color: 'grey',
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {Rest.rest}
        </Text>
      </View>

      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}`,
          }}
          style={{height: 250, width: 250, alignSelf: 'center'}}
        />
        <Text>{url}</Text>
      </View>

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
            borderRadius: 10,
            // marginBottom: 50,
            // marginTop: 50,
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

export default Publish;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
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
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
});
