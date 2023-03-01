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
  const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const {UserID} = useContext(exportvalues);
  const user = parseInt(UserID);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const {Brands, setBrands} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();

  const DeviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    apiAxios1('brand', {
      userid: user,
      action: 'read',
    }).then(res => {
      console.log(res.data);
      setBrands(res?.data);
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
      BImage: 'blahblah',
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
          MY BRANDS
        </Text>

        {AddFlag == false ? (
          <View style={{marginTop: 2, alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={AddType}
              style={{
                marginLeft: 190,
              }}>
              <Image
                source={require('../assets/add-icon.jpeg')}
                style={{height: 30, width: 35}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
      <ScrollView
        style={{marginBottom: 50}}
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
                  backgroundColor: '#ffffff',
                  elevation: 15,
                  borderRadius: 20,

                  // marginBottom: UpdateId == item?.Id ? 50 : 0,
                }}>
                <View>
                  <View style={{flexDirection: 'row', marginTop: 10}}>
                    <View>
                      <Image
                        source={require('../assets/brand.png')}
                        style={{width: 100, height: 100, marginLeft: 10}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('upload');
                        }}>
                        <Image
                          source={require('../assets/imgedit.png')}
                          style={{width: 20, height: 20, marginLeft: 50}}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', marginLeft: 160}}>
                      <TouchableOpacity
                        // onPress={() => {
                        //   deleteType(item);
                        // }}
                        onPress={() => {
                          ButtonAlert(item);
                        }}>
                        <Image
                          source={require('../assets/del.png')}
                          style={{width: 25, height: 30}}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          marginLeft: 30,
                        }}
                        onPress={() => {
                          UpdateType(item);
                        }}>
                        <Image
                          source={require('../assets/edit.png')}
                          style={{width: 30, height: 30}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View></View>
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
                              borderRadius: 10,
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
                    <View style={{marginLeft: 10, flexDirection: 'row'}}>
                      <Text
                        style={{
                          marginBottom: 10,
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Brand :{' '}
                        <Text style={{color: '#0d47a1', fontWeight: 'bold'}}>
                          {item?.brand}
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
