import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';

export enum ScreenNames {
  HomeScreen = 'HomeScreen',
  MapScreen = 'MapScreen',
  NavigateCard = 'NavigateCard',
  RideOptionsCard = 'RideOptionsCard',
}

export type RootStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

export type StackScreenProp = StackScreenProps<
  RootStackParamList,
  'HomeScreen',
  'MapScreen'
>;

export type HomeScreenNavigatorProp = StackNavigationProp<
  RootStackParamList,
  ScreenNames.HomeScreen
>;

export type MapScreenNavigatorProp = StackNavigationProp<
  RootStackParamList,
  ScreenNames.MapScreen
>;
