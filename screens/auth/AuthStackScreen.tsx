import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailModalScreen from './components/EmailModal';
import AuthScreen from './AuthScreen';
import SignupScreen from './components/SignupScreen';
import { EtoroParamList, EtoroRoutes } from '../../core/@etoro/types';
import TwoFactorScreen from './components/TwoFactorScreen';

const Stack = createNativeStackNavigator<EtoroParamList>();

const AuthStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName={EtoroRoutes.AuthScreen}>
      <Stack.Screen
        name={EtoroRoutes.AuthScreen}
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EtoroRoutes.Email}
        component={EmailModalScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={EtoroRoutes.TwoFactorScreen}
        component={TwoFactorScreen}
        options={{
          // headerShown: false,
        }}
      />
      <Stack.Screen
        name={EtoroRoutes.SignUp}
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackScreen;
