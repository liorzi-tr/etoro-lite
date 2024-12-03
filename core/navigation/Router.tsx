import { AppDispatch, RootState } from "../../store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";
import OnboardingStackScreen from "../../screens/onboarding/OnboardingStackScreen";
import MarketPageScreen from "../../screens/market-page/MarketPage";
import { EtoroParamList, EtoroRoutes } from "../@etoro/types";
import { selectTheme } from "../../store/selectors/themeSelectors";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initializeTheme } from "../../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from '../../store/slices/authSlice';
import { Image, StyleSheet } from "react-native";

const Stack = createNativeStackNavigator<EtoroParamList>();

export default function Router() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(initializeTheme());
  }, [dispatch]);

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: theme.bottomBackgroundColor,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            isAuthenticated
              ? EtoroRoutes.BottomTabs
              : EtoroRoutes.OnboardingStack
          }
          screenOptions={{
            contentStyle: { backgroundColor: theme.bottomBackgroundColor },
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name={EtoroRoutes.BottomTabs}
                component={BottomTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={EtoroRoutes.MarketPage}
                component={MarketPageScreen}
                options={{ headerTitle(props) {
                  return (
                    <Image
                      style={styles.logo}
                      source={require("../../assets/etoro-logo.png")}
                    />
                  );
                }, headerShown: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: theme.textColor, headerShadowVisible: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name={EtoroRoutes.OnboardingStack}
              component={OnboardingStackScreen}
              options={{ headerShown: false, presentation: "transparentModal" }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 40,
  },
});
