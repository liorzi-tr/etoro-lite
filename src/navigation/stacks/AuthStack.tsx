import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { routes } from '../../core/constants/routes';
import AuthScreen from '../../features/auth/screens/AuthScreen';
import LoginScreen from '../../features/auth/screens/login/LoginScreen';
import TwoFactorScreen from '../../features/auth/screens/two-factor/TwoFactorScreen';
import SignupScreen from '../../features/auth/screens/signup/SignupScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={routes.Auth}>
      <Stack.Screen
        name={routes.Auth}
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.Login}
        component={LoginScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.TwoFactor}
        component={TwoFactorScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.Signup}
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
