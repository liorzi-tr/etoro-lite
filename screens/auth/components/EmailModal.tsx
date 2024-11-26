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
import PlxButton from '../../../core/components/atoms/EtButton';
import Input from '../../../core/components/atoms/Input';
import PlanixIcon from '../../../core/icons/PlanixIcon';
import { useEffect, useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { setUser } from '../../../store/slices/userSlice';
import { EtoroRoutes } from '../../../core/@etoro/types';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { selectUser, selectUserStatus } from '../../../store/selectors/userSelectors';

interface EmailModalProps {
  navigation: any;
}

const EmailModal = ({ navigation }: EmailModalProps) => {
  const theme = useSelector(selectTheme);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const user = useSelector(selectUser);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      navigation.navigate(EtoroRoutes.CreateEvent);
    }
  }, [status, user, dispatch, navigation]);

  const handleSignInWithEmailAndPassword = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        const user: User = userCredential.user;
        dispatch(setUser(user));
        navigation.goBack();
        navigation.navigate(EtoroRoutes.CreateEvent);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
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
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
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
        <PlxButton
          title="Log in"
          pill={true}
          onPress={handleSignInWithEmailAndPassword}
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
