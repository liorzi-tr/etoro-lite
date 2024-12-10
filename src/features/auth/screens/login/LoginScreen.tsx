import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalStyles } from '../../../../core/constants/constants';
import EtButton from '../../../../core/components/EtButton';
import Input from '../../../../core/components/Input';
import PlanixIcon from '../../../../../assets/icons/EtoroIcon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../../store/store';
import { selectTheme } from '../../../../store/selectors/themeSelectors';
import LoginService from '../../../../core/services/LoginSerivce';
import { setTwoFactorRequired } from '../../../../store/slices/twoFactorSlice';
import { setAuthenticatedTrue } from '../../../../store/slices/authSlice';
import { Credentials, isLoginMissingScopes, isTwoFactorResponse, LoginResponse } from '../../types';
import { routes } from '../../../../core/constants/routes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthStackProp, LoginRouteProp } from '../../../../navigation/params';
import { saveSecureData } from '../../utils/secureStore';

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackProp>();
  const route = useRoute<LoginRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector(selectTheme);
  const [isProcessing, setIsProcessing] = useState(false);
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isProcessing) return;
    setErrorMessage(null);

    try {
      const data = await LoginService.authenticateUserBeforeLogin(credentials);
      await loginSuccessHandler(data);
    } catch (error) {
      loginErrorHandler(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const loginSuccessHandler = async (data: LoginResponse) => {
    if (isTwoFactorResponse(data)) {
      await saveSecureData('twoFactorToken', data.token.jwt);
      dispatch(setTwoFactorRequired(data));
      navigation.goBack();
      navigation.navigate(routes.TwoFactor);
      return;
    }

    if (isLoginMissingScopes(data)) {
      return;
    }

    await saveSecureData('refreshToken', data.token.jwt);
    await LoginService.refreshToken();
    navigation.goBack();
    dispatch(setAuthenticatedTrue());
  };

  const loginErrorHandler = (error: any) => {
    setErrorMessage('Login failed. Please try again.');
  };

  const handleSignUp = () => {
    navigation.goBack();
    navigation.navigate({ name: routes.Signup, params: {} });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Pressable style={styles.close} onPress={() => navigation.goBack()}>
        <PlanixIcon
          iconName="close"
          size={32}
          color={theme.primaryColor}
        />
      </Pressable>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require('../../../../../assets/images/login.png')}
        />
        <Text style={[styles.text, { color: theme.textColor }]}>
          Log in with your Email and Password
        </Text>
        <View style={styles.inputContainer}>
          <Input
            style={[styles.input, { color: theme.textColor, borderColor: theme.inputBorderColor, backgroundColor: theme.inputBackgroundColor }]}
            placeholder="Email"
            keyboardType="email-address"
            value={credentials.username}
            onChangeText={(text) => setCredentials({ ...credentials, username: text })}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={credentials.password}
            onChangeText={(text) => setCredentials({ ...credentials, password: text })}
          />
        </View>
        <Pressable onPress={handleSignUp}>
          <Text style={[styles.signupLink, { color: theme.primaryColor }]}>Not a user yet? Sign up!</Text>
        </Pressable>
      </View>
      <View
        style={{ marginTop: 'auto' }}
      >
        <EtButton
          title="Log in"
          onPress={handleLogin}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'flex-end',
    paddingVertical: 55,
  },
  close: {
    position: 'absolute',
    zIndex: 1,
    top: 80,
    right: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    ...globalStyles.text,
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 30,
    gap: 10,
  },
  input: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  signupLink: {
    fontSize: 18,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
  },
});
