import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import Modal from 'react-native-modal';
import {exportvalues} from '../contextApi/ContextTab';
import {Button} from 'react-native-paper';

const MenuModal = () => {
  const {menuModalIsOpen, setMenuModalIsOpen} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {Rest, setRest} = useContext(exportvalues);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  //   console.log('menuModalIsOpen is', menuModalIsOpen);

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
            // width: 300,
            // alignSelf: 'flex-start',
            // height: 1000,
            marginLeft: 120,
            marginRight: -50,
          }}>
          <View style={{marginBottom: 0}} showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: windowWidth - 150,
                height: 350,
                backgroundColor: 'white',
                // padding: 35,
                // marginRight: -50,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text>{'\n'}</Text>

              <Text style={{color: 'black'}}>{Brand.brand}</Text>
              <Text style={{color: 'black'}}>{Rest.restaurant}</Text>
              <Text>{'\n'}</Text>

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
                onPress={() => console.log('Pressed')}>
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
