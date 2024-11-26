import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstOnboarding from './FirstOnboarding';
import SecondOnboarding from './SecondOnboarding';
import AuthStackScreen from '../auth/AuthStackScreen';
import { EtoroParamList, EtoroRoutes } from '../../core/@etoro/types';

const Stack = createNativeStackNavigator<EtoroParamList>();

export default function OnboardingStackScreen() {
  return (
    <Stack.Navigator initialRouteName={EtoroRoutes.FirstOnboarding}>
      <Stack.Screen
        name={EtoroRoutes.FirstOnboarding}
        component={FirstOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EtoroRoutes.SecondOnboarding}
        component={SecondOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EtoroRoutes.AuthStack}
        component={AuthStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
