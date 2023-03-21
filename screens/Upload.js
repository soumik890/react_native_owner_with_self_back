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
  const {actionB, setactionB} = useContext(exportvalues);
  const {actionR, setactionR} = useContext(exportvalues);
  const {actionM, setactionM} = useContext(exportvalues);
  const {actionMT, setactionMT} = useContext(exportvalues);
  let user = parseInt(UserID);

  console.log(route.params.page);
  console.log(route.params.data);

  let page = route.params.page;
  let data = route.params.data;

  const docPic = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.pick({
        copyTo: 'documentDirectory',
        type: [DocumentPicker.types.images],
      });

      console.log(
        'Image file size is@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        res,
      );

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
    // UploadPathToQuana(path);

    switch (page) {
      case 'brand':
        console.log('brand hit');
        UpdateImgBrand(path);
        break;
      case 'rest':
        console.log('rest hit');
        UpdateImgRest(path);
        break;
      case 'MT':
        console.log('MT hit');
        UpdateImgMT(path);
        break;
      case 'cat':
        console.log('cat hit');
        UpdateImgCat(path);
        break;
      case 'menu':
        console.log('menu hit');
        UpdateImgMenu(path);
        break;
      default:
        console.log('Invalid image edit request');
    }
  };

  const UpdateImgBrand = path => {
    apiAxios1('brand', {
      userid: user,
      action: 'update',
      brand: data.brand,
      BImage: path,
      brandid: data.brandid,
    }).then(res => {
      console.log(res.data);
      Alert.alert('Image upload complete');
      setactionB(!actionB);
    });
  };

  const UpdateImgRest = path => {
    apiAxios1('rest', {
      action: 'update',
      rest: data.rest,
      RImage: path,
      restid: data.restid,
    }).then(res => {
      console.log(res.data);
      Alert.alert('Image upload complete');
      setactionR(!actionR);
    });
  };

  const UpdateImgMT = path => {
    apiAxios1('menutype', {
      menutype: data.menutype,
      MTImage: path,
      mtid: data.mtid,
      action: 'update',
    }).then(res => {
      console.log(res.data);
      Alert.alert('Image upload complete');
      setactionMT(!actionMT);
    });
  };

  const UpdateImgCat = path => {
    apiAxios1('cat', {
      cat: data.cat,
      CImage: path,
      catid: data.catid,
      action: 'update',
    }).then(res => {
      console.log(res.data);
      Alert.alert('Image upload complete');
      // setaction(!action);
    });
  };

  const UpdateImgMenu = path => {
    apiAxios1('menu', {
      menu: data.menu,
      MImage: path,
      spice: data.spice,
      price: data.price,
      veg: data.veg,
      description: data.description,
      ingredients: data.ingredients,
      menuid: data.menuid,
      action: 'update',
    }).then(res => {
      console.log(res.data);
      Alert.alert('Image upload complete');
      setactionM(!actionM);
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
