import React, {useEffect, useState, useContext} from 'react';
// import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogoTitle from './LogoTitle';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';
import Modal from 'react-native-modal';

function Brand() {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  // const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const {UserID} = useContext(exportvalues);
  const user = parseInt(UserID);
  const {action, setaction} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {Brands, setBrands} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  const [Img, setImg] = useState();
  const [Tray, setTray] = useState({});

  const DeviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    apiAxios1('brandrest', {
      userid: user,
      // action: 'read',
    }).then(res => {
      console.log(res.data);
      // setBrands(res?.data);
      setTypes(res?.data);

      // if (res?.data?.status) {
      //   setBrands(res?.data?.data);
      //   setTypes(res?.data?.data);
      // }
    });
  }, [action]);

  const UpdateType = item => {
    console.log('item at update', item);
    setUpdateId(item?.brandid);
    setUpType(item?.brand);
    setImg(item?.BImage);
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const UpdateTypeName = () => {
    apiAxios1('brand', {
      userid: user,
      action: 'update',
      brand: UpType,
      BImage: Img,
      brandid: UpdateId,
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
    apiAxios1('brand', {
      brand: Name,
      BImage: 'null',
      userid: user,
      rank1: 1,
      cUser: user,
      status1: 1,
      action: 'create',
    }).then(res => {
      console.log(res.data.status);
      setAddFlag(false);
      setaction(!action);
    });
  };

  const deleteType = item => {
    console.log(item);
    apiAxios1('brand', {
      userid: user,
      action: 'delete',
      brandid: item?.brandid,
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setaction(!action);
    });
  };
  const BrandSelector = item => {
    console.log(item);
    // setRest(item);
    setBrand(item);
    navigation.navigate('rest');
    // setIsOpen(false);
  };

  const traySelector = item => {
    console.log('item in tray', item);
    setTray(item);
  };

  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
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
            borderColor: '#9e4848',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: '#9e4848',
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
              Do you want to delete this Brand : {DeleteItem?.brand}?
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
                margin: 5,
              }}>
              This action will delete all data related to this Brand :{' '}
              {DeleteItem?.brand} !!
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
          // backgroundColor: '#62982d',
          backgroundColor: '#ecba5c',

          height: 40,
          flexDirection: 'row',
          // flex: 1,
        }}>
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          Dashboard
        </Text>

        {AddFlag == false ? (
          <View style={{marginTop: -1, alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={AddType}
              style={{
                marginLeft: 150,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: 25,
                    height: 25,
                    backgroundColor: '#ee6601',
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 40,
                      alignSelf: 'center',
                      marginTop: -17,
                    }}>
                    +
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 5,
                    fontSize: 15,
                    textTransform: 'uppercase',
                  }}>
                  Brand
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <ScrollView
        style={{marginBottom: 100}}
        keyboardShouldPersistTaps={'always'}>
        {AddFlag == false ? (
          Types.map((item, index) => {
            // console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  BrandSelector(item);
                }}
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                  width: DeviceWidth - 20,
                  // height: 150,
                  // backgroundColor: '#b0bec5',
                  backgroundColor: '#38b05f',
                  elevation: 15,
                  borderRadius: 5,

                  // marginBottom: UpdateId == item?.Id ? 50 : 0,
                }}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <View>
                      {item.BImage !== 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('upload', {
                              page: 'brand',
                              data: item,
                            });
                          }}>
                          <Image
                            source={{uri: item.BImage}}
                            style={{
                              width: 50,
                              height: 50,
                              marginLeft: 10,
                              borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('upload', {
                              page: 'brand',
                              data: item,
                            });
                          }}>
                          <Image
                            source={require('../assets/noimg.png')}
                            style={{width: 50, height: 50, marginLeft: 10}}
                          />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={{marginLeft: 10, flexDirection: 'row'}}>
                      <Text
                        style={{
                          color: '#eaebeb',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          fontSize: 18,
                        }}>
                        {item.brand}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        position: 'absolute',
                        marginLeft: 300,
                      }}>
                      {/* <TouchableOpacity
                        onPress={() => {

                        }}>
                        <Image
                          source={require('../assets/bell.png')}
                          style={{
                            width: 35,
                            height: 35,
                            marginLeft: 10,
                            marginTop: -5,

                          }}
                        />
                      </TouchableOpacity> */}

                      <TouchableOpacity
                        onPress={() => {
                          traySelector(item);
                        }}>
                        <Image
                          source={require('../assets/ham2.png')}
                          style={{
                            width: 25,
                            height: 25,
                            marginLeft: 20,
                            // borderRadius: 5,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {UpdateId == item?.brandid ? (
                  <View style={{marginTop: 15}}>
                    <View>
                      <View>
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                            marginLeft: 10,
                          }}>
                          Brand
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: -25,
                          }}></View>
                        <View style={{marginLeft: 10, marginTop: 30}}>
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
                            onChangeText={text => setUpType(text)}
                            value={UpType}
                          />

                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              onPress={UpdateTypeName}
                              style={{
                                // marginLeft: 250,
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
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    {/* <View style={{marginLeft: 10, flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        <Text
                          style={{
                            color: '#0d47a1',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                          }}>
                          {item.brand}
                        </Text>
                      </Text>
                    </View> */}
                    {Tray == item ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          marginRight: 20,
                          marginBottom: 10,
                        }}>
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

                        <TouchableOpacity
                          onPress={() => {
                            // UpdateType(item);
                            setTray({});
                          }}
                          style={{
                            marginLeft: 20,
                            width: 50,
                            height: 25,
                            backgroundColor: 'pink',
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
                            cancel
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View></View>
                    )}
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
                Add new Brand
              </Text>
              <View style={{marginTop: 5}}>
                <TextInput
                  style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                    color: 'black',
                    // backgroundColor: 'grey',
                    borderColor: 'grey',
                  }}
                  multiline={true}
                  onChangeText={text => setName(text)}
                />
              </View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 100}}>
              <TouchableOpacity
                onPress={submitType}
                style={{
                  // marginLeft: 250,
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
    </View>
  );
}

export default Brand;
