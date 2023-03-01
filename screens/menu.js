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

const Menu = () => {
  const navigation = useNavigation();

  const [DispMenu, setDispMenu] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
  const [Name, setName] = useState();
  const [Desc, setDesc] = useState();
  const [Price, setPrice] = useState();
  // const [Spice, setSpice] = useState();
  const [Ingred, setIngred] = useState();
  const [UpName, setUpName] = useState();
  const [UpDesc, setUpDesc] = useState();
  const [UpPrice, setUpPrice] = useState();
  // const [UpSpice, setUpSpice] = useState();
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

  const [BackFlag, setBackFlag] = useState(false);

  const [AddSpice, setAddSpice] = useState(4);
  const [AddVeg, setAddVeg] = useState(1);

  useEffect(() => {
    apiAxios1('menu', {
      userid: user,
      restid: Rest.restid,
      brandid: Brand.brandid,
      mtid: MenuType.mtid,
      action: 'read',
    }).then(Response => {
      // if (Response?.data?.status) {
      //   setDispMenu(Response?.data?.data);
      // }

      setDispMenu(Response?.data);
    });
  }, [AddFlag, action, Rest, MenuType]);

  const AddMenu = () => {
    setAddFlag(true);
    setBackFlag(true);
  };
  const UpdateMenu = item => {
    setBackFlag(true);
    setUpdateId(item?.menuid);
    setUpName(item?.menu);
    setUpDesc(item?.description);
    setUpPrice(item?.price);
    setSpiceInfo(item?.spice);
    setVegInfo(item?.veg);
    setUpIngred(item?.ingredients);
  };

  const submitMenu = () => {
    console.log(
      MenuType.mtid,
      Brand.brandid,
      Rest.restid,
      Cat.catid,
      user,
      AddVeg,
      AddSpice,
      Price,
      Desc,
      Ingred,
    );
    apiAxios1('menu', {
      menu: Name,
      mtid: MenuType.mtid,
      brandid: Brand.brandid,
      restid: Rest.restid,
      catid: Cat.catid,
      userid: user,
      notes: 'blah',
      MImage: 'Demo image',
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
      setaction(!action);
      setAddFlag(false);
      setBackFlag(false);
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
      // xversion: 'hRs6',
      // xuserid: user,
      // xaction: 'menu_item_delete',
      // RestaurantId: Rest.Id,
      // Id: item?.Id,
      // TypeId: MenuType.Id,

      menuid: item.menuid,
      action: 'delete',
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setaction(!action);
    });
  };

  const UpdateItem = () => {
    // console.log('Veg info is', VegInfo);
    apiAxios1('menu', {
      // xversion: 'hRs6',
      // xuserid: user,
      // xaction: 'menu_item_update',
      // RestaurantId: Rest.Id,
      // TypeId: MenuType.Id,
      // CatId: 1,
      // SpiceId: SpiceInfo,
      // VegId: VegInfo,
      // Name: UpName,
      // Price: UpPrice,
      // DiscountTye: 'amount or percent',
      // DiscountValue: '22',
      // Ingredients: UpIngred,
      // Id: UpdateId,
      // Description: UpDesc,
      // Rank: '5',
      // Status: '1',

      menu: UpName,
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
      setBackFlag(false);
      setaction(!action);
    });
  };

  console.log(DispMenu);
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
            borderRadius: 10,
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
                borderRadius: 10,
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
                // setBackFlag(false);
              }}
              style={{
                marginLeft: 50,
                width: 60,
                height: 20,
                // backgroundColor: 'yellow',
                borderRadius: 10,
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
          backgroundColor: '#62982d',
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
          MENU
        </Text>

        {AddFlag == false ? (
          <View
            style={{marginTop: 2, alignSelf: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={AddMenu}
              style={{
                marginLeft: 150,
              }}>
              <Image
                source={require('../assets/add-icon.jpeg')}
                style={{height: 30, width: 35}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={{
                marginLeft: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#f84200',
                  height: 30,
                  width: 90,
                  borderRadius: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                  }}>
                  PUBLISH QR
                </Text>
              </View>
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

      <View>
        <ScrollView
          horizontal={true}
          style={{
            flexDirection: 'row',
            backgroundColor: '#d0d0d0',
            height: 30,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#d0d0d0',
              height: 25,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Menu Type : {MenuType?.menutype}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: 20,
              }}>
              Category : {Cat?.cat}
            </Text>
          </View>
        </ScrollView>
      </View>

      <ScrollView
        style={{marginBottom: 50}}
        keyboardShouldPersistTaps={'always'}>
        {AddFlag == false ? (
          DispMenu.map((item, index) => {
            return (
              <View>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    marginTop: 10,
                    // marginLeft: 30,
                    // marginLeft: 10,
                    marginBottom: 10,
                    width: DeviceWidth - 40,
                    backgroundColor: '#ffffff',
                    elevation: 15,
                    borderRadius: 20,
                    alignSelf: 'center',
                    // marginBottom: UpdateId == item?.Id ? 350 : 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      // justifyContent: 'flex-end',
                      marginLeft: 250,
                      marginTop: 10,
                      marginBottom: -30,
                      marginRight: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        // deleteMenu(item);
                        ButtonAlert(item);
                      }}>
                      <Image
                        source={require('../assets/del.png')}
                        style={{width: 20, height: 25}}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        marginLeft: 30,
                      }}
                      onPress={() => {
                        UpdateMenu(item);
                      }}>
                      <Image
                        source={require('../assets/edit.png')}
                        style={{width: 25, height: 25}}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: 30}}>
                    <View>
                      {/* <Text>{item.Id}</Text> */}
                      <Image
                        // source={require('../assets/MT.png')}
                        source={{uri: item.Image}}
                        style={{width: 100, height: 100, marginLeft: 10}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('upload', {data: item});
                        }}>
                        <Image
                          source={require('../assets/imgedit.png')}
                          style={{width: 20, height: 20, marginLeft: 50}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Name:
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {item?.menu}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Price:{' '}
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {item?.price}
                        </Text>
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Spice:{' '}
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
                                ? 20
                                : item?.spice == 2
                                ? 34
                                : item?.spice == 3
                                ? 48
                                : 20,
                            height: 20,
                          }}
                        />
                      </Text>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Veg/Non-Veg:{' '}
                        <Image
                          source={
                            item?.veg == 1
                              ? require('../assets/veg.png')
                              : require('../assets/nonveg.png')
                          }
                          style={{
                            width: 20,
                            height: 20,
                          }}
                        />
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
                              borderRadius: 10,
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
                              borderRadius: 10,
                            }}
                            multiline={true}
                            value={UpPrice}
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
                              borderRadius: 10,
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
                              borderRadius: 10,
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
                            setBackFlag(false);
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
                          Description:{' '}
                          <Text
                            style={{
                              marginBottom: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item?.description}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          Ingredients:{' '}
                          <Text
                            style={{
                              marginBottom: 10,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            {item?.ingredients}
                          </Text>
                        </Text>
                      </View>
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
                  setBackFlag(false);
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
        {!BackFlag ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('cat');
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
              BACK TO CATEGORIES
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Menu;

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
