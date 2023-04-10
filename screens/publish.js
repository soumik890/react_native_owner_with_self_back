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
import {Button} from 'react-native-paper';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const RNFS = require('react-native-fs');
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
      user_id: UserID,
      restaurant_id: Rest.restaurant_id,
      user_id: UserID,
      restaurant_id: Rest.restaurant_id,
      action: 'build',
    }).then(Response => {
      // setDispMenu(Response?.data);
      setUrl(Response?.data?.data?.restaurant[0].url);
      console.log(Response?.data?.data?.restaurant[0].url);
    });
  }, []);

  const createPDF = async () => {
    let options = {
      html: `<div>
        <h1 style="color:red;font-size:40px;text-align: center;"> ${Brand.brand}</h1>
        <h1 style="color:red;font-size:40px;text-align: center;"> ${Rest.restaurant}</h1>
      <img src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}" alt="QR_Code" style="width:800px;height:800px;">
      <h1>${url}</h1>
      </div>`,
      fileName: 'QR_Code',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    alert(file.filePath);
  };

  return (
    <View style={styles.containerMain}>
      <LogoTitle />
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'grey', fontSize: 20, fontWeight: 'bold'}}>
          {Brand.brand}
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          {Rest.restaurant}
        </Text>
      </View>

      <View style={{alignSelf: 'center', justifyContent: 'center'}}>
        <Image
          source={{
            uri: `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${url}`,
          }}
          style={{height: 250, width: 250, alignSelf: 'center'}}
        />
        <Text style={{color: 'black', marginTop: 20}}>{url}</Text>
      </View>

      <Button
        labelStyle={{
          fontSize: 12,
          marginTop: 5,
          // marginBottom: 5,
        }}
        style={{
          width: 200,
          alignSelf: 'center',
          height: 30,
          marginBottom: 10,
          marginTop: 30,
        }}
        mode="contained"
        color="#ec8c8c"
        onPress={createPDF}>
        Download PDF
      </Button>

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
