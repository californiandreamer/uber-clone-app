import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { defaultActiveOpacity } from '../constants/values';

type FavoritePlacesPropsType = {
  onPress: (
    location: { lat: number; lng: number },
    destination: string,
  ) => void;
};

type FavoritePlacesType = {
  id: string;
  icon: string;
  location: { lat: number; lng: number };
  destination: string;
  name: string;
};

const FavoritePlaces = ({ onPress }: FavoritePlacesPropsType) => {
  const favoritePlaces: FavoritePlacesType[] = [
    {
      id: '1',
      icon: 'home',
      name: 'Home',
      destination: 'Lisa-Kuli, Marki, Poland',
      location: { lat: 52.3202468, lng: 21.1194858 },
    },
    {
      id: '2',
      icon: 'briefcase',
      name: 'Work',
      destination: 'Jana Pawła, Warsaw, Poland',
      location: { lat: 52.2452495, lng: 20.9908202 },
    },
  ];

  return (
    <FlatList
      data={favoritePlaces}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { id, location, name, destination, icon } }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          activeOpacity={defaultActiveOpacity}
          key={id}
          onPress={() => onPress(location, destination)}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{name}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default FavoritePlaces;

const styles = StyleSheet.create({});
