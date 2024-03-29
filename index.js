/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider} from 'react-native-paper';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Main() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Main);
