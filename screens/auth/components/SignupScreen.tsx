import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { globalStyles } from '../../../styles/constants';
import EtButton from '../../../core/components/atoms/EtButton';
import Input from '../../../core/components/atoms/Input';
import EtoroIcon from '../../../core/icons/EtoroIcon';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { useSelector } from 'react-redux';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen = ({ navigation }: SignupScreenProps) => {
  const theme = useSelector(selectTheme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const handleSignUp = () => {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       console.log('User created:', user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error(errorCode, errorMessage);
  //     });
  // };

  return (
    <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Pressable style={styles.close} onPress={() => navigation.goBack()}>
        <EtoroIcon
          iconName="close"
          size={32}
          color={theme.primaryColor}
        />
      </Pressable>
      <View style={styles.headerContainer}>
        <Image
          style={styles.image}
          source={require('../../../assets/etoro-logo.png')}
        />
        <Text style={[styles.text, { color: theme.textColor }]}>Create an account to get started</Text>
        <View style={styles.inputContainer}>
          <Input
            style={[styles.input, { color: theme.textColor, borderColor: theme.inputBorderColor, backgroundColor: theme.inputBackgroundColor }]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            style={[styles.input, { color: theme.textColor, borderColor: theme.inputBorderColor, backgroundColor: theme.inputBackgroundColor }]}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Input
            style={[styles.input, { color: theme.textColor, borderColor: theme.inputBorderColor, backgroundColor: theme.inputBackgroundColor }]}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.buttonContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <EtButton title="Signup" pill={true} onPress={() => {}} style={styles.button} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    justifyContent: 'flex-start',
  },
  close: {
    position: 'absolute',
    top: 60,
    left: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  image: {
    width: 200,
    height: 70,
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    alignSelf: 'stretch',
    padding: 10,
    gap: 5,
  },
  input: {
    height: 50,
    fontSize: 20,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
  }
});
