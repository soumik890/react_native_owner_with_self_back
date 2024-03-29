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
import Menu1 from './menu';
import Nodata from '../screenFroms/Nodata';
import MenuModal from './menuModal';
import {Button} from 'react-native-paper';

const MenuType = ({route}) => {
  const navigation = useNavigation();
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
  const {AllMenuType, setAllMenuType} = useContext(exportvalues);

  const {actionM, setactionM} = useContext(exportvalues);
  const {menuCounter, setMenuCounter} = useContext(exportvalues);
  const {menuTypeCounter, setMenuTypeCounter} = useContext(exportvalues);
  const {menuModalIsOpen, setMenuModalIsOpen} = useContext(exportvalues);

  // setBrand()

  useEffect(() => {
    setLoading(true);
    apiAxios1('menutype', {
      user_id: user,
      action: 'read',
      restaurant_id: Rest.restaurant_id,
      brand_id: route.params.data.brand_id,
    }).then(res => {
      console.log('read data at menutype', res.data);
      setTypes(res?.data);
      setAllMenuType(res?.data);
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
        user_id: user,
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
        category: 'general',
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
        console.log('general category created', res.data);

        apiAxios1('log', {
          user_id: user,
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
          if (i.category == 'general') {
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

  return (
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
            borderColor: 'orange',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: 'orange',
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
                onPress={submitType}>
                Submit
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
                  setAddFlag(false);
                }}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <LogoTitle />

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
              {route.params.brandInfo.brand}
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
            <Text style={{color: 'black', fontWeight: 'bold', marginLeft: 30}}>
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
                    margin: 2,

                    width: '95%',
                    alignSelf: 'center',
                    backgroundColor: '#e7e1d1',
                    borderRadius: 5,
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
                        <View></View>
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
                              width: 68,
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
                              width: 5,
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

                          <Button
                            labelStyle={{
                              fontSize: 8,
                              marginTop: 4,
                              marginBottom: 5,
                            }}
                            style={{
                              width: 69,
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

                          <Button
                            labelStyle={{
                              fontSize: 8,
                              marginTop: 4,
                              marginBottom: 5,
                            }}
                            style={{
                              width: 99,
                              alignSelf: 'center',
                              height: 20,
                              marginBottom: 10,
                              marginLeft: 5,
                              marginRight: 5,
                            }}
                            mode="contained"
                            color="pink"
                            onPress={() => {
                              navigation.navigate('MenuRank');
                            }}>
                            Change Rank
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
                  keyboardType="numeric"
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
                      setAddSpice(4);
                    }}
                    style={{
                      borderWidth: AddSpice == 4 ? 2 : 0,
                      borderRadius: 5,
                      borderStyle: 'dotted',
                      height: 40,
                      width: 40,
                      borderColor: 'red',
                      // marginLeft: 20,
                    }}>
                    <Image
                      source={require('../assets/nochilli.png')}
                      style={{height: 35, width: 35}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setAddSpice(1);
                    }}
                    style={{
                      borderWidth: AddSpice == 1 ? 2 : 0,
                      borderRadius: 5,
                      borderStyle: 'dotted',
                      height: 40,
                      width: 45,
                      borderColor: 'red',
                      marginLeft: 20,
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
                      borderRadius: 5,
                      borderStyle: 'dotted',
                      borderColor: 'red',
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
                      borderRadius: 5,
                      borderStyle: 'dotted',

                      borderColor: 'red',
                    }}>
                    <Image
                      source={require('../assets/chilli3.png')}
                      style={{height: 35, width: 84}}
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
                      borderRadius: 5,
                      borderStyle: 'dotted',
                      height: 45,
                      width: 47,
                      borderColor: 'black',
                      justifyContent: 'center',
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
                      borderRadius: 5,
                      borderStyle: 'dotted',
                      height: 45,
                      width: 47,
                      borderColor: 'black',
                      justifyContent: 'center',
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
                  onPress={submitMenu}>
                  Submit
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
                    setAddMenuFlag(false);
                  }}>
                  Cancel
                </Button>
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
