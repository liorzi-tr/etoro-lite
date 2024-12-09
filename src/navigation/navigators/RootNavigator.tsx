import { AppDispatch, RootState } from "../../store/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { selectTheme } from "../../store/selectors/themeSelectors";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { initializeTheme } from "../../store/slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from '../../store/slices/authSlice';
import { Image, StyleSheet, View } from "react-native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { routes } from "../../core/constants/routes";
import MarketPageScreen from "../../features/markets/screens/MarketPageScreen";
import Loader from "../../core/components/Loader";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);
  const isAuthenticated = useSelector<RootState>(
    (state) => state.auth.isAuthenticated
  );
  const authStatus = useSelector<RootState>(
    (state) => state.auth.status
  );

  useEffect(() => {
    dispatch(checkAuthentication());
    dispatch(initializeTheme());
  }, [dispatch]);

  if (authStatus !== 'loading') {
    // Show a loading screen while checking authentication
    return (
      <GestureHandlerRootView style={styles.loaderContainer}>
        <View>
          <Loader />
        </View>
      </GestureHandlerRootView>
    );
  }


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
              ? routes.BottomTabs
              : routes.OnboardingStack
          }
          screenOptions={{
            contentStyle: { backgroundColor: theme.bottomBackgroundColor },
          }}
        >
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name={routes.BottomTabs}
                component={MainNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name={routes.MarketPage}
                component={MarketPageScreen}
                options={{ headerTitle(props) {
                  return (
                    <Image
                      style={styles.logo}
                      source={require("../../../assets/images/etoro-logo.png")}
                    />
                  );
                }, headerShown: true, headerBackButtonDisplayMode: 'minimal', headerTintColor: theme.textColor, headerShadowVisible: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name={routes.OnboardingStack}
              component={AuthNavigator}
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
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
});
