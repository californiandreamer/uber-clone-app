import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigatorProp, ScreenNames } from '../types/navigationTypes';
import { Icon } from 'react-native-elements';
import { imagesBaseLink } from '../constants/api';
import { CHARGE_RATE, defaultActiveOpacity } from '../constants/values';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navigationReducer';
import { isIos } from '../platforms';

type RideOptionsType = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
};

const RideOptionsCard = () => {
  const rideOptions: RideOptionsType[] = [
    {
      id: '1',
      title: 'UberX',
      multiplier: 1,
      image: `${imagesBaseLink}/3pn`,
    },
    {
      id: '2',
      title: 'Uber XL',
      multiplier: 1.2,
      image: `${imagesBaseLink}/5w8`,
    },
    {
      id: '3',
      title: 'Uber Black',
      multiplier: 1.75,
      image: `${imagesBaseLink}/7pf`,
    },
  ];

  const navigation = useNavigation<HomeScreenNavigatorProp>();
  const [selectedRideOption, setSelectedRideOption] =
    useState<RideOptionsType | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`bg-white flex-1 rounded-2xl`}>
      <View style={tw`justify-center items-center py-3`}>
        {/* <View style={tw`h-1.5 w-16 bg-gray-400 rounded-2xl`} /> */}
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate(ScreenNames.NavigateCard)}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center pt-5 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={rideOptions}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            style={tw`flex-row justify-between items-center px-5 ${
              id === selectedRideOption?.id ? 'bg-gray-200' : ''
            }`}
            activeOpacity={defaultActiveOpacity}
            onPress={() => setSelectedRideOption(item)}>
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
              }}
              source={{ uri: image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl font-medium`}>
              {travelTimeInformation?.duration?.value && isIos
                ? new Intl.NumberFormat('pl-PL', {
                    style: 'currency',
                    currency: 'PLN',
                  }).format(
                    (travelTimeInformation?.duration?.value *
                      CHARGE_RATE *
                      multiplier) /
                      100,
                  )
                : '25 zł'}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          style={tw`bg-black py-3 m-3 ${
            !selectedRideOption ? 'bg-gray-300' : ''
          }`}
          activeOpacity={defaultActiveOpacity}
          disabled={!selectedRideOption}>
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selectedRideOption?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
