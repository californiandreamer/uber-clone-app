import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { imagesBaseLink } from '../constants/api';
import { defaultActiveOpacity } from '../constants/values';
import { selectOrigin } from '../slices/navigationReducer';
import {
  HomeScreenNavigatorProp,
  RootStackParamList,
  ScreenNames,
} from '../types/navigationTypes';

type ServiceType = {
  id: string;
  title: string;
  image: string;
  screen: ScreenNames;
};

const ServiceOptions = () => {
  const servicesList: ServiceType[] = [
    {
      id: '1',
      title: 'Get a ride',
      image: `${imagesBaseLink}/3pn`,
      screen: ScreenNames.MapScreen,
    },
    {
      id: '2',
      title: 'Order food',
      image: `${imagesBaseLink}/28w`,
      screen: ScreenNames.HomeScreen,
    },
  ];

  const navigation = useNavigation<HomeScreenNavigatorProp>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      style={styles.list}
      data={servicesList}
      horizontal
      bounces={false}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`]}
          activeOpacity={defaultActiveOpacity}
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}>
          <View style={!origin && tw`opacity-20`}>
            <Image style={styles.buttonImage} source={{ uri: item.image }} />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              color="white"
              name="arrowright"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ServiceOptions;

const styles = StyleSheet.create({
  list: {
    maxHeight: 275,
  },
  buttonImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
});
