import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../features/user-profile/screens/ProfileScreen";
import AccountScreen from "../../features/user-profile/screens/AccountScreen";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/selectors/themeSelectors";
import Portfolio from '../../features/portfolio/screens/PortfolioScreen';
import { routes } from "../../core/constants/routes";
import { MainBottomTabParamList } from "../types";

const Stack = createNativeStackNavigator<MainBottomTabParamList>();

export default function ProfileStack() {
  const theme = useSelector(selectTheme);

  return (
    <Stack.Navigator initialRouteName={routes.Profile}>
      <Stack.Screen
        name={routes.Portfolio}
        component={Portfolio}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.Profile}
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.Account}
        component={AccountScreen}
        options={
          {
            title: 'Account',
            headerStyle: {
              backgroundColor: theme.topBackgroundColor,
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }
        }
      />
    </Stack.Navigator>
  );
};
