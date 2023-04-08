import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  Platform,
  Easing,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {exportvalues} from '../contextApi/ContextTab';
import {TextInput} from 'react-native-paper';
// import MenuType from '../screens/menutype';
// import Brand from '../screens/Brand';
import MenuModal from '../screens/menuModal';
import Modal from 'react-native-modal';
import LogoTitle from '../screens/LogoTitle';
import Nodata from './Nodata';

const window = Dimensions.get('window');

function Row(props) {
  const {active, data} = props;
  const [isOpen, setIsOpen] = useState(false);

  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const [mName, setMName] = useState('');
  const {UserID} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  // const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [Img, setImg] = useState();
  const {actionMT, setactionMT} = useContext(exportvalues);
  const [Tray, setTray] = useState({});
  const {Cat, setCat} = useContext(exportvalues);
  const [AddMenuFlag, setAddMenuFlag] = useState(false);
  const [AddSpice, setAddSpice] = useState(4);
  const [AddVeg, setAddVeg] = useState(1);
  const [Price, setPrice] = useState();
  const [Desc, setDesc] = useState();
  const [Ingred, setIngred] = useState();
  const [loading, setLoading] = useState(false);
  const {Email, setEmail} = useContext(exportvalues);

  const {actionM, setactionM} = useContext(exportvalues);
  const {menuCounter, setMenuCounter} = useContext(exportvalues);
  const {menuTypeCounter, setMenuTypeCounter} = useContext(exportvalues);
  const {menuModalIsOpen, setMenuModalIsOpen} = useContext(exportvalues);

  useEffect(() => {
    setLoading(true);
    apiAxios1('menutype', {
      user_id: user,
      action: 'read',
      restaurant_id: Rest.restaurant_id,
      // brand_id: route.params.data.brand_id,
      brand_id: 1,
    }).then(res => {
      console.log('read data at menutype', res.data);
      setTypes(res?.data);
      setLoading(false);
      setMenuTypeCounter(res?.data.length);
    });
  }, [actionMT, Rest]);

  const UpdateType = item => {
    console.log('item received in updatetype', item);
    setUpdateId(item?.menutype_id);
    setUpType(item?.menu_type);
    setImg(item?.menu_type_image);
  };

  const UpdateTypeName = item => {
    apiAxios1('menutype', {
      menu_type: UpType,
      menu_type_image: Img,
      menutype_id: UpdateId,
      action: 'update',
    }).then(res => {
      console.log(res.data);

      apiAxios1('log', {
        user_id: '1',
        restaurant_id: Rest.restaurant_id,
        restaurant: 'depends upon id',
        log: `Menu Type ${item.menu_type} is edited to ${UpType} by ${Email} `,
        action: 'create',
      }).then(res => {
        console.log('logger fired', res.data);
      });
      setactionMT(!actionMT);
      setUpdateId(null);
    });
  };

  const AddType = () => {
    setAddFlag(true);
  };

  const submitType = () => {
    console.log(Name);
    apiAxios1('menutype', {
      menu_type: Name,
      brand_id: route.params.data.brand_id,
      restaurant_id: Rest.restaurant_id,
      user_id: user,
      notes: 'notes',
      menu_type_image: 'null',
      favourite: 1,
      is_active: 1,
      rank_order: 1,
      action: 'create',
    }).then(res => {
      console.log('response on insert new menutype', res.data.insertId);

      apiAxios1('cat', {
        category: '@$DeveloperDefaultCategory$@',
        menutype_id: res.data.insertId,
        brand_id: route.params.data.brand_id,
        restaurant_id: Rest.restaurant_id,
        user_id: user,
        notes: 'notes',
        category_image: 'null',
        favourite: 1,
        is_active: 1,
        rank_order: 1,
        action: 'create',
      }).then(res => {
        console.log('@$DeveloperDefaultCategory$@ category created', res.data);

        apiAxios1('log', {
          user_id: '1',
          restaurant_id: Rest.restaurant_id,
          restaurant: 'depends upon id',
          log: `New Menu Type ${Name} is created by ${Email} `,
          action: 'create',
        }).then(res => {
          console.log('logger fired', res.data);
        });
      });

      setAddFlag(false);
      setactionMT(!actionMT);
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
      menutype_id: item.menutype_id,
      action: 'delete',
    }).then(res => {
      console.log(res.data);

      apiAxios1('log', {
        user_id: '1',
        restaurant_id: Rest.restaurant_id,
        restaurant: 'depends upon id',
        log: `Menu Type ${item.menu_type} is deleted by ${Email} `,
        action: 'create',
      }).then(res => {
        console.log('logger fired', res.data);
      });
      setIsOpen(false);
      setactionMT(!actionMT);
    });
  };

  const selectMenuType = item => {
    // console.log(item);
    if (item) {
      apiAxios1('cat', {
        menutype_id: item.menutype_id,
        brand_id: route.params.data.brand_id,
        restaurant_id: Rest.restaurant_id,
        action: 'read',
        user_id: user,
      }).then(res => {
        // console.log('response data from cat', res.data);
        res.data.map(i => {
          if (i.category == '@$DeveloperDefaultCategory$@') {
            setCat(i);
            setMenuType(item);
            console.log('Found the default', i);
          }
        });
      });
    } else {
      setMenuType([]);
      setTray({});
    }
  };

  const traySelector = item => {
    console.log('item in tray', item);
    selectMenuType(item);
    setTray(item);
  };

  const AddMenu = item => {
    console.log('AddMenu called');
    selectMenuType(item);

    setAddMenuFlag(true);
  };

  const submitMenu = () => {
    // console.log(MenuType.menu_type);
    console.log(
      'actions received at submit menu',
      MenuType.menutype_id,
      route.params.data.brand_id,
      Rest.restaurant_id,
      Cat.category_id,
      user,
      AddVeg,
      AddSpice,
      Price,
      Desc,
      Ingred,
    );
    apiAxios1('menu', {
      menu: mName,
      menutype_id: MenuType.menutype_id,
      brand_id: route.params.data.brand_id,
      restaurant_id: Rest.restaurant_id,
      category_id: Cat.category_id,
      user_id: user,
      notes: 'null',
      menu_image: 'null',
      veg: AddVeg,
      spice: AddSpice,
      price: Price,
      description: Desc,
      ingredients: Ingred,
      favourite: 1,
      is_active: 1,
      rank_order: 1,
      action: 'create',
    }).then(res => {
      console.log(res.data);

      apiAxios1('log', {
        user_id: '1',
        restaurant_id: Rest.restaurant_id,
        restaurant: 'depends upon id',
        log: `New Menu ${mName} in Menu Type ${MenuType.menu_type} is created by ${Email} `,
        action: 'create',
      }).then(res => {
        console.log('logger fired', res.data);
      });
      setactionM(!actionM);
      setAddMenuFlag(false);
    });
  };

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <View style={styles.containerMain}>
        {/* delete modal */}

        <MenuModal />

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
                Do you want to delete this Menu Type : {DeleteItem?.menu_type}?
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  textAlign: 'center',
                  margin: 5,
                }}>
                This action will delete all data related to this Menu Type :{' '}
                {DeleteItem?.menu_type} !!
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
                  justifyContent: 'center',
                  backgroundColor: '#ee8b8d',
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
                  justifyContent: 'center',
                  backgroundColor: '#88cdea',
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
        {/* Add menutype modal */}
        <Modal
          useNativeDriver={true}
          animationInTiming={500}
          animationOutTiming={500}
          animationIn="bounceInUp"
          animationOut="bounceOutDown"
          onBackButtonPress={() => setAddFlag(false)}
          onBackdropPress={() => {
            setAddFlag(false);
          }}
          isVisible={AddFlag}>
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
                Add a new menu type
              </Text>
            </View>

            <View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    color: 'black',
                    marginLeft: 20,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Menu Type Name
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
              <View style={{flexDirection: 'row', marginLeft: 80}}>
                <TouchableOpacity
                  onPress={submitType}
                  style={{
                    // marginLeft: 250,
                    width: 60,
                    height: 20,
                    // backgroundColor: 'yellow',
                    borderRadius: 5,
                    // borderWidth: 2,
                    // borderColor: 'red',
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
                    Submit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAddFlag(false);
                  }}
                  style={{
                    marginLeft: 50,
                    width: 60,
                    height: 20,
                    // backgroundColor: 'yellow',
                    borderRadius: 5,
                    // borderWidth: 2,
                    // borderColor: 'red',
                    justifyContent: 'center',
                    backgroundColor: '#88cdea',
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
          </View>
        </Modal>

        <View>
          <View
            style={{
              width: DeviceWidth,
              backgroundColor: '#ecba5c',
              height: 50,
              flexDirection: 'row',
              // marginLeft: 20,
              // flex: 1,
            }}>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  color: 'white',
                  // fontStyle: 'italic',
                  fontSize: 13,
                  alignSelf: 'center',
                  marginLeft: 25,
                  textTransform: 'uppercase',
                }}>
                {/* {route.params.brandInfo.brand} */}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  color: 'black',
                  // fontStyle: 'italic',
                  fontSize: 18,
                  alignSelf: 'center',
                  marginLeft: 25,
                  textTransform: 'uppercase',
                }}>
                {Rest.restaurant}
              </Text>
            </View>

            <View
              style={{
                marginTop: 2,
                alignSelf: 'center',
                flexDirection: 'row',
                position: 'absolute',
                marginLeft: 260,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('publish');
                }}>
                <Image
                  source={require('../assets/QR.png')}
                  style={{width: 27, height: 27, marginLeft: 13, marginTop: -2}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMenuModalIsOpen(true);
                }}>
                <Image
                  source={require('../assets/ham5.png')}
                  style={{width: 25, height: 25, marginLeft: 13}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {!AddMenuFlag ? (
            <TouchableOpacity
              onPress={AddType}
              style={{
                padding: 8,
                backgroundColor: '#e7e1d1',
                width: '95%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                marginTop: 2,
                marginBottom: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{color: 'black', fontWeight: 'bold', marginLeft: 30}}>
                + New Menu Type
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>

        {Types.length > 0 ? (
          // <View>
          <ScrollView
            style={{marginBottom: 50}}
            keyboardShouldPersistTaps={'always'}>
            {!AddMenuFlag ? (
              Types.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectMenuType(item);
                    }}
                    style={{
                      // marginTop: 10,
                      // marginLeft: 10,
                      // marginBottom: 10,
                      margin: 2,
                      // width: DeviceWidth - 20,
                      // backgroundColor: '#38b05f',
                      // backgroundColor: '#b7b7b7',
                      width: '95%',
                      alignSelf: 'center',
                      // backgroundColor: '#fad06e',
                      backgroundColor: '#e7e1d1',
                      // elevation: 15,
                      borderRadius: 5,
                      // marginBottom: UpdateId == item?.Id ? 60 : 0,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <View>
                        {item.menu_type_image !== 'null' ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('upload', {
                                page: 'MT',
                                data: item,
                              });
                            }}>
                            <Image
                              source={{uri: item.menu_type_image}}
                              style={{
                                width: 25,
                                height: 25,
                                marginLeft: 10,
                                borderRadius: 5,
                              }}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('upload', {
                                page: 'MT',
                                data: item,
                              });
                            }}>
                            <Image
                              source={require('../assets/noimg.png')}
                              style={{width: 25, height: 25, marginLeft: 10}}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      <View style={{marginLeft: 10, flexDirection: 'column'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            fontSize: 15,
                          }}>
                          {item.menu_type}
                        </Text>

                        {MenuType.length !== 0 &&
                        MenuType.menutype_id == item.menutype_id ? (
                          <Text style={{color: 'black'}}>
                            ({menuCounter} items)
                          </Text>
                        ) : (
                          <View />
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          marginLeft: 200,
                          marginTop: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            traySelector(item);
                          }}>
                          <Image
                            source={require('../assets/ham4.png')}
                            style={{
                              width: 10,
                              height: 25,
                              marginLeft: 20,
                              marginTop: -5,
                              // borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            AddMenu(item);
                          }}>
                          <Image
                            source={require('../assets/add.png')}
                            style={{
                              width: 25,
                              height: 25,
                              marginLeft: 20,
                              marginTop: -5,
                              // borderRadius: 5,
                            }}
                          />
                        </TouchableOpacity>
                        {MenuType == item ? (
                          <TouchableOpacity
                            onPress={() => {
                              selectMenuType();
                            }}
                            onPressIn={() => {
                              setTray({});
                            }}>
                            <Image
                              source={require('../assets/wrong.png')}
                              style={{
                                width: 15,
                                height: 15,
                                marginLeft: 20,
                              }}
                            />
                          </TouchableOpacity>
                        ) : (
                          <View>
                            {/* <TouchableOpacity>
                            <Image
                              source={require('../assets/drag.png')}
                              style={{
                                height: 23,
                                width: 15,
                                marginLeft: 30,
                                marginTop: -5,
                              }}
                            />
                          </TouchableOpacity> */}
                          </View>
                        )}
                      </View>
                    </View>

                    {UpdateId == item?.menutype_id ? (
                      <View style={{marginTop: 15}}>
                        <View>
                          <View style={{}}>
                            <Text
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                marginLeft: 10,
                              }}>
                              Menu Type
                            </Text>
                            <TextInput
                              style={{
                                height: 35,
                                // margin: 12,
                                // width: 350,
                                borderWidth: 1,
                                color: 'black',
                                borderRadius: 5,
                                borderColor: 'grey',
                                margin: 10,
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
                          <Button
                            labelStyle={{
                              fontSize: 8,
                              marginTop: 4,
                              marginBottom: 5,
                            }}
                            style={{
                              width: 70,
                              alignSelf: 'center',
                              height: 20,
                              marginBottom: 10,
                            }}
                            mode="contained"
                            color="#ec8c8c"
                            onPress={() => {
                              UpdateTypeName(item);
                            }}>
                            Save
                          </Button>

                          <Button
                            labelStyle={{
                              fontSize: 8,
                              marginTop: 4,
                              marginBottom: 5,
                            }}
                            style={{
                              width: 70,
                              alignSelf: 'center',
                              height: 20,
                              marginBottom: 10,
                              marginLeft: 20,
                            }}
                            mode="contained"
                            color="skyblue"
                            onPress={() => {
                              setUpdateId(null);
                            }}>
                            cancel
                          </Button>
                        </View>
                      </View>
                    ) : (
                      <View>
                        {Tray == item ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              // marginRight: 10,
                              marginLeft: 10,
                              marginBottom: 10,
                            }}>
                            <Button
                              labelStyle={{
                                fontSize: 8,
                                marginTop: 4,
                                marginBottom: 5,
                              }}
                              style={{
                                width: 70,
                                alignSelf: 'center',
                                height: 20,
                                marginBottom: 10,
                              }}
                              mode="contained"
                              color="#ec8c8c"
                              onPress={() => {
                                ButtonAlert(item);
                              }}>
                              Delete
                            </Button>

                            <Button
                              labelStyle={{
                                fontSize: 8,
                                marginTop: 4,
                                marginBottom: 5,
                              }}
                              style={{
                                width: 60,
                                alignSelf: 'center',
                                height: 20,
                                marginBottom: 10,
                                marginLeft: 5,
                                marginRight: 5,
                              }}
                              mode="contained"
                              color="skyblue"
                              onPress={() => {
                                UpdateType(item);
                              }}>
                              edit
                            </Button>

                            {/* <Button
                            labelStyle={{
                              fontSize: 8,
                              marginTop: 4,
                              marginBottom: 5,
                            }}
                            style={{
                              width: 80,
                              alignSelf: 'center',
                              height: 20,
                              marginBottom: 10,
                              // marginLeft: 5,
                              marginRight: 5,
                            }}
                            mode="contained"
                            color="pink"
                            onPress={() => {
                              AddMenu();
                            }}
                            
                            >
                            Add menu
                          </Button> */}

                            <Button
                              labelStyle={{
                                fontSize: 8,
                                marginTop: 4,
                                marginBottom: 5,
                              }}
                              style={{
                                width: 70,
                                alignSelf: 'center',
                                height: 20,
                                marginBottom: 10,
                              }}
                              mode="contained"
                              color="green"
                              onPress={() => {
                                setTray({});
                              }}>
                              Cancel
                            </Button>
                          </View>
                        ) : (
                          <View></View>
                        )}

                        {MenuType == item ? (
                          <View
                            style={{
                              width: '100%',
                              alignSelf: 'flex-end',
                            }}>
                            <Menu1 brandInfo={route.params.brandInfo} />
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
                <View style={{flex: 1}}>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    Add new menu
                  </Text>

                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    Name
                  </Text>

                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      color: 'black',
                    }}
                    multiline={true}
                    onChangeText={text => setMName(text)}
                    placeholder="Name"
                  />

                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                      fontWeight: 'bold',
                    }}>
                    Price
                  </Text>
                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      color: 'black',
                    }}
                    multiline={true}
                    onChangeText={text => setPrice(text)}
                    placeholder="Price"
                  />

                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                      fontWeight: 'bold',
                    }}>
                    Spice Id
                  </Text>
                  <View style={{flexDirection: 'row', marginLeft: 50}}>
                    <TouchableOpacity
                      onPress={() => {
                        setAddSpice(1);
                      }}
                      style={{
                        borderWidth: AddSpice == 1 ? 2 : 0,
                        height: 40,
                        width: 45,
                        borderColor: 'red',
                      }}>
                      <Image
                        source={require('../assets/chilli1.png')}
                        style={{height: 35, width: 35}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAddSpice(2);
                      }}
                      style={{
                        borderWidth: AddSpice == 2 ? 2 : 0,
                        height: 40,
                        width: 68,
                        borderColor: 'red',
                        marginLeft: 20,
                      }}>
                      <Image
                        source={require('../assets/chilli2.png')}
                        style={{height: 35, width: 60}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAddSpice(3);
                      }}
                      style={{
                        borderWidth: AddSpice == 3 ? 2 : 0,
                        height: 40,
                        width: 90,
                        borderColor: 'red',
                        marginLeft: 20,
                      }}>
                      <Image
                        source={require('../assets/chilli3.png')}
                        style={{height: 35, width: 84}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAddSpice(4);
                      }}
                      style={{
                        borderWidth: AddSpice == 4 ? 2 : 0,
                        height: 40,
                        width: 40,
                        borderColor: 'black',
                        marginLeft: 20,
                      }}>
                      <Image
                        source={require('../assets/nochilli.png')}
                        style={{height: 35, width: 35}}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                      fontWeight: 'bold',
                    }}>
                    Veg/Non-Veg
                  </Text>
                  <View style={{flexDirection: 'row', marginLeft: 50}}>
                    <TouchableOpacity
                      onPress={() => {
                        // setVegInfo(1);
                        setAddVeg(1);
                      }}
                      style={{
                        borderWidth: AddVeg == 1 ? 2 : 0,
                        height: 40,
                        width: 45,
                        borderColor: 'black',
                      }}>
                      <Image
                        source={require('../assets/veg.png')}
                        style={{
                          height: 36,
                          width: 35,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        // setVegInfo(2);
                        setAddVeg(2);
                      }}
                      style={{
                        borderWidth: AddVeg == 2 ? 2 : 0,
                        height: 40,
                        width: 45,
                        borderColor: 'black',
                        marginLeft: 20,
                      }}>
                      <Image
                        source={require('../assets/nonveg.png')}
                        style={{
                          height: 35,
                          width: 35,
                          alignSelf: 'center',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      marginTop: 5,
                      fontWeight: 'bold',
                    }}>
                    Description
                  </Text>

                  <TextInput
                    style={{
                      height: 40,
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      color: 'black',
                    }}
                    multiline={true}
                    onChangeText={text => setDesc(text)}
                    placeholder="Description"
                  />
                </View>

                <View style={{flexDirection: 'row', marginLeft: 120}}>
                  <TouchableOpacity
                    onPress={submitMenu}
                    style={{
                      marginLeft: -30,
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
                      setAddMenuFlag(false);
                      // setBackFlag(false);
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
        ) : (
          <View style={{backgroundColor: '#fdfdfe', height: DeviceHeight}}>
            {loading ? (
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  height: DeviceHeight,
                  // height: 220,
                  width: DeviceWidth,
                }}>
                <Image
                  source={require('../assets/load.gif')}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 5,
                    marginLeft: 5,
                    marginTop: 5,
                    alignSelf: 'center',
                  }}
                />
              </View>
            ) : (
              <Nodata />
            )}
          </View>
        )}

        {!AddMenuFlag ? (
          <View style={styles.bottomView}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('brand');
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
                BACK TO DASHBOARD
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </Animated.View>
  );
}

