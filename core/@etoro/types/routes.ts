import { TwoFactorResponse } from "./auth";

export type EtoroParamList = {
  Profile: any;
  Portfolio:any;
  Account: any;
  Home: any;
  Settings: any;
  Notifications: any;
  BottomTabs: any;
  AuthScreen: any;
  AuthStack: any;
  TwoFactorScreen: TwoFactorResponse;
  OnboardingStack: any;
  FirstOnboarding: any;
  SecondOnboarding: any;
  Email: any;
  SignUp: any;
};

export enum EtoroRoutes {
  Home = 'Home',
  Profile = 'Profile',
  Discover = 'Discover',
  Watchlist = 'Watchlist',
  Wallet = 'Wallet',
  Portfolio = 'Portfolio',
  Account = 'Account',
  Settings = 'Settings',
  Notifications = 'Notifications',
  AuthScreen = 'AuthScreen',
  AuthStack = 'AuthStack',
  TwoFactorScreen = 'TwoFactorScreen',
  BottomTabs = 'BottomTabs',
  OnboardingStack = 'OnboardingStack',
  FirstOnboarding = 'FirstOnboarding',
  SecondOnboarding = 'SecondOnboarding',
  Email = 'Email',
  SignUp = 'SignUp',
}
