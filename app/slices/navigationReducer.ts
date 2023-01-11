import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  GooglePlaceDetail,
  Point,
} from 'react-native-google-places-autocomplete';
import { RootState } from '../store/store';

type LocationPayload = {
  location: Point | undefined;
  description: string;
};

type OriginType = LocationPayload;
type DestinationType = LocationPayload;
type TravelTimeInformation = {
  distance: {
    value: number | undefined;
    text: string | undefined;
  };
  duration: {
    value: number | undefined;
    text: string | undefined;
  };
};

type NavigationSliceType = {
  origin: OriginType | null;
  destination: DestinationType | null;
  travelTimeInformation: TravelTimeInformation | null;
};

const initialState: NavigationSliceType = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<OriginType | null>) => {
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<DestinationType | null>) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (
      state,
      action: PayloadAction<TravelTimeInformation | null>,
    ) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navigationSlice.actions;

export const selectOrigin = (state: RootState) => state.origin;
export const selectDestination = (state: RootState) => state.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.travelTimeInformation;

export default navigationSlice.reducer;
