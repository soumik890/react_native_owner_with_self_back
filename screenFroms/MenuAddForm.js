import {View, Text} from 'react-native';
import React, {useState} from 'react';

const MenuAddForm = () => {
  return (
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
          onPress={{}}
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
  );
};

export default MenuAddForm;
