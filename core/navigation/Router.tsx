import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';

import OnboardingStackScreen from '../../screens/onboarding/OnboardingStackScreen';
import useAuthListener from '../hooks/useAuthListener';
import { EtoroParamList, EtoroRoutes } from '../@etoro/types';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useEffect } from 'react';
import { initializeTheme } from '../../store/actions/themeActions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator<EtoroParamList>();

export default function Router() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const { user } = useSelector((state: RootState) => state.user);
  useAuthListener();

  useEffect(() => {
    dispatch<any>(initializeTheme());
  }, [dispatch]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme.bottomBackgroundColor,
      }}
    >
      {user ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={EtoroRoutes.BottomTabs} screenOptions={{
            contentStyle: { backgroundColor: theme.bottomBackgroundColor },
          }}>
            <Stack.Screen
              name={EtoroRoutes.BottomTabs}
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name={EtoroRoutes.PlanixStack}
              component={PlanixStackScreen}
              options={{ headerShown: false }}
            /> */}
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
