import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
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

  const [brandId, setBrandId] = useState(null);
  // const [Rests, setRests] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log('User Id', UserID);
  console.log('Email', Email);
  let user = parseInt(UserID);

  const BrandSelector = item => {
    console.log('BrandSelector called %%%%%%%%%', item);
    setBrand(item);
    apiAxios1({
      xuserid: user,
      xaction: 'restaurant_list',
      AccountId: item?.Id,
      Status: '1',
    }).then(res => {
      console.log('Rest list', res.data.data);
      setRests(res.data.data);
    });
    setBrandId(item?.Id);
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
      {/* {isShowTextBox ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setIsShowTextBox(false);
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                marginRight: 10,
                marginTop: 10,
              }}>
              Back
            </Text>
          </TouchableOpacity>

          <Image
            style={styles.searchImage}
            source={require('../assets/search.png')}
          />
          <TextInput
            autoFocus={true}
            name="Searchbox"
            value={Search}
            placeholder="Search here"
            onChangeText={text => setSearch(text)}
            style={styles.searchTextBox}
          />
          <TouchableOpacity
            onPress={() => {
              {
                setSearch('');
              }
            }}>
            <Image
              source={require('../assets/wrong.png')}
              style={styles.searchWhiteImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsShowTextBox(false);
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 15,
                marginTop: 10,
              }}>
              Go
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flexDirection: 'row', marginLeft: 5}}>
          <TouchableOpacity
            onPress={() => {
              setIsOpen(true);
            }}>
            <Image
              style={{width: 30, height: 30, marginTop: 10, marginLeft: 10}}
              source={require('../assets/ham.png')}
            />
          </TouchableOpacity>
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
          <TouchableOpacity onPress={() => setIsShowTextBox(true)}>
            <Image
              style={{height: 25, width: 25, marginTop: 10, marginLeft: 90}}
              source={require('../assets/searchWhite.png')}
            />
          </TouchableOpacity>
        </View>
      )} */}

      <View style={{flexDirection: 'row', marginLeft: 5}}>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(true);
          }}>
          <Image
            style={{width: 30, height: 30, marginTop: 10, marginLeft: 10}}
            source={require('../assets/ham.png')}
          />
        </TouchableOpacity>
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
          }}>
          <ScrollView
            style={{marginBottom: 0}}
            showsVerticalScrollIndicator={false}>
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
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginLeft: 200,
                    marginTop: 10,
                  }}
                  source={require('../assets/wrong.png')}
                />
              </TouchableOpacity>

              <Image
                style={{
                  height: 80,
                  borderRadius: 50,
                  width: 80,
                  margin: 2,
                  marginBottom: 10,
                  alignSelf: 'center',
                  // marginTop: 20,
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
                  marginBottom: 10,
                  color: '#f6b022',
                }}>
                {Email}
              </Text>
              <Button
                style={{width: 200, alignSelf: 'center'}}
                mode="contained"
                color="red"
                onPress={googleOut}>
                SignOut
              </Button>

              <TouchableOpacity
                onPress={BrandCaller}
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  flexDirection: 'row',
                  marginTop: 10,
                  // marginLeft: 10,
                  marginBottom: 10,
                  width: 160,
                  height: 30,
                  backgroundColor: 'violet',
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  Go To My Brands
                </Text>
              </TouchableOpacity>

              {Brands.map(item => {
                return (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={{
                          width: 180,
                          height: 30,
                          marginTop: 10,
                          borderRadius: 5,
                          backgroundColor:
                            brandId == item?.Id ? 'orange' : 'grey',
                        }}
                        onPress={() => {
                          // serverdata_out(item.act_id);
                          BrandSelector(item);
                        }}>
                        <Text
                          style={{
                            // flex: 1,
                            color: 'black',
                            fontSize: 16,
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}>
                          {item?.Account}
                        </Text>
                      </TouchableOpacity>
                      {brandId == item?.Id ? (
                        <TouchableOpacity
                          onPress={() => {
                            setBrandId(null);
                          }}>
                          <Image
                            source={require('../assets/minimize.png')}
                            style={[
                              styles.searchWhiteImage,
                              {
                                marginRight: 10,
                                marginTop: 15,
                                marginLeft: 10,
                              },
                            ]}
                          />
                        </TouchableOpacity>
                      ) : (
                        <View></View>
                      )}
                    </View>

                    {brandId == item?.Id ? (
                      <View style={{marginLeft: 10}}>
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginLeft: 20,
                            // marginBottom: 5,
                            width: 160,
                            height: 30,
                            backgroundColor: 'skyblue',
                            borderRadius: 10,
                            justifyContent: 'center',
                          }}
                          onPress={RestCaller}>
                          <Text
                            style={{
                              color: 'black',
                              alignSelf: 'center',
                              fontWeight: 'bold',
                            }}>
                            Go To My Restaurants
                          </Text>
                        </TouchableOpacity>
                        {Rests.map((item, index) => {
                          return (
                            <View
                              style={{flexDirection: 'row', marginLeft: 20}}>
                              <TouchableOpacity
                                onPress={() => {
                                  RestSelector(item);
                                }}
                                style={{
                                  height: 30,
                                  backgroundColor:
                                    Rest.Id == item.Id ? 'orange' : 'green',
                                  width: 200,
                                  marginTop: 5,
                                  borderRadius: 10,
                                  // flexDirection: 'row',
                                }}>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontSize: 15,
                                    padding: 5,
                                  }}>
                                  {index + 1}.{item?.Restaurant}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
