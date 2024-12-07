import { RouteProp } from '@react-navigation/native';
import { AuthStackParamList, MainBottomTabParamList, OnboardingStackParamList, RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export type AuthNavigatorProp = NativeStackNavigationProp<OnboardingStackParamList>;
export type MainNavigatorProp = NativeStackNavigationProp<RootStackParamList>;
export type MainBottomTabsProp = NativeStackNavigationProp<MainBottomTabParamList>;
export type OnboardingNavigatorProp = NativeStackNavigationProp<OnboardingStackParamList>;
export type AuthStackProp = NativeStackNavigationProp<AuthStackParamList>;
export type FirstOnboardingRouteProp = RouteProp<OnboardingStackParamList, 'FirstOnboarding'>;
export type SecondOnboardingRouteProp = RouteProp<OnboardingStackParamList, 'SecondOnboarding'>;
export type AuthRouteProp = RouteProp<AuthStackParamList, 'Auth'>;
export type LoginRouteProp = RouteProp<AuthStackParamList, 'Login'>;
export type TwoFactorRouteProp = RouteProp<AuthStackParamList, 'TwoFactor'>;
export type SignupRouteProp = RouteProp<AuthStackParamList, 'Signup'>
export type HomeRouteProp = RouteProp<MainBottomTabParamList, 'Home'>;
export type PortfolioRouteProp = RouteProp<MainBottomTabParamList, 'Portfolio'>;
export type ProfileRouteProp = RouteProp<MainBottomTabParamList, 'Profile'>;
export type AccountRouteProp = RouteProp<MainBottomTabParamList, 'Account'>;
