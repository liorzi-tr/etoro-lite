import { Image, StyleSheet, Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectTheme } from '../../../../store/selectors/themeSelectors';
import { routes } from '../../../../core/constants/routes';
import { OnboardingNavigatorProp, SecondOnboardingRouteProp } from '../../../../navigation/params';
import { useNavigation, useRoute } from '@react-navigation/native';
import EtButton from '../../../../core/components/EtButton';
import { globalStyles } from '../../../../core/constants/constants';

export default function SecondOnboarding() {
  const navigation = useNavigation<OnboardingNavigatorProp>();
  const route = useRoute<SecondOnboardingRouteProp>();
  const theme = useSelector(selectTheme);
  const {t} = useTranslation();
  const handlePress = () => {
    navigation.navigate(routes.AuthStack);
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor: theme.bottomBackgroundColor }]}>
      <Animated.View
        entering={FadeInLeft.duration(800)}
        exiting={FadeOutLeft.duration(800)}
        style={styles.titleContainer}
      >
        <Animated.View
          entering={FadeIn.duration(800)}
          exiting={FadeOut.duration(800)}
        >
          <Image
            source={require('../../../../../assets/images/etoro-logo.png')}
            style={{ height: 40, width: 100, alignSelf: 'center' }}
          />
        </Animated.View>
        <Text style={[styles.title, { color: theme.textColor }]}>{t('onboardingScreens.nonUS_screen3_body')}</Text>
      </Animated.View>
      <Animated.View
        style={styles.imageContainer}
        entering={FadeInDown.delay(400).duration(800)}
        exiting={FadeOutDown.duration(800)}
      >
        <Image
          source={require('../../../../../assets/images/etoro-onboarding2.png')}
          style={styles.image}
        ></Image>
      </Animated.View>
      <Animated.View
        entering={FadeInLeft.delay(800).duration(800)}
        exiting={FadeOutLeft.duration(800)}
      >
        <EtButton title={t('onboardingScreens.nextButton')} onPress={handlePress} textColor={theme.buttonTextColor} style={styles.button} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'space-around',
  },
  titleContainer: {
    alignSelf: 'center',
    gap: 30,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
  },
  planix: {
    alignSelf: 'center',
  },
  image: {
    height: 300,
    width: 400,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
