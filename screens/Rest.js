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

function Rest() {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  const [action, setaction] = useState(false);
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

  useEffect(() => {
    apiAxios1('rest', {
      userid: user,
      action: 'read',
      brandid: Brand.brandid,
    }).then(res => {
      // if (res?.data?.status) {
      //   console.log('Rests are', res.data.data);
      //   setTypes(res?.data?.data);
      // }
      setTypes(res?.data);
    });
  }, [action, Brand]);

  const UpdateType = item => {
    setUpdateId(item?.restid);
    setUpType(item?.rest);
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const UpdateTypeName = () => {
    apiAxios1('rest', {
      action: 'update',
      rest: UpType,
      restid: UpdateId,
    }).then(res => {
      console.log(res.data);
      setaction(!action);
      setUpdateId(null);
    });
  };

  // console.log('device height', DeviceHeight);

  const AddType = () => {
    setAddFlag(true);
  };

  const submitType = () => {
    console.log(Name);
    apiAxios1('rest', {
      rest: Name,
      userid: user,
      brandid: Brand.brandid,
      RImage: 'demo url',
      notes: 'nill',
      favourite: 0,
      status1: 1,
      rank1: 1,
      cUser: user,
      action: 'create',
    }).then(res => {
      console.log(res.data.status);
      setAddFlag(false);
      setaction(!action);
    });
  };

  const deleteType = item => {
    console.log(item);
    apiAxios1('rest', {
      action: 'delete',
      restid: item?.restid,
    }).then(res => {
      console.log(res.data);
      setIsOpen(false);
      setaction(!action);
    });
  };

  const RestSelector = item => {
    setRest(item);
    navigation.navigate('menuType');
    // console.log(item);
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
              {DeleteItem?.rest} !!
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
            // fontStyle: 'italic',
            fontSize: 20,
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          MY RESTAURANTS
        </Text>

        {AddFlag == false ? (
          <View style={{marginTop: 2, alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={AddType}
              style={{
                marginLeft: 130,
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

      <View style={{backgroundColor: '#b5b5b5', height: 30}}>
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          Brand : {Brand.brand}
        </Text>
      </View>

      <ScrollView style={{marginBottom: 50}}>
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
                  marginLeft: 10,
                  marginBottom: 10,
                  width: DeviceWidth - 20,
                  // height: 150,
                  backgroundColor: '#ffffff',
                  elevation: 15,
                  borderRadius: 20,
                  // marginBottom: UpdateId == item?.Id ? 50 : 0,
                  // marginBottom: 10,
                }}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <View>
                    <Image
                      source={require('../assets/rest.png')}
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
                      onPress={() => {
                        // deleteType(item);
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

                {UpdateId == item?.restid ? (
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
                            width: 350,
                            borderWidth: 1,
                            color: 'black',
                            borderRadius: 10,
                          }}
                          multiline={true}
                          onChangeText={text => setUpType(text)}
                          value={UpType}
                        />
                      </View>
                    </View>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                        Restaurant :{' '}
                        <Text style={{color: '#33691e', fontWeight: 'bold'}}>
                          {item?.rest}
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
      <View style={styles.bottomView} keyboardShouldPersistTaps={'always'}>
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
            borderRadius: 10,
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
      </View>
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
