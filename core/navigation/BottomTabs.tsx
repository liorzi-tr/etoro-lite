import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StatusBar, StyleSheet } from 'react-native';
import TabIcon from '../components/atoms/TabIcon';
import TabLabel from '../components/atoms/TabLabel';
import ProfileStackNav from '../../screens/profile/ProfileStackNav';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';
import { EtoroParamList, EtoroRoutes } from '../@etoro/types';
import HomeScreen from '../../screens/home/HomeScreen';

const Tab = createBottomTabNavigator<EtoroParamList>();

export default function BottomTabs() {
  const theme = useSelector(selectTheme);

  return (
    <>
      <StatusBar animated backgroundColor={theme.textColor} />
      <Tab.Navigator
        screenOptions={{
          animation: 'shift',
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: 'flex',
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
          name={EtoroRoutes.Profile}
          component={ProfileStackNav}
          options={{
            headerTitle(props) {
              return <Image style={styles.logo} source={require('../../assets/etoro-logo.png')} />;
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            tabBarIcon: ({ focused }: any) => (
              <TabIcon focused={focused} icon={'user'} />
            ),
            tabBarLabel: () => <TabLabel />,
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={EtoroRoutes.Home}
          component={HomeScreen}
          options={{
            headerTitle(props) {
              return <Image style={styles.logo} source={require('../../assets/etoro-logo.png')} />;
            },
            headerTitleStyle: {
              color: theme.textColor,
            },
            tabBarIcon: ({ focused }: any) => (
              <TabIcon focused={focused} icon={'user'} />
            ),
            tabBarLabel: () => <TabLabel />,
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
    resizeMode: 'contain',
  },
});
