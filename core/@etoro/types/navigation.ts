import { NavigationProp, RouteProp } from '@react-navigation/native';
import { EtoroParamList } from './routes';

export type EtoroNavigationProp<RouteName extends keyof EtoroParamList = keyof EtoroParamList>
  = NavigationProp<EtoroParamList, RouteName>;

export type EtoroRouteProp<RouteName extends keyof EtoroParamList = keyof EtoroParamList>
  = RouteProp<EtoroParamList, RouteName>;

export type EtoroScreenProps<RouteName extends keyof EtoroParamList = keyof EtoroParamList> = {
  navigation: EtoroNavigationProp<RouteName>;
  route: EtoroRouteProp<RouteName>;
};
