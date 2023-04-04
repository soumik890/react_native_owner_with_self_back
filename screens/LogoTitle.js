import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import {exportvalues} from '../contextApi/ContextTab';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {ToggleButton} from 'react-native-paper';

function LogoTitle() {
  const navigation = useNavigation();
  // const {isShowTextBox, setIsShowTextBox} = useContext(exportvalues);
  const {Brands, setBrands} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {Email} = useContext(exportvalues);
  const {Name} = useContext(exportvalues);
  const {UserID} = useContext(exportvalues);
  const {PhotoUrl} = useContext(exportvalues);
  const {Search, setSearch} = useContext(exportvalues);
  const {Rests, setRests} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const {action, setaction} = useContext(exportvalues);

  const [brandId, setBrandId] = useState(null);
  // const [Rests, setRests] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log('User Id', UserID);
  console.log('Email', Email);
  let user = parseInt(UserID);

  // console.log('restaurants are', Rests);s

  const BrandSelector = item => {
    console.log('BrandSelector called %%%%%%%%%', item);
    setBrand(item);
    apiAxios1('rest', {
      userid: user,
      action: 'read',
      brandid: item?.brandid,
    }).then(res => {
      console.log('Rest list', res.data);
      setRests(res.data);
    });
    setBrandId(item?.brandid);
  };

  const RestSelector = item => {
    console.log(item);
    setRest(item);
    setIsOpen(false);
    navigation.navigate('menuType');
  };

  const BrandCaller = () => {
    setIsOpen(false);
    navigation.navigate('brand');
  };

  const RestCaller = () => {
    setIsOpen(false);
    navigation.navigate('rest');
  };

  const googleOut = async () => {
    auth()
      .signOut()
      .then(() => {
        // Alert.alert('User sign-out successfully!');
        Snackbar.show({
          text: `${Email}, 'Logged Out'`,
          duration: Snackbar.LENGTH_SHORT,
        });
        navigation.replace('LoginScreen');
      })
      .catch(e => Alert.alert('Error', e.message));
  };

  return (
    <View style={{flexDirection: 'row', backgroundColor: 'black', height: 50}}>
      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(true);
          }}>
          <Image
            style={{width: 30, height: 30, marginTop: 10, marginLeft: 10}}
            source={require('../assets/ham3.png')}
          />
        </TouchableOpacity>

        {/* <ToggleButton icon="menu" value="menu" /> */}

        <Image
          style={{width: 45, height: 45, marginLeft: 15}}
          source={require('../assets/logo.png')}
        />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
            marginTop: 10,
            marginLeft: 10,
          }}>
          Menu Master
        </Text>
        {/* <TouchableOpacity onPress={() => setIsShowTextBox(true)}>
          <Image
            style={{height: 25, width: 25, marginTop: 10, marginLeft: 90}}
            source={require('../assets/searchWhite.png')}
          />
        </TouchableOpacity> */}
      </View>

      <Modal
        useNativeDriver={true}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        // animationIn="bounceInUp"
        // animationOut="bounceOutDown"
        onBackButtonPress={() => {
          setIsOpen(false);
        }}
        onBackdropPress={() => {
          setIsOpen(false);
        }}
        // transparent={true}
        isVisible={isOpen}>
        <View
          style={{
            flex: 1,
            width: 500,
            // alignSelf: 'flex-start',
            height: 1000,
            marginLeft: -20,
            marginTop: -20,
          }}>
          <View style={{marginBottom: 0}} showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: windowWidth - 150,
                height: windowHeight,
                backgroundColor: 'white',
                // padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <View
                style={{
                  backgroundColor: 'orange',
                  width: '100%',
                  marginBottom: 10,
                }}>
                <Image
                  style={{
                    height: 80,
                    borderRadius: 50,
                    width: 80,
                    margin: 2,
                    // marginBottom: 10,
                    alignSelf: 'center',
                    marginTop: 20,
                  }}
                  source={{
                    uri: PhotoUrl,
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    marginBottom: 5,
                    color: 'black',
                  }}>
                  {Name}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: 10,
                  }}>
                  {Email}
                </Text>
                <Button
                  labelStyle={{fontSize: 8, marginTop: 4, marginBottom: 5}}
                  style={{
                    width: 80,
                    alignSelf: 'center',
                    height: 20,
                    marginBottom: 10,
                  }}
                  mode="contained"
                  color="red"
                  onPress={googleOut}>
                  Sign Out
                </Button>
              </View>

              <Button
                labelStyle={{fontSize: 8, marginTop: 4, marginBottom: 5}}
                style={{
                  width: 130,
                  alignSelf: 'center',
                  height: 20,
                  marginBottom: 10,
                }}
                mode="contained"
                color="green"
                onPress={BrandCaller}>
                Go To Dashboards{' '}
              </Button>

              <Text>{'\n'}</Text>

              <Button
                labelStyle={{fontSize: 8, marginTop: 4, marginBottom: 5}}
                style={{
                  width: 130,
                  alignSelf: 'center',
                  height: 20,
                  marginBottom: 10,
                }}
                mode="contained"
                color="green"
                onPress={() => console.log('Pressed')}>
                {' '}
                Go To Access{' '}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: 200,
    height: 50,
    backgroundColor: 'red',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    marginLeft: 10,
    height: 23,
    width: 25,
    // margin: 10,
  },
  searchSection: {
    // flex: 1,
    width: 250,
    alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    // marginLeft: 20,
  },
  searchTextBox: {
    // flex: 1,
    // paddingTop: 10,
    // paddingRight: 10,
    // paddingBottom: 10,
    // paddingLeft: 0,
    backgroundColor: '#fff',
    fontSize: 15,
    color: 'black',
    marginRight: 10,
    width: 150,
  },
  searchWhiteImage: {
    height: 20,
    width: 20,
    // marginRight: 15,
    // alignItems: 'flex-end',
  },
});
export default LogoTitle;
