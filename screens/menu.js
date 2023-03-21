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
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';
import LogoTitle from './LogoTitle';
import Modal from 'react-native-modal';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Menu1 = ({brandInfo}) => {
  const navigation = useNavigation();

  const [DispMenu, setDispMenu] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [Name, setName] = useState();
  const [Desc, setDesc] = useState();
  const [Price, setPrice] = useState();
  const [Ingred, setIngred] = useState();
  const [UpName, setUpName] = useState();
  const [UpDesc, setUpDesc] = useState();
  const [UpPrice, setUpPrice] = useState();
  const [UpIngred, setUpIngred] = useState();
  const {UserID} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  const {Cat, setCat} = useContext(exportvalues);
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [SpiceInfo, setSpiceInfo] = useState(null);
  const [VegInfo, setVegInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();

  // const [BackFlag, setBackFlag] = useState(false);

  const [AddSpice, setAddSpice] = useState(4);
  const [AddVeg, setAddVeg] = useState(1);
  const [Img, setImg] = useState();
  const {actionM, setactionM} = useContext(exportvalues);
  const [Tray, setTray] = useState({});

  console.log('Brand info from menu page', brandInfo);

  useEffect(() => {
    apiAxios1('menu', {
      userid: user,
      restid: Rest.restid,
      brandid: brandInfo.brandid,
      mtid: MenuType.mtid,
      catid: Cat.catid,
      action: 'read',
    }).then(Response => {
      setDispMenu(Response?.data);
      console.log('Disp Menu Exceuted', Response?.data);
    });
  }, [AddFlag, actionM, Rest, MenuType, Cat, Brand]);

  const AddMenu = () => {
    setAddFlag(true);
  };

  const submitMenu = () => {
    apiAxios1('menu', {
      menu: Name,
      mtid: MenuType.mtid,
      brandid: brandInfo.brandid,
      restid: Rest.restid,
      catid: Cat.catid,
      userid: user,
      notes: 'blah',
      MImage: 'null',
      veg: AddVeg,
      spice: AddSpice,
      price: Price,
      description: Desc,
      ingredients: Ingred,
      favourite: 1,
      status1: 1,
      rank1: 1,
      cUser: user,
      action: 'create',
    }).then(res => {
      console.log(res.data);
      setactionM(!actionM);
      setAddFlag(false);
    });
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const deleteMenu = item => {
    console.log(item);
    apiAxios1('menu', {
      menuid: item.menuid,
      action: 'delete',
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setactionM(!actionM);
    });
  };
  const UpdateMenu = item => {
    console.log('item recived', item.price);
    // setBackFlag(true);
    setUpdateId(item?.menuid);
    setUpName(item?.menu);
    // setUpName('demo');
    setUpDesc(item?.description);
    setUpPrice(item.price);
    // setUpPrice('500');
    setSpiceInfo(item?.spice);
    setVegInfo(item?.veg);
    setUpIngred(item?.ingredients);
    setImg(item?.MImage);
  };
  const UpdateItem = () => {
    apiAxios1('menu', {
      menu: UpName,
      MImage: Img,
      spice: SpiceInfo,
      price: UpPrice,
      veg: VegInfo,
      description: UpDesc,
      ingredients: UpIngred,
      menuid: UpdateId,
      action: 'update',
    }).then(res => {
      console.log(res.data);
      setUpdateId(null);
      // setBackFlag(false);
      setactionM(!actionM);
    });
  };

  const traySelector = item => {
    console.log('item in tray', item);
    setTray(item);
  };
  // console.log(DispMenu);
  // console.log('Price is', UpPrice);

  const triggerStyles = {
    triggerText: {
      color: 'black',
      fontSize: 40,
      fontWeight: 'bold',
    },
    triggerWrapper: {
      // padding: 5,
      // backgroundColor: 'blue',
    },
    triggerTouchable: {
      // underlayColor: 'darkblue',
      // activeOpacity: 70,
    },
    TriggerTouchableComponent: TouchableHighlight,
  };

  const blockStyles = {
    optionText: {
      color: 'black',
      // fontSize: 40,
      // fontWeight: 'bold',
    },
    optionsWrapper: {
      // padding: 5,
      // marginLeft: -10,
    },

    optionsContainer: {
      // color: 'red',
      // backgroundColor: 'red',
      justifyContent: 'center',
      // alignItems: 'center',

      width: 100,
      // height: 90,
    },
    optionTouchable: {
      // underlayColor: 'darkblue',
      // activeOpacity: 70,
    },
    TriggerTouchableComponent: TouchableHighlight,
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
              Do you want to delete this Menu : {DeleteItem?.menu}?
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
                margin: 5,
              }}>
              This action will delete all data related to this Menu :{' '}
              {DeleteItem?.menu} !!
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
                deleteMenu(DeleteItem);
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
                // setBackFlag(false);
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

      <ScrollView
        style={
          {
            // marginBottom: 10
          }
        }
        keyboardShouldPersistTaps={'always'}>
        {AddFlag == false ? (
          DispMenu.map((item, index) => {
            return (
              <View>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    marginTop: 2,
                    // marginLeft: 30,
                    // marginLeft: 10,
                    // marginTop: 10,
                    // marginLeft: 10,
                    // marginBottom: 10,
                    // width: DeviceWidth - 20,
                    backgroundColor: '#f7f7f7',
                    elevation: 15,
                    borderRadius: 5,
                    // marginBottom: UpdateId == item?.Id ? 350 : 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        // backgroundColor: 'red'
                        flex: 2,
                      }}>
                      {item.MImage !== 'null' ? (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('upload', {
                              page: 'menu',
                              data: item,
                            });
                          }}>
                          <Image
                            source={{uri: item.MImage}}
                            style={{
                              width: 50,
                              height: 50,
                              // marginLeft: 10,
                              borderRadius: 5,
                              marginLeft: 5,
                              marginTop: 5,

                              // marginRight: 20,
                            }}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('upload', {
                              page: 'menu',
                              data: item,
                            });
                          }}>
                          <Image
                            source={require('../assets/noimg.png')}
                            style={{
                              width: 50,
                              height: 50,
                              marginLeft: 5,
                            }}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View
                      style={{
                        // backgroundColor: 'pink',

                        flex: 6,
                      }}>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={
                            item?.veg == 1
                              ? require('../assets/veg.png')
                              : require('../assets/nonveg.png')
                          }
                          style={{
                            width: 20,
                            height: 20,
                            marginTop: 2,
                          }}
                        />

                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: 15,
                            marginLeft: 10,
                            textTransform: 'capitalize',
                          }}>
                          {item?.menu}
                        </Text>

                        <Image
                          source={
                            item?.spice == 1
                              ? require('../assets/chilli1.png')
                              : item?.spice == 2
                              ? require('../assets/chilli2.png')
                              : item?.spice == 3
                              ? require('../assets/chilli3.png')
                              : require('../assets/nochilli.png')
                          }
                          style={{
                            width:
                              item?.spice == 1
                                ? 10
                                : item?.spice == 2
                                ? 17
                                : item?.spice == 3
                                ? 24
                                : 10,
                            height: 10,
                            marginLeft: 10,
                            marginTop: 2,
                          }}
                        />
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            // marginBottom: 10,
                            color: 'black',
                            textTransform: 'capitalize',
                            // fontWeight: 'bold',
                          }}>
                          {item?.description}{' '}
                        </Text>

                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            textTransform: 'capitalize',
                            // fontWeight: 'bold',
                          }}>
                          {item?.ingredients}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        width: 50,
                        // backgroundColor: 'grey',
                        flex: 2,
                        // alignSelf: 'center',
                      }}>
                      {/* *********************************************************************************************** */}
                      <View style={{marginTop: -20, marginLeft: 10}}>
                        <Menu>
                          <MenuTrigger
                            text="..."
                            customStyles={triggerStyles}
                          />

                          {/* <Text>Hello</Text> */}
                          <MenuOptions customStyles={blockStyles}>
                            <MenuOption
                              onSelect={() => {}}
                              customStyles={blockStyles}>
                              {/* <Text style={{color: 'red'}}>Share</Text> */}
                              <TouchableOpacity
                                // disabled={!filterEnabled}
                                // style={[styles.dateContainer1, {marginLeft: 20}]}
                                onPress={() => {
                                  ButtonAlert(item);
                                }}>
                                <View
                                  style={{flexDirection: 'row', marginTop: 10}}>
                                  <Text style={{color: 'black'}}>Delete</Text>
                                </View>
                              </TouchableOpacity>
                            </MenuOption>
                            <MenuOption
                              onSelect={() => {}}
                              customStyles={blockStyles}>
                              <TouchableOpacity
                                onPress={() => {
                                  UpdateMenu(item);
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  {/* <Image
                                    source={
                                      Night
                                        ? require('../../../assets/images/shareIcon.png')
                                        : require('../../../assets/images/shareIcon.png')
                                    }
                                    style={{height: 25, width: 25}}
                                  /> */}
                                  <Text style={{color: 'black'}}>
                                    Edit Menu
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            </MenuOption>
                          </MenuOptions>
                        </Menu>
                      </View>

                      {/* *********************************************************************************************** */}

                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontWeight: 'bold',
                          marginLeft: 10,
                        }}>
                        {item?.price}/-
                      </Text>
                    </View>
                  </View>

                  {UpdateId == item?.menuid ? (
                    <View>
                      <View>
                        <View style={{marginLeft: 10}}>
                          <Text
                            style={{
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Name:
                          </Text>
                          <TextInput
                            style={{
                              height: 35,
                              // margin: 12,
                              width: 300,
                              borderWidth: 1,
                              color: 'black',
                              borderRadius: 5,
                            }}
                            multiline={true}
                            value={UpName}
                            onChangeText={text => {
                              setUpName(text);
                            }}
                          />

                          <Text
                            style={{
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Price:{' '}
                          </Text>

                          <TextInput
                            style={{
                              height: 35,
                              // margin: 12,
                              width: 300,
                              borderWidth: 1,
                              color: 'black',
                              borderRadius: 5,
                            }}
                            multiline={true}
                            value={`${UpPrice}`}
                            onChangeText={text => {
                              setUpPrice(text);
                            }}
                          />

                          <Text
                            style={{
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Spice:{' '}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={() => {
                                setSpiceInfo(1);
                              }}
                              style={{
                                borderWidth: SpiceInfo == 1 ? 2 : 0,
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
                                setSpiceInfo(2);
                              }}
                              style={{
                                borderWidth: SpiceInfo == 2 ? 2 : 0,
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
                                setSpiceInfo(3);
                              }}
                              style={{
                                borderWidth: SpiceInfo == 3 ? 2 : 0,
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
                                setSpiceInfo(4);
                              }}
                              style={{
                                borderWidth: SpiceInfo == 4 ? 2 : 0,
                                height: 45,
                                width: 45,
                                borderColor: 'black',
                                marginLeft: 20,
                                justifyContent: 'center',
                              }}>
                              <Image
                                source={require('../assets/nochilli.png')}
                                style={{
                                  height: 40,
                                  width: 40,
                                  alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                          </View>

                          <Text
                            style={{
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Veg/Non-Veg:{' '}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={() => {
                                setVegInfo(1);
                              }}
                              style={{
                                borderWidth: VegInfo == 1 ? 2 : 0,
                                height: 40,
                                width: 45,
                                borderColor: 'black',
                              }}>
                              <Image
                                source={require('../assets/veg.png')}
                                style={{
                                  height: 35,
                                  width: 35,
                                  alignSelf: 'center',
                                }}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => {
                                setVegInfo(2);
                              }}
                              style={{
                                borderWidth: VegInfo == 2 ? 2 : 0,
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
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Description:{' '}
                          </Text>
                          <TextInput
                            style={{
                              height: 35,
                              // margin: 12,
                              width: 300,
                              borderWidth: 1,
                              color: 'black',
                              borderRadius: 5,
                            }}
                            multiline={true}
                            value={UpDesc}
                            onChangeText={text => {
                              setUpDesc(text);
                            }}
                          />

                          <Text
                            style={{
                              marginTop: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Ingredients:{' '}
                          </Text>
                          <TextInput
                            style={{
                              height: 35,
                              // margin: 12,
                              width: 300,
                              borderWidth: 1,
                              color: 'black',
                              borderRadius: 5,
                            }}
                            multiline={true}
                            value={UpIngred}
                            onChangeText={text => {
                              setUpIngred(text);
                            }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={UpdateItem}
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
                            // setBackFlag(false);
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
                      <View style={{marginLeft: 10}}></View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
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
                onChangeText={text => setName(text)}
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

              <Text
                style={{
                  color: 'black',
                  marginLeft: 10,
                  marginTop: 5,
                  fontWeight: 'bold',
                }}>
                Ingredients
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
                onChangeText={text => setIngred(text)}
                placeholder="Ingredients"
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
                  setAddFlag(false);
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
    </View>
  );
};

export default Menu1;

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
