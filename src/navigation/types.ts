import { AggregatedLoginResponse } from "../features/home/types";

export type RootStackParamList = {
  AuthNavigator: undefined;
  MainNavigator: undefined;
};

export type AuthStackParamList = {
  BioAuth: any;
  Auth: any;
  Login: any;
  Signup: any;
  TwoFactor: any;
  MainBottomTabs: any;
};

export type OnboardingStackParamList = {
  FirstOnboarding: undefined;
  SecondOnboarding: undefined;
  AuthStack: undefined;
};

export type MainBottomTabParamList = {
  Home: AggregatedLoginResponse;
  Profile: any;
  Portfolio: any;
  Account: any;
  Watchlist: any;
};
