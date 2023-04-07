import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Modal from 'react-native-modal';
import {exportvalues} from '../contextApi/ContextTab';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const MenuModal = () => {
  const navigation = useNavigation();

  // const [menuModalIsOpen, setMenuModalIsOpen] = useState(false);
  const {menuModalIsOpen, setMenuModalIsOpen} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  //   console.log('menuModalIsOpen is', menuModalIsOpen);

  const navigator = () => {
    setMenuModalIsOpen(false);

    navigation.navigate('logs', {Rest: Rest, Brand: Brand});
  };

  return (
    <View>
      {/* <Text>menuModal</Text> */}

      <Modal
        useNativeDriver={true}
        animationInTiming={500}
        animationOutTiming={500}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        // animationIn="bounceInUp"
        // animationOut="bounceOutDown"
        onBackButtonPress={() => {
          setMenuModalIsOpen(false);
        }}
        onBackdropPress={() => {
          setMenuModalIsOpen(false);
        }}
        // transparent={true}
        isVisible={menuModalIsOpen}>
        <View
          style={{
            flex: 1,
            marginLeft: 120,
            marginRight: -80,
            marginTop: 31,
          }}>
          <View
            style={{
              width: 250,
              backgroundColor: 'white',
              alignItems: 'center',
              elevation: 5,
              borderRadius: 5,
              // marginBottom: 10,
            }}>
            <View
              style={{
                backgroundColor: 'orange',
                width: '100%',
                borderRadius: 5,
                padding: 5,
                alignSelf: 'center',
                justifyContent: 'center',
                // flex: 1,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: 12,
                }}>
                {Brand.brand}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                }}>
                {Rest.restaurant}
              </Text>
            </View>

            <View style={{margin: 5}}>
              <Button
                // icon="camera"
                mode="contained"
                onPress={() => console.log('Pressed')}>
                User Access{' '}
              </Button>
              <Text>{'\n'}</Text>

              <Button
                // icon="camera"
                mode="contained"
                onPress={() => console.log('Pressed')}>
                Lisences{' '}
              </Button>

              <Text>{'\n'}</Text>

              <Button
                // icon="camera"
                mode="contained"
                onPress={navigator}>
                Logs
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuModal;
