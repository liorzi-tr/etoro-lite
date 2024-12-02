import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalStyles } from '../../../styles/constants';
import EtButton from '../../../core/components/atoms/EtButton';
import Input from '../../../core/components/atoms/Input';
import PlanixIcon from '../../../core/icons/EtoroIcon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { EtoroRoutes } from '../../../core/@etoro/types';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { selectUser, selectUserStatus } from '../../../store/selectors/userSelectors';
import { Credentials, isLoginMissingScopes, isTwoFactorResponse, LoginResponse } from '../../../core/@etoro/types/auth';
import LoginService from '../../../core/services/LoginSerivce';
import { setTwoFactorRequired } from '../../../store/slices/twoFactorSlice';

interface EmailModalProps {
  navigation: any;
}

const EmailModal = ({ navigation }: EmailModalProps) => {
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
      dispatch(setTwoFactorRequired(data));
      navigation.goBack();
      navigation.navigate(EtoroRoutes.TwoFactorScreen);
      return;
    }

    if (isLoginMissingScopes(data)) {
      // Handle missing scopes
      return;
    }
  };

  const loginErrorHandler = (error: any) => {
    setErrorMessage('Login failed. Please try again.');
    // Additional error handling based on error object
  };

  const handleSignUp = () => {
    navigation.goBack();
    navigation.navigate(EtoroRoutes.SignUp);
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
          source={require('../../../assets/login.png')}
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={{ marginTop: 'auto' }}
      >
        <EtButton
          title="Log in"
          onPress={handleLogin}
          style={styles.button}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailModal;

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
