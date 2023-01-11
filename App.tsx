import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import HomeScreen from './app/screens/HomeScreen';
import MapScreen from './app/screens/MapScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './app/types/navigationTypes';
import { isIos } from './app/platforms';

export const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={isIos ? 'padding' : 'height'}
            keyboardVerticalOffset={isIos ? -64 : 0}>
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
