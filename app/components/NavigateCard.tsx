import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  GooglePlacesAutocomplete,
  Styles,
} from 'react-native-google-places-autocomplete';
import { setDestination } from '../slices/navigationReducer';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigatorProp, ScreenNames } from '../types/navigationTypes';
import FavoritePlaces from './FavoritePlaces';
import { Icon } from 'react-native-elements';
import { defaultActiveOpacity } from '../constants/values';
import { GOOGLE_MAPS_API_KEY } from '../constants/api';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigatorProp>();

  const onFavoritePlacePress = (
    location: { lat: number; lng: number },
    destination: string,
  ) => {
    console.log('favorite destination', location, destination);

    dispatch(
      setDestination({
        location,
        description: destination,
      }),
    );

    navigation.navigate(ScreenNames.RideOptionsCard);
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Nazar</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={inputBoxStyles}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            keepResultsAfterBlur={true}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: 'en',
            }}
            onPress={(data, details = null) => {
              console.log('desc', data.description);
              console.log('details', details?.geometry.location);

              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                }),
              );

              navigation.navigate(ScreenNames.RideOptionsCard);
            }}
          />
        </View>

        <FavoritePlaces onPress={onFavoritePlacePress} />

        <View
          style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
          <TouchableOpacity
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
            activeOpacity={defaultActiveOpacity}
            onPress={() => navigation.navigate(ScreenNames.RideOptionsCard)}>
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row justify-between w-20 px-4 py-3 rounded-full`}
            activeOpacity={defaultActiveOpacity}>
            <Icon
              name="fast-food-outline"
              type="ionicon"
              color="black"
              size={16}
            />
            <Text style={tw`text-center`}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
