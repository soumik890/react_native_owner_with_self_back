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
import React, {useContext, useState} from 'react';
import LogoTitle from './LogoTitle';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';
// import * as Progress from 'react-native-progress';

const Upload = ({route}) => {
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [ImgURL, setImgURL] = useState(null);
  const [Loading, setLoading] = useState(false);
  const {UserID} = useContext(exportvalues);
  let user = parseInt(UserID);

  // console.log(route.params.data);

  const docPic = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.pick({
        copyTo: 'documentDirectory',
        type: [DocumentPicker.types.images],
      });
      const data = res[0].fileCopyUri;
      var Cid = 'Image' + Date.now();
      const uploadTask = storage().ref().child(`/uploads/${Cid}`).putFile(data);
      uploadTask.on('state_changed', function (snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // setUpload(progress);
        if (progress == 100) {
          fetchuploader(Cid);
          setLoading(false);
        }
      });
    } catch (err) {
      Alert.alert('Pls pic a document');
    }
  };

  const fetchuploader = async Cid => {
    const path = await storage().ref(`/uploads/${Cid}`).getDownloadURL();
    console.log('Image url is', path);
    setImgURL(path);
    UploadPathToQuana(path);
  };

  const UploadPathToQuana = path => {
    apiAxios1({
      xuserid: user,
      xaction: 'menu_item_image_upload',
      RestaurantId: route.params.data.RestaurantId,
      TypeId: route.params.data.TypeId,
      ItemId: route.params.data.Id,
      Image: path,
      Status: '1',
    }).then(response => {
      console.log('Response from image Api', response);
    });
  };

  return (
    <View style={styles.containerMain}>
      <LogoTitle />
      <TouchableOpacity
        onPress={docPic}
        style={{
          height: 30,
          width: 100,
          backgroundColor: 'yellow',
          alignSelf: 'center',
          borderRadius: 20,
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{color: 'black', alignSelf: 'center'}}>Upload Image</Text>
      </TouchableOpacity>

      {ImgURL !== null ? (
        <Image
          source={{uri: ImgURL}}
          style={{height: 100, width: 100, alignSelf: 'center', marginTop: 50}}
        />
      ) : (
        <View></View>
      )}

      {Loading ? (
        <Image
          source={require('../assets/load.gif')}
          style={{height: 100, width: 100, alignSelf: 'center', marginTop: 50}}
        />
      ) : (
        <View></View>
      )}

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

export default Upload;

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
