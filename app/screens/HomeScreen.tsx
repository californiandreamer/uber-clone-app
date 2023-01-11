import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ServiceOptions from '../components/ServiceOptions';
import { GOOGLE_MAPS_API_KEY, imagesBaseLink } from '../constants/api';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { setDestination, setOrigin } from '../slices/navigationReducer';
import FavoritePlaces from '../components/FavoritePlaces';

const HomeScreen = () => {
  const dispatch = useDispatch<Dispatch>();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={styles.logoImage}
          source={{
            uri: `${imagesBaseLink}/gzs`,
          }}
        />

        <GooglePlacesAutocomplete
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          enablePoweredByContainer={false}
          fetchDetails={true}
          minLength={2}
          placeholder="Where from?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          keepResultsAfterBlur={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              }),
            );

            dispatch(setDestination(null));
          }}
        />
      </View>
      <ServiceOptions />
      {/* <FavoritePlaces /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
