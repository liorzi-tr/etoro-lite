import { AppDispatch, RootState } from '../../store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';

import OnboardingStackScreen from '../../screens/onboarding/OnboardingStackScreen';
import { EtoroParamList, EtoroRoutes } from '../@etoro/types';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initializeTheme } from '../../store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator<EtoroParamList>();

export default function Router() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);
  const isAuthenticated = useSelector<RootState>(state => state.auth.isAuthenticated);
  const twoFactorRequired = useSelector<RootState>(state => state.twoFactor.required);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme.bottomBackgroundColor,
      }}
    >
      {isAuthenticated ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={EtoroRoutes.BottomTabs} screenOptions={{
            contentStyle: { backgroundColor: theme.bottomBackgroundColor },
          }}>
            <Stack.Screen
              name={EtoroRoutes.BottomTabs}
              component={BottomTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={EtoroRoutes.OnboardingStack} screenOptions={{
            contentStyle: { backgroundColor: theme.bottomBackgroundColor },
          }}>
            <Stack.Screen
              name={EtoroRoutes.OnboardingStack}
              component={OnboardingStackScreen}
              options={{ headerShown: false, presentation: 'transparentModal' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </GestureHandlerRootView>
  );
}
