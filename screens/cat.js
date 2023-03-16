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

const Cat = () => {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  // const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const {UserID} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  const {Cat, setCat} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [Img, setImg] = useState();
  const {action, setaction} = useContext(exportvalues);
  const [Tray, setTray] = useState({});

  useEffect(() => {
    apiAxios1('cat', {
      userid: user,
      restid: Rest.restid,
      brandid: Brand.brandid,
      mtid: MenuType.mtid,
      action: 'read',
    }).then(res => {
      setTypes(res?.data);
    });
  }, [action, Rest]);

  const UpdateType = item => {
    setUpdateId(item?.catid);
    setUpType(item?.cat);
    setImg(item?.CImage);
  };

  const UpdateTypeName = () => {
    apiAxios1('cat', {
      cat: UpType,
      CImage: Img,
      catid: UpdateId,
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
    apiAxios1('cat', {
      cat: Name,
      mtid: MenuType.mtid,
      brandid: Brand.brandid,
      restid: Rest.restid,
      userid: user,
      notes: 'notes',
      CImage: 'null',
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
    apiAxios1('cat', {
      catid: item?.catid,
      action: 'delete',
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setaction(!action);
    });
  };

  const selectMenuType = item => {
    console.log(item);
    setCat(item);
    navigation.navigate('menu');
  };

  const traySelector = item => {
    console.log('item in tray', item);
    setTray(item);
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
            borderColor: '#9e4848',
            borderRadius: 5,
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
              Do you want to delete this Category : {DeleteItem?.cat}?
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
                margin: 5,
              }}>
              This action will delete all data related to this Category :{' '}
              {DeleteItem?.cat}? !!
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
                backgroundColor: '#ee8b8d',
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
                backgroundColor: '#88cdea',
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
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              color: 'white',
              // fontStyle: 'italic',
              fontSize: 15,
              alignSelf: 'center',
              marginLeft: 25,
              textTransform: 'uppercase',
            }}>
            {Brand.brand}
          </Text>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              color: 'black',
              // fontStyle: 'italic',
              fontSize: 15,
              alignSelf: 'center',
              marginLeft: 25,
              textTransform: 'uppercase',
            }}>
            {Rest.rest}
          </Text>
        </View>
        {/* <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            color: 'black',
            // fontStyle: 'italic',
            fontSize: 15,
            alignSelf: 'center',
            marginLeft: 5,
            textTransform: 'uppercase',
          }}>
          {MenuType.menutype}
        </Text> */}

        {/* <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            color: 'red',
            // fontStyle: 'italic',
            fontSize: 15,
            alignSelf: 'center',
            marginLeft: 5,
            textTransform: 'capitalize',
          }}>
          categories
        </Text> */}

        {AddFlag == false ? (
          <View
            style={{
              marginTop: 2,
              alignSelf: 'center',
              flexDirection: 'row',
              position: 'absolute',
            }}>
            <TouchableOpacity
              onPress={AddType}
              style={{
                marginLeft: 280,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    color: 'red',
                    // fontStyle: 'italic',
                    fontSize: 10,
                    alignSelf: 'center',
                    // marginLeft: 5,
                    marginRight: 5,
                    textTransform: 'capitalize',
                  }}>
                  categories
                </Text>
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
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <View style={{backgroundColor: '#f5e1b6'}}>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 30,
          }}>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 25,
              textTransform: 'uppercase',
            }}>
            {MenuType.menutype}
          </Text>
          {/* <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
              marginLeft: 1,
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            /{Cat.cat}
          </Text> */}
        </View>
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
                  marginLeft: 10,
                  marginBottom: 10,
                  width: DeviceWidth - 20,
                  backgroundColor: '#38b05f',
                  elevation: 15,
                  borderRadius: 5,
                  // marginBottom: UpdateId == item?.Id ? 60 : 0,
                }}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    {item.CImage !== 'null' ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('upload', {
                            page: 'cat',
                            data: item,
                          });
                        }}>
                        <Image
                          source={{uri: item.CImage}}
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
                            page: 'cat',
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

                  <View style={{marginLeft: 10, flexDirection: 'column'}}>
                    <Text
                      style={{
                        color: '#eaebeb',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: 15,
                      }}>
                      {item.cat}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      position: 'absolute',
                      marginLeft: 280,
                      marginTop: 10,
                    }}>
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
                  {/* <View style={{flexDirection: 'row', marginLeft: 120}}>
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
                  </View> */}

                  {/* {Tray == item ? (
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
                  )} */}
                </View>

                {UpdateId == item?.catid ? (
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
                    {/* <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Category:{' '}
                        <Text style={{color: '#610067', fontWeight: 'bold'}}>
                          {item?.cat}
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
                Add new category
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
                    borderRadius: 5,
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
            navigation.navigate('menuType');
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
            BACK TO MY MENU TYPES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cat;

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
