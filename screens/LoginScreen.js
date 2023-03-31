import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/core';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {exportvalues} from '../contextApi/ContextTab';
import apiAxios1 from '../ApiCaller/apiAxios1';
import Snackbar from 'react-native-snackbar';

GoogleSignin.configure({
  webClientId:
    '458668937189-5grpcq7ec805vg2ud387dheksedm8ept.apps.googleusercontent.com',
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const {UserID, setUserID} = useContext(exportvalues);

  const {Email, setEmail} = useContext(exportvalues);

  const {Name, setName} = useContext(exportvalues);

  const {PhotoUrl, setPhotoUrl} = useContext(exportvalues);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(user => {
      if (user) {
        auth().onAuthStateChanged(user => {
          if (user) {
            let email = user.email;
            apiAxios1('users', {
              action: 'createRead',
              email: email,
            }).then(Response => {
              console.log(
                'Login Data£££££££££££££££££££',
                Response.data[0].user_id,
              );
              setEmail(user.email);
              setName(user.displayName);
              setPhotoUrl(user.photoURL);
              setUserID(Response.data[0].user_id);

              Snackbar.show({
                text: 'Logged In Sucessfull',
                duration: Snackbar.LENGTH_SHORT,
              });

              navigation.replace('brand');
            });
          }
        });
      }
    });
    return subscribe;
  }, []);

  const googleIn = async () => {
    const {idToken} = await GoogleSignin.signIn().catch(e => {
      Alert.alert(e.message);
    });

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    await auth()
      .signInWithCredential(googleCredential)
      .then(
        auth().onAuthStateChanged(user => {
          if (user) {
            let email = user.email;
            apiAxios1('users', {
              action: 'createRead',
              email: email,
            }).then(Response => {
              console.log(
                'Login Data@@@@@@@@@@@@@@@@@@@@@@@@@@',
                Response.data[0].user_id,
              );

              setUserID(Response.data[0].user_id);
              Snackbar.show({
                text: 'Logged In Sucessfull',
                duration: Snackbar.LENGTH_SHORT,
              });
              navigation.replace('brand');
            });
          }
        }),
      );
  };

  return (
    <View style={styles.center}>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>
      <View style={styles.center}>
        <Image
          source={require('../assets/logo.png')}
          style={{height: 220, width: 220}}
        />
      </View>
      <Text>{'\n'}</Text>

      <View style={styles.center}>
        <Image
          source={require('../assets/logo1.png')}
          style={{height: 50, width: 250}}
        />
      </View>

      <Text>{'\n'}</Text>
      <Text>{'\n'}</Text>

      <TouchableOpacity
        name="Google SignIn"
        size={24}
        color="black"
        onPress={() => {
          googleIn();
        }}>
        <Image
          style={{width: 250, height: 40}}
          source={require('../assets/google.png')}
        />
      </TouchableOpacity>

      <Text>{'\n'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 50,
    paddingBottom: '10%',
  },
});

export default LoginScreen;
