import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { Stack } from '../../App';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { defaultActiveOpacity } from '../constants/values';
import { HomeScreenNavigatorProp, ScreenNames } from '../types/navigationTypes';

const MapScreen = () => {
  const navigation = useNavigation<HomeScreenNavigatorProp>();

  return (
    <View>
      <TouchableOpacity
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        activeOpacity={defaultActiveOpacity}
        onPress={() => navigation.navigate(ScreenNames.HomeScreen)}>
        <Icon name="menu" />
      </TouchableOpacity>
      <View style={{ height: '50%' }}>
        <Map />
      </View>
      <View style={{ height: '50%' }}>
        <Stack.Navigator>
          <Stack.Screen
            name={ScreenNames.NavigateCard}
            component={NavigateCard}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ScreenNames.RideOptionsCard}
            component={RideOptionsCard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
