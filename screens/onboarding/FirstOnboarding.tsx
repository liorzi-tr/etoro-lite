import { Image, StyleSheet, Text, ScrollView } from 'react-native';
import { globalStyles } from '../../styles/constants';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeOut,
  FadeOutDown,
  FadeOutLeft,
} from 'react-native-reanimated';
import PlxButton from '../../core/components/atoms/EtButton';
import { EtoroRoutes, EtoroScreenProps } from '../../core/@etoro/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useTranslation } from 'react-i18next';

export default function FirstOnboarding({ navigation }: EtoroScreenProps<EtoroRoutes.FirstOnboarding>) {
  const theme = useSelector(selectTheme);
  const {t} = useTranslation();

  const handlePress = () => {
    navigation.navigate(EtoroRoutes.SecondOnboarding);
  };

  return (
    <Animated.ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.bottomBackgroundColor }]}>
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
        <Text style={[styles.title, { color: theme.textColor }]}>{t('onboardingScreens.nonUS_screen1_body')}</Text>
      </Animated.View>
      <Animated.View
        style={styles.imageContainer}
        entering={FadeInDown.delay(400).duration(800)}
        exiting={FadeOutDown.duration(800)}
      >
        <Image
          source={require('../../assets/etoro-onboarding1.png')}
          style={styles.image}
        ></Image>
      </Animated.View>
      <Animated.View
        entering={FadeInLeft.delay(800).duration(800)}
        exiting={FadeOutLeft.duration(800)}
      >
        <PlxButton title={t('onboardingScreens.nextButton')} onPress={handlePress} textColor={theme.buttonTextColor} style={styles.button} />
      </Animated.View>
    </Animated.ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'space-evenly',
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
    height: 350,
    width: 350,
  },
  button: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