const Access = () => {
  const [list, setList] = useState([]);
  const [action, setAction] = useState(false);

  // const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const [mName, setMName] = useState('');
  const {UserID} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [Img, setImg] = useState();
  const {actionMT, setactionMT} = useContext(exportvalues);
  const [Tray, setTray] = useState({});
  const {Cat, setCat} = useContext(exportvalues);
  const [AddMenuFlag, setAddMenuFlag] = useState(false);
  const [AddSpice, setAddSpice] = useState(4);
  const [AddVeg, setAddVeg] = useState(1);
  const [Price, setPrice] = useState();
  const [Desc, setDesc] = useState();
  const [Ingred, setIngred] = useState();
  const [loading, setLoading] = useState(false);
  const {Email, setEmail} = useContext(exportvalues);

  const {actionM, setactionM} = useContext(exportvalues);
  const {menuCounter, setMenuCounter} = useContext(exportvalues);
  const {menuTypeCounter, setMenuTypeCounter} = useContext(exportvalues);
  const {menuModalIsOpen, setMenuModalIsOpen} = useContext(exportvalues);

  const arrItems = [];

  const rankupdater = item => {
    console.log(
      'Rank updater ******************************************************************************************',
    );
    // console.log(item);
    apiAxios1('menutype', {
      menutype_id: item.menutype_id,
      rank_order: item.appRank,
      action: 'rank',
    }).then(response => {
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log('use effect called @@@@@@@@@@@@@@@@@@@@@@@@');
    apiAxios1('menutype', {
      user_id: 3,
      action: 'read',
      restaurant_id: 32,
      brand_id: 3,
    }).then(res => {
      // console.log(res.data);
      setList(res.data);
    });
  }, []);

  const newListSetter = (item, newlist) => {
    const newArrItems = [];
    const setter = [];

    newlist.map((i, index) => {
      const item = parseInt(i);
      newArrItems.push({
        appRank: index,
        menutype_id: list[item].menutype_id,
        menu_type: list[item].menu_type,
        rank_order: list[item].rank_order,
      });
    });
    console.log('newArrItems are', newArrItems);
    newArrItems.map(item => {
      if (item.appRank !== item.rank_order) {
        console.log('mismatch detected from Setter');
        rankupdater(item);
      }
    });
  };

  const renderRow = useCallback(({data, active}) => {
    return <Row data={data} active={active} />;
  }, []);

  return (
    <View style={styles.container}>
      <LogoTitle />

      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={list}
        renderRow={renderRow}
        onReleaseRow={(item, list) => {
          newListSetter(item, list);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  text: {
    fontSize: 24,
    color: '#222222',
  },
});

export default Access;
