import React from 'react';
import LoginScreen from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContextTab from './contextApi/ContextTab';
import MenuType from './screens/menutype';
import Menu from './screens/menu';
import Brand from './screens/Brand';
import Rest from './screens/Rest';
import Cat from './screens/cat';
import Upload from './screens/Upload';
import Publish from './screens/publish';
import {MenuProvider} from 'react-native-popup-menu';
import menuModal from './screens/menuModal';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <MenuProvider>
        <ContextTab>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="cat"
              component={Cat}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="menuType"
              component={MenuType}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="menu"
              component={Menu}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="brand"
              component={Brand}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="rest"
              component={Rest}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="upload"
              component={Upload}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="publish"
              component={Publish}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="menumodal"
              component={menuModal}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ContextTab>
      </MenuProvider>
    </NavigationContainer>
  );
};

export default App;
