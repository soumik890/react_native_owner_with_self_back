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
import {Button} from 'react-native-paper';

function Rest({data}) {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const {UserID} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  let user = parseInt(UserID);
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  const [Img, setImg] = useState();
  const {actionR, setactionR} = useContext(exportvalues);
  // const {Brand, setBrand} = useContext(exportvalues);

  const [Tray, setTray] = useState({});

  useEffect(() => {
    apiAxios1('rest', {
      user_id: user,
      action: 'read',
      // brandid: Brand.brandid,
      brand_id: data.brand_id,
    }).then(res => {
      setTypes(res?.data);
      // setRestCounter(res.data.length);
    });
  }, [actionR, Brand]);

  const UpdateType = item => {
    setUpdateId(item?.restaurant_id);
    setUpType(item?.restaurant);
    setImg(item?.restaurant_image);
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const UpdateTypeName = () => {
    apiAxios1('rest', {
      action: 'update',
      restaurant: UpType,
      restaurant_image: Img,
      restaurant_id: UpdateId,
    }).then(res => {
      console.log(res.data);
      setactionR(!actionR);
      setUpdateId(null);
    });
  };

  // console.log('device height', DeviceHeight);

  // const AddType = () => {
  //   setAddFlag(true);
  // };

  // const submitType = () => {
  //   console.log(Name);
  //   apiAxios1('rest', {
  //     rest: Name,
  //     userid: user,
  //     plan_id: 4,
  //     brandid: data.brandid,
  //     RImage: 'null',
  //     notes: 'nill',
  //     favourite: 0,
  //     status1: 1,
  //     rank1: 1,
  //     cUser: user,
  //     action: 'create',
  //   }).then(res => {
  //     console.log(res.data.status);
  //     setactionR(!actionR);
  //   });
  // };

  const deleteType = item => {
    console.log(item);
    apiAxios1('rest', {
      action: 'delete',
      restaurant_id: item?.restaurant_id,
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setactionR(!actionR);
    });
  };

  const RestSelector = item => {
    setRest(item);
    // console.log(
    //   '***************************************************item in rest selector',
    //   item,
    // );
    setBrand(data);
    navigation.navigate('menuType', {data: item, brandInfo: data});
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
              Do you want to delete this Restaurant : {DeleteItem?.rest}?
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
                margin: 5,
              }}>
              This action will delete all data related to this Restaurant :{' '}
              {DeleteItem?.restaurant} !!
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
                // borderWidth: 2,
                // borderColor: 'red',
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

      // style={{marginTop: -140}}
      >
        {AddFlag == false ? (
          Types.map((item, index) => {
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() => {
                  RestSelector(item);
                }}
                style={{
                  marginTop: 10,
                  // marginLeft: 10,
                  marginBottom: 10,
                  width: '80%',
                  // width: DeviceWidth - 80,
                  // backgroundColor: '#38b05f',
                  backgroundColor: 'white',
                  // elevation: 15,
                  borderRadius: 5,
                  alignSelf: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <View>
                    {item.restaurant_image !== 'null' ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('upload', {
                            page: 'rest',
                            data: item,
                          });
                        }}>
                        <Image
                          source={{uri: item.restaurant_image}}
                          style={{
                            width: 35,
                            height: 35,
                            marginLeft: 10,
                            borderRadius: 5,
                          }}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('upload', {
                            page: 'rest',
                            data: item,
                          });
                        }}>
                        <Image
                          source={require('../assets/noimg.png')}
                          style={{width: 35, height: 35, marginLeft: 10}}
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
                        fontSize: 10,
                      }}>
                      {data.brand}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: 12,
                      }}>
                      {item.restaurant}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    marginLeft: 210,
                    marginTop: 10,
                  }}>
                  {/* <TouchableOpacity
                    onPress={() => {
                      traySelector(item);
                    }}>
                    <Image
                      source={require('../assets/ham4.png')}
                      style={{
                        width: 10,
                        height: 40,
                        marginLeft: 20,
                        // borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity> */}
                </View>

                {UpdateId == item?.restaurant_id ? (
                  <View style={{marginTop: 15}}>
                    <View>
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            marginBottom: 10,
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          Restaurant
                        </Text>
                        <TextInput
                          style={{
                            height: 35,
                            width: 300,
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
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        onPress={UpdateTypeName}
                        style={{
                          // marginLeft: 200,
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
                          Save
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          width: 50,
                          height: 25,
                          backgroundColor: '#ec8c8c',
                          borderRadius: 5,
                          alignContent: 'center',
                          justifyContent: 'center',
                          marginLeft: 20,
                        }}
                        onPress={() => {
                          setUpdateId(null);
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View>
                    {Tray == item ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'flex-end',
                          // marginLeft: 10,
                          // marginRight: 20,
                          alignSelf: 'center',
                          marginBottom: 10,
                        }}>
                        <Button
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
                          }}
                          mode="contained"
                          color="#fc5d4a"
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
                            width: 80,
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
                            width: 80,
                            alignSelf: 'center',
                            height: 20,
                            marginBottom: 10,
                          }}
                          mode="contained"
                          color="pink"
                          onPress={() => {
                            setTray({});
                          }}>
                          cancel
                        </Button>
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
                Add new restaurant
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
            {/* <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
            </View> */}
          </View>
        )}
      </ScrollView>
      {/* <View style={styles.bottomView} keyboardShouldPersistTaps={'always'}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('brand');
          }}
          style={{
            backgroundColor: '#4c6aff',
            position: 'absolute',
            height: 40,
            justifyContent: 'center',
            width: DeviceWidth - 20,
            alignSelf: 'center',
            borderRadius: 5,
            marginTop: 700,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            BACK TO MY BRANDS
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default Rest;

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
