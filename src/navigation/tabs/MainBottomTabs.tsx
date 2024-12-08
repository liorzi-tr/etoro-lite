import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StatusBar, StyleSheet } from "react-native";
import TabIcon from "../../core/components/TabIcon";
import TabLabel from "../../core/components/TabLabel";
import ProfileStackNav from "../stacks/ProfileStack";
import { selectTheme } from "../../store/selectors/themeSelectors";
import { useSelector } from "react-redux";
import HomeScreen from "../../features/home/screens/HomeScreen";
import Portfolio from "../../features/portfolio/screens/PortfolioScreen";
import { routes } from "../../core/constants/routes";
import { MainBottomTabParamList } from "../types";

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

export default function MainBottomTabs() {
  const theme = useSelector(selectTheme);

  return (
    <>
      <StatusBar animated backgroundColor={theme.textColor} />
      <Tab.Navigator
        screenOptions={{
          animation: "shift",
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: "flex",
            elevation: 5,
            backgroundColor: theme.bottomTabsColor,
            borderTopColor: theme.borderColor,
            // borderTopWidth: 0,
          },
          headerStyle: {
            height: 100,
            backgroundColor: theme.headerColor,
          },
          headerShadowVisible: false,
        }}
      >
           <Tab.Screen
          name={routes.Home}
          component={HomeScreen}
          options={{
            headerTitle(props) {
              return (
                <Image
                  style={styles.logo}
                  source={require("../../../assets/images/etoro-logo.png")}
                />
              );
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            tabBarIcon: ({ focused }: any) => (
              <TabIcon focused={focused} icon={'home'} />
            ),
            tabBarLabel: ({focused}) => <TabLabel focused={focused} label="Home" />,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={routes.Portfolio}
          component={Portfolio}
          options={{
            headerTitle(props) {
              return <Image style={styles.logo} source={require('../../../assets/images/etoro-logo.png')} />;
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            tabBarIcon: ({ focused }: any) => (
              <TabIcon focused={focused} icon={'portfolio'} />
            ),
            tabBarLabel: ({focused}) => <TabLabel focused={focused} label="Portfolio" />,
          }}
        ></Tab.Screen>

        <Tab.Screen
          name={routes.Profile}
          component={ProfileStackNav}
          options={{
            headerTitle(props) {
              return <Image style={styles.logo} source={require('../../../assets/images/etoro-logo.png')} />;
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            tabBarIcon: ({ focused }: any) => (
              <TabIcon focused={focused} icon={'user'} />
            ),
            tabBarLabel: ({focused}) => <TabLabel focused={focused} label="Profile" />,
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 90,
    resizeMode: "contain",
  },
});
