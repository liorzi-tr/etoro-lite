import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalStyles } from '../../styles/constants';
import SectionButton from './components/SectionButton';
import BackgroundGradient from '../../styles/GradientBackground';
import { useDispatch, useSelector } from 'react-redux';
import { extractNameFromEmail } from '../../core/utils/extractEmail';
import { EtoroRoutes, EtoroScreenProps } from '../../core/@etoro/types';
import OuterCard from '../../core/components/atoms/OuterCard';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { DisplayedColumnsProvider } from './components/displayedColumns.provider';
import { logout } from '../../store/slices/authSlice';
import { AppDispatch } from '../../store/store';
import LogoutService from '../../core/services/LogoutService';

export default function ProfileScreen({ navigation }: EtoroScreenProps<EtoroRoutes.Profile>) {
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch<AppDispatch>();

  const handlePress = (): void => {
    navigation.navigate(EtoroRoutes.Account);
  }

  const navigateToPortfolio = ():void=>{
    navigation.navigate(EtoroRoutes.Portfolio);
  }

  const handleLogout = async (): Promise<void> => {
    await LogoutService.logout();
    dispatch(logout());
  };
  return (

    <BackgroundGradient
      topColor={theme.topBackgroundColor}
      bottomColor={theme.bottomBackgroundColor}
    >
      <ScrollView style={globalStyles.container}>
        <View>
          <Text style={[styles.title, { color: theme.textColor }]}>
            Hi!
          </Text>
        </View>
        <View style={styles.avatarSection}>
          <Pressable style={[styles.avatarContainer, { backgroundColor: theme.textColor }]}>
            {/* <Image
              style={styles.avatar}
              source={require('../../assets/avatar.jpg')}
            /> */}
          </Pressable>
          <Text style={[styles.username, { color: theme.textColor }]}>
            Username
          </Text>
        </View>

        <OuterCard style={[styles.buttonSection, { backgroundColor: theme.outerCardColor }]}>
          <Text style={[styles.sections, { color: theme.textColor }]}>Settings</Text>
          <SectionButton
            label="Account"
            iconLeft="settings"
            iconRight="chevronRight"
            color={theme.textColor}
            iconLeftSize={30}
            iconRightSize={36}
            onPress={handlePress}
          />
          <Text style={[styles.sections, { color: theme.textColor }]}>Account</Text>
          <SectionButton
            onPress={navigateToPortfolio}
            label="Payment methods"
            iconLeft="creditCard"
            iconRight="chevronRight"
            color={theme.textColor}
            iconLeftSize={30}
            iconRightSize={36}
          ></SectionButton>
          <SectionButton
            label="Logout"
            iconLeft="logout"
            iconRight="chevronRight"
            color={theme.textColor}
            iconLeftSize={30}
            iconRightSize={36}
            onPress={handleLogout}
          ></SectionButton>
        </OuterCard>
      </ScrollView>
    </BackgroundGradient>

  );
}

const styles = StyleSheet.create({
  container: globalStyles.container,
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 30,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 15,
  },
  buttonSection: {
    flex: 2,
    marginTop: 20,
    padding: 16,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  sections: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  tasksStatus: {
    flexDirection: 'row',
    gap: 10,
  },
});
