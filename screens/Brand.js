import React, {useEffect, useState, useContext} from 'react';
// import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  // TextInput,
  Dimensions,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LogoTitle from './LogoTitle';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';
import Modal from 'react-native-modal';
// import RestDrop from './RestDrop';
import Rest from './Rest';
import {Button, TextInput} from 'react-native-paper';
import PlanForm from '../screenFroms/PlanForm';
import {Dropdown} from 'react-native-element-dropdown';

function Brand() {
  const navigation = useNavigation();
  const [Types, setTypes] = useState([]);
  const [AddFlag, setAddFlag] = useState(false);
  const [AddRestFlag, setAddRestFlag] = useState(false);
  const [UpdateId, setUpdateId] = useState(null);
  // const [action, setaction] = useState(false);
  const [UpType, setUpType] = useState('');
  const [Name, setName] = useState('');
  const [RName, setRName] = useState('');
  const {UserID} = useContext(exportvalues);
  const user = parseInt(UserID);
  const {actionB, setactionB} = useContext(exportvalues);
  const {actionR, setactionR} = useContext(exportvalues);
  // const {Rest, setRest} = useContext(exportvalues);
  const {Brands, setBrands} = useContext(exportvalues);
  const [isOpen, setIsOpen] = useState(false);
  const [DeleteItem, setDeleteItem] = useState();
  const [Img, setImg] = useState();
  const [Tray, setTray] = useState({});

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  const {plan, setPlan} = useContext(exportvalues);

  const {brandCounter, setBrandCounter} = useContext(exportvalues);

  const DeviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    apiAxios1('brand', {
      user_id: user,
      action: 'read',
    }).then(res => {
      console.log('brand read data', res.data);
      setBrands(res?.data);
      setTypes(res?.data);
      setBrandCounter(res.data.length);
    });
  }, [actionB]);

  const UpdateType = item => {
    console.log('item at update', item);
    setUpdateId(item?.brand_id);
    setUpType(item?.brand);
    setImg(item?.brand_image);
  };

  const ButtonAlert = item => {
    console.log(item);
    setDeleteItem(item);
    setIsOpen(true);
  };

  const UpdateTypeName = () => {
    apiAxios1('brand', {
      user_id: user,
      action: 'update',
      brand: UpType,
      brand_image: Img,
      brand_id: UpdateId,
    }).then(res => {
      console.log(res.data);
      setactionB(!actionB);
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
      brand_image: 'null',
      user_id: user,
      rank_order: 1,
      c_user: user,
      is_active: 1,
      action: 'create',
    }).then(res => {
      console.log(res.data.status);
      setAddFlag(false);
      setactionB(!actionB);
    });
  };

  const deleteType = item => {
    console.log(item);
    apiAxios1('brand', {
      user_id: user,
      action: 'delete',
      brand_id: item?.brand_id,
    }).then(res => {
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
      console.log(res.data);
      setIsOpen(false);
      setactionB(!actionB);
    });
  };

  // const traySelector = item => {
  //   console.log('item in tray', item);
  //   setTray(item);
  //   setBrand(item);
  // };

  const AddRest = () => {
    setAddRestFlag(true);
  };

  const submitRest = () => {
    if (value !== 0) {
      // console.log('restaurant name at submit rest', RName);
      apiAxios1('rest', {
        restaurant: RName,
        user_id: user,
        plan_id: plan,
        plan_name: 'refer plan id',
        menu_license_id: 41,
        notes: 'nill',
        favourite: 0,
        is_active: 1,
        rank_order: 1,
        // brand_id: Brand.brand_id,
        brand_id: value,
        restaurant_image: 'null',
        action: 'create',
      }).then(res => {
        console.log('response at value not zero', res.data);
        setAddRestFlag(false);
        setactionR(!actionR);
      });
    } else {
      apiAxios1('brand', {
        brand: Name,
        brand_image: 'null',
        user_id: user,
        rank_order: 1,
        c_user: user,
        is_active: 1,
        action: 'create',
      }).then(res => {
        // console.log(res.data.status);
        // setAddRestFlag(false);
        // setactionB(!actionB);
        apiAxios1('rest', {
          restaurant: RName,
          user_id: user,
          plan_id: plan,
          plan_name: 'refer plan id',
          menu_license_id: 41,
          notes: 'nill',
          favourite: 0,
          is_active: 1,
          rank_order: 1,
          brand_id: res.data[0].brand_id,
          restaurant_image: 'null',
          action: 'create',
        }).then(res => {
          console.log(res.data);
          setAddRestFlag(false);
          setactionB(!actionB);
          setactionR(!actionR);
        });
      });
    }
  };

  const data = [{label: 'Add new brand', value: 0}];

  // console.log('brands are', Brands);

  Brands.map(item => {
    data.push({label: item.brand, value: item.brand_id});
  });

  return (
    <View style={{backgroundColor: '#f2f2f2'}}>
      {/* delete modal */}

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
      </Modal>

      {/* Restaurant add modal */}

      <Modal
        useNativeDriver={true}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        onBackButtonPress={() => setAddRestFlag(false)}
        onBackdropPress={() => {
          setAddRestFlag(false);
        }}
        isVisible={AddRestFlag}>
        <View
          style={{
            // width: 320,
            width: '90%',
            // height: 230,
            backgroundColor: 'white',
            alignSelf: 'center',
            borderWidth: 3,
            borderColor: '#f48225',
            borderRadius: 5,
            // marginBottom: 10,
          }}>
          <View
            style={{
              height: 40,
              backgroundColor: '#f48225',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                alignSelf: 'center',
              }}>
              Add a New Restaurent
            </Text>
          </View>

          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            // maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Brand' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />

          {value == 0 ? (
            <View style={{marginTop: 5}}>
              <TextInput
                mode="outlined"
                label="Brand Name"
                placeholder="Brand Name"
                textColor={'red'}
                style={{
                  height: 35,
                  width: '90%',
                  alignSelf: 'center',
                  fontSize: 12,
                }}
                theme={{
                  colors: {
                    text: 'black',
                    primary: 'orange',
                    onSurfaceVariant: 'green',
                  },
                  fontSize: {text: 12},
                }}
                onChangeText={text => setName(text)}
              />
            </View>
          ) : (
            <View></View>
          )}

          <View style={{marginTop: 5}}>
            <TextInput
              mode="outlined"
              label="Restaurant Name"
              placeholder="Restaurant Name"
              textColor={'red'}
              style={{
                height: 35,
                width: '90%',
                alignSelf: 'center',
                fontSize: 12,
              }}
              theme={{colors: {text: 'black', primary: 'orange'}}}
              onChangeText={text => setRName(text)}
            />
          </View>

          <PlanForm />

          <View>
            <View style={{flexDirection: 'row', marginLeft: 80, marginTop: 20}}>
              <TouchableOpacity
                onPress={submitRest}
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
                  setAddRestFlag(false);
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

      <LogoTitle />

      <View
        style={{
          width: DeviceWidth,
          // backgroundColor: '#62982d',
          backgroundColor: '#f5d378',
          // backgroundColor: '#b7b7b7',

          height: 40,
          flexDirection: 'row',
          // flex: 1,
        }}>
        <Text
          style={{
            color: '#574d0d',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'center',
            marginLeft: 20,
          }}>
          DASHBOARD
        </Text>

        <View
          style={{
            marginTop: -1,
            alignSelf: 'center',
            position: 'absolute',
            flex: 1,
          }}>
          <TouchableOpacity
            // onPress={AddType}
            onPress={AddRest}
            style={{
              marginLeft: 260,
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
                Restaurants
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
      </View>
      <ScrollView
        style={{marginBottom: 10}}
        keyboardShouldPersistTaps={'always'}>
        {Types.map((item, index) => {
          return (
            <View
              style={{
                borderRadius: 5,
                marginTop: 10,
              }}>
              <View style={{flex: 1}}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    // marginBottom: 10,
                  }}></View>
              </View>

              {UpdateId == item?.brand_id ? (
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
                            marginTop: 5,
                          }}>
                          <TouchableOpacity
                            onPress={UpdateTypeName}
                            style={{
                              // marginLeft: 250,
                              width: 60,
                              height: 25,
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
                                fontWeight: 'bold',
                                fontSize: 12,
                              }}>
                              Save
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              marginLeft: 10,
                              width: 50,
                              height: 25,
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
                                fontSize: 12,
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
                  {Tray == item ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginBottom: 10,
                        marginTop: 5,
                      }}>
                      <Button
                        labelStyle={{
                          fontSize: 8,
                          marginTop: 4,
                          marginBottom: 5,
                        }}
                        style={{
                          width: 100,
                          alignSelf: 'center',
                          height: 20,
                          marginBottom: 10,
                        }}
                        mode="contained"
                        color="#fc5d4a"
                        onPress={() => {
                          ButtonAlert(item);
                        }}>
                        Delete Brand
                      </Button>

                      <Button
                        labelStyle={{
                          fontSize: 8,
                          marginTop: 4,
                          marginBottom: 5,
                        }}
                        style={{
                          width: 120,
                          alignSelf: 'center',
                          height: 20,
                          marginBottom: 10,
                          marginLeft: 5,
                          marginRight: 5,
                        }}
                        mode="contained"
                        color="pink"
                        onPress={() => {
                          AddRest();
                        }}>
                        Add restaurant{' '}
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
                          // marginBottom: 10,
                        }}
                        mode="contained"
                        color="skyblue"
                        onPress={() => {
                          UpdateType(item);
                        }}>
                        edit
                      </Button>
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <View>
                    <Rest data={item} />
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Brand;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 12,
  },
  dropdown: {
    height: 30,
    width: '90%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'red',
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 15,
    height: 15,
  },
  inputSearchStyle: {
    height: 35,
    fontSize: 12,
  },
});
