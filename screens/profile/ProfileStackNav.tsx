import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "./ProfileScreen";
import AccountScreen from "./AccountScreen";
import { EtoroParamList, EtoroRoutes } from "../../core/@etoro/types";
import { useSelector } from "react-redux";
import { selectTheme } from "../../store/selectors/themeSelectors";
import Portfolio from './portfolioList';

const Stack = createNativeStackNavigator<EtoroParamList>();

export default function ProfileStackNav() {
    const theme = useSelector(selectTheme);

    return (
        <Stack.Navigator initialRouteName={EtoroRoutes.Profile}>
            <Stack.Screen
                name={EtoroRoutes.Portfolio}
                component={Portfolio}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={EtoroRoutes.Profile}
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={EtoroRoutes.Account}
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
