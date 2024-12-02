import { Image, StyleSheet, Text } from 'react-native';
import { globalStyles } from '../../styles/constants';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';
import PlxButton from '../../core/components/atoms/EtButton';
import { EtoroRoutes, EtoroScreenProps } from '../../core/@etoro/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useTranslation } from 'react-i18next';

export default function SecondOnboarding({
  navigation,
}: EtoroScreenProps<EtoroRoutes.SecondOnboarding>) {
  const theme = useSelector(selectTheme);
    const {t} = useTranslation();
  const handlePress = () => {
    navigation.navigate(EtoroRoutes.AuthStack);
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
            source={require('../../assets/etoro-logo.png')}
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
          source={require('../../assets/etoro-onboarding2.png')}
          style={styles.image}
        ></Image>
      </Animated.View>
      <Animated.View
        entering={FadeInLeft.delay(800).duration(800)}
        exiting={FadeOutLeft.duration(800)}
      >
        <PlxButton title={t('onboardingScreens.nextButton')} onPress={handlePress} textColor={theme.buttonTextColor} style={styles.button} />
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
