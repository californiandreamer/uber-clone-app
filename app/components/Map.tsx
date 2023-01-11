import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../slices/navigationReducer';
import { MarkerIdentifiersNames } from '../types/mapTypes';
import MapViewDirections from 'react-native-maps-directions';
import { googleMapsApiBaseLink, GOOGLE_MAPS_API_KEY } from '../constants/api';
import { Dispatch } from '@reduxjs/toolkit';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView | null>(null);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current?.fitToSuppliedMarkers(
      [MarkerIdentifiersNames.Origin, MarkerIdentifiersNames.Destination],
      {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      },
    );
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const distanceMatrixUrl = `${googleMapsApiBaseLink}/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&language=en&key=${GOOGLE_MAPS_API_KEY}`;

      fetch(distanceMatrixUrl)
        .then(res => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      style={tw`flex-1`}
      ref={mapRef}
      mapType="mutedStandard"
      initialRegion={
        origin?.location && {
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }
      }>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          identifier={MarkerIdentifiersNames.Origin}>
          <View style={styles.customPinContainer}>
            <View style={styles.roundedPin} />
            <View style={styles.originLabel}>
              <View style={styles.originLabelTime}>
                <Text style={styles.originLabelTimeValue}>3</Text>
                <Text style={styles.originLabelTimeMeasure}>min</Text>
              </View>
              <View style={styles.originLabelAddress}>
                <Text style={styles.originLabelAddressText}>
                  {origin.description.split(', ')[0]}
                </Text>
              </View>
            </View>
          </View>
        </Marker>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          identifier={MarkerIdentifiersNames.Destination}>
          <View style={styles.customPinContainer}>
            <View style={styles.squarePin} />
            <View style={styles.destinationLabel}>
              <View style={styles.destinationLabelAddress}>
                <Text style={styles.destinationLabelAddressText}>
                  {destination.description.split(', ')[0]}
                </Text>
              </View>
            </View>
          </View>
        </Marker>
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  customPinContainer: {
    position: 'relative',
  },
  roundedPin: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 8,
  },
  squarePin: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderWidth: 8,
  },
  originLabel: {
    width: 150,
    height: 50,
    position: 'absolute',
    top: 30,
    left: -70,
    zIndex: 1,
    flexDirection: 'row',
  },
  originLabelTime: {
    width: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  originLabelTimeValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  originLabelTimeMeasure: {
    color: 'white',
  },
  originLabelAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'white',
  },
  originLabelAddressText: {
    fontSize: 16,
    fontWeight: '500',
  },
  destinationLabel: {
    width: 150,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 30,
    zIndex: 1,
    flexDirection: 'row',
  },
  destinationLabelAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'white',
  },
  destinationLabelAddressText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
