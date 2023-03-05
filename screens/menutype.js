import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';
import LogoTitle from './LogoTitle';
import Modal from 'react-native-modal';

const MenuType = () => {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const {UserID} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [Img, setImg] = useState();
  const {action, setaction} = useContext(exportvalues);

  useEffect(() => {
    apiAxios1('menutype', {
      userid: user,
      action: 'read',
      restid: Rest.restid,
      brandid: Brand.brandid,
      // Status: '1',
    }).then(res => {
      // if (res?.data?.status) {
      //   setTypes(res?.data?.data);
      // }
      setTypes(res?.data);
    });
  }, [action, Rest]);

  const UpdateType = item => {
    setUpdateId(item?.mtid);
    setUpType(item?.menutype);
    setImg(item?.MTImage);
  };

  const UpdateTypeName = () => {
    apiAxios1('menutype', {
      menutype: UpType,
      MTImage: Img,
      mtid: UpdateId,
      action: 'update',
    }).then(res => {
      console.log(res.data);
      setaction(!action);
      setUpdateId(null);
    });
  };

  const AddType = () => {
    setAddFlag(true);
  };

  const submitType = () => {
    console.log(Name);
    apiAxios1('menutype', {
      menutype: Name,
      brandid: 1,
      restid: Rest.restid,
      userid: user,
      notes: 'notes',
      MTImage: 'null',
      favourite: 1,
      status1: 1,
      rank1: 1,
      cUser: 1,
      action: 'create',
    }).then(res => {
      console.log(res.data.status);
      setAddFlag(false);
      setaction(!action);
    });
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const deleteType = item => {
    console.log(item);
    apiAxios1('menutype', {
      // xuserid: user,
      // xaction: 'menu_type_delete',
      // RestaurantId: Rest.Id,
      // Id: item?.Id,
      // Status: '1',

      mtid: item.mtid,
      action: 'delete',
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setaction(!action);
    });
  };

  const selectMenuType = item => {
    console.log(item);
    setMenuType(item);
    navigation.navigate('cat');
  };
  return (
    <View style={styles.containerMain}>
      <Modal
        useNativeDriver={true}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        onBackButtonPress={() => setIsOpen(false)}
        onBackdropPress={() => {
          setIsOpen(false);
        }}
        isVisible={isOpen}>
        <View
          style={{
            width: 320,
            height: 200,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderWidth: 3,
            borderColor: 'red',
            borderRadius: 5,
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              Attention !!!
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                textAlign: 'center',
                margin: 5,
                fontWeight: 'bold',
              }}>
              Do you want to delete this Menu Type : {DeleteItem?.menutype}?
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
                margin: 5,
              }}>
              This action will delete all data related to this Menu Type :{' '}
              {DeleteItem?.menutype} !!
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                deleteType(DeleteItem);
              }}
              style={{
                width: 60,
                height: 20,
                // backgroundColor: 'yellow',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: 'red',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOpen(false);
              }}
              style={{
                marginLeft: 50,
                width: 60,
                height: 20,
                // backgroundColor: 'yellow',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: 'red',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  alignSelf: 'center',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LogoTitle />

      <View
        style={{
          width: DeviceWidth,
          backgroundColor: '#ecba5c',
          height: 40,
          flexDirection: 'row',
          // flex: 1,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          MENU TYPES
        </Text>

        {AddFlag == false ? (
          <View
            style={{marginTop: 2, alignSelf: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={AddType}
              style={{
                marginLeft: 120,
              }}>
              <View
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: '#0c9de6',
                  borderRadius: 5,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 50,
                    alignSelf: 'center',
                    marginTop: -19,
                  }}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('publish');
              }}
              style={{
                marginLeft: 20,
              }}>
              <Image
                source={require('../assets/QR.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <View>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: 'row',
            backgroundColor: '#b5b5b5',
            height: 30,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Brand : {Brand.brand}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 10,
                marginRight: 10,
              }}>
              Restaurant : {Rest.rest}
            </Text>
          </View>
        </ScrollView>
      </View>

      <ScrollView
        style={{marginBottom: 50}}
        keyboardShouldPersistTaps={'always'}>
        {AddFlag == false ? (
          Types.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  selectMenuType(item);
                }}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                  width: DeviceWidth - 20,
                  flex: 1,
                  // height: 150,
                  backgroundColor: '#ffffff',
                  elevation: 15,
                  borderRadius: 5,
                  // marginBottom: UpdateId == item?.Id ? 60 : 0,
                }}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    {item.MTImage !== 'null' ? (
                      <Image
                        source={{uri: item.MTImage}}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft: 10,
                          borderRadius: 5,
                        }}
                      />
                    ) : (
                      <Image
                        source={require('../assets/noimg.png')}
                        style={{width: 100, height: 100, marginLeft: 10}}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('upload', {page: 'MT', data: item});
                      }}>
                      <Image
                        source={require('../assets/imgedit.png')}
                        style={{width: 20, height: 20, marginLeft: 50}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 120}}>
                    <TouchableOpacity
                      onPress={() => {
                        ButtonAlert(item);
                      }}
                      style={{
                        // marginLeft: 250,
                        width: 50,
                        height: 25,
                        backgroundColor: '#ec8c8c',
                        borderRadius: 5,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        UpdateType(item);
                      }}
                      style={{
                        marginLeft: 20,
                        width: 50,
                        height: 25,
                        backgroundColor: 'skyblue',
                        borderRadius: 5,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          fontSize: 15,
                        }}>
                        edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {UpdateId == item?.mtid ? (
                  <View style={{marginTop: 15}}>
                    <View>
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          Menu Type
                        </Text>
                        <TextInput
                          style={{
                            height: 35,
                            // margin: 12,
                            width: 350,
                            borderWidth: 1,
                            color: 'black',
                            borderRadius: 5,
                            borderColor: 'grey',
                          }}
                          multiline={true}
                          onChangeText={text => setUpType(text)}
                          value={UpType}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={UpdateTypeName}
                        style={{
                          // marginLeft: 200,
                          width: 80,
                          height: 40,
                          backgroundColor: 'skyblue',
                          borderRadius: 5,
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          Save
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          marginLeft: 50,
                          width: 80,
                          height: 40,
                          backgroundColor: 'skyblue',
                          borderRadius: 5,
                          alignContent: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => {
                          setUpdateId(null);
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                          cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Menu Type:{' '}
                        <Text style={{color: '#610067', fontWeight: 'bold'}}>
                          {item?.menutype}
                        </Text>
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <View>
            <View style={{marginTop: 50}}>
              <Text
                style={{
                  color: 'black',
                  marginLeft: 20,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Add new menu type
              </Text>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    color: 'black',
                    borderColor: 'grey',
                  }}
                  multiline={true}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={submitType}
                style={{
                  width: 80,
                  height: 40,
                  backgroundColor: 'skyblue',
                  borderRadius: 5,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAddFlag(false);
                }}
                style={{
                  marginLeft: 50,
                  width: 80,
                  height: 40,
                  backgroundColor: 'skyblue',
                  borderRadius: 5,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('rest');
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
            BACK TO MY RESTAURANTS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuType;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    // alignItems: 'center',
    // marginBottom: 50,
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
