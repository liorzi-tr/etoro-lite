import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../core/constants/routes';
import { OnboardingStackParamList } from '../types';
import FirstOnboarding from '../../features/auth/screens/onboarding/FirstOnboarding';
import SecondOnboarding from '../../features/auth/screens/onboarding/SecondOnboarding';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator initialRouteName={routes.FirstOnboarding}>
      <Stack.Screen
        name={routes.FirstOnboarding}
        component={FirstOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.SecondOnboarding}
        component={SecondOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.AuthStack}
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
