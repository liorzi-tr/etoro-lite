import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { globalStyles } from '../../../core/constants/constants';
import BackgroundGradient from '../../../../styles/GradientBackground';
import EtButton from '../../../core/components/EtButton';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { routes } from '../../../core/constants/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthRouteProp, AuthStackProp } from '../../../navigation/params';

export default function AuthScreen() {
  const navigation = useNavigation<AuthStackProp>();
  const route = useRoute<AuthRouteProp>();
  const theme = useSelector(selectTheme);

  const handlePress = (route: any): void => {
    navigation.navigate(route);
  };
  return (
    <ScrollView contentContainerStyle={{flex: 1, }}>
    <BackgroundGradient
      topColor={theme.topBackgroundColor}
      bottomColor={theme.bottomBackgroundColor}
    >
      <Animated.View style={styles.container} entering={FadeIn}>
        <Animated.View style={styles.header} entering={FadeIn}>
          <Image
            source={require('../../../../assets/images/etoro-logo.png')}
            style={styles.headerLogo}
          />
        </Animated.View>
        <Animated.View
          style={{ gap: 10 }}
          entering={FadeInLeft.duration(600).stiffness(3)}
        >
          <Text style={[styles.headerTitle, { color: theme.textColor }]}>Explore Top Markets!</Text>
          <Text style={[globalStyles.text, { textAlign: 'center', color: theme.textColor }]}>
            Please choose how you want to continue setting up your account.
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(400)}>
          <Image
            source={require('../../../../assets/images/etoro-authstack.png')}
            style={styles.authStackImage}
          />
        </Animated.View>
        <View style={styles.footer}>
          <Animated.View
            style={styles.buttonContainer}
            entering={FadeInDown.delay(800).duration(700)}
          >
            <EtButton
              title="Continue with Email"
              color={theme.primaryColor}
              onPress={handlePress.bind(null, routes.Login)}
              style={styles.button}
            />
          </Animated.View>
        </View>
      </Animated.View>
    </BackgroundGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginTop: 30,
    justifyContent: 'space-around',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  headerLogo: {
    height: 40,
    width: 120,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  authStackImage: {
    width: 500,
    height: 400,

  },
  footer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  }
});
