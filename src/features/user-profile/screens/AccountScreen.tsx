import { View, StyleSheet, Text } from "react-native";
import Toggle from "../../../core/components/Toggle";
import { useState } from "react";
import { selectTheme } from "../../../store/selectors/themeSelectors";
import { useSelector } from "react-redux";
import { activateBioLogin } from "../../auth/services/CryptoService";
import { showBiometricPrompt } from "../../auth/services/BiometricLoginService";

export default function AccountScreen() {
  const theme = useSelector(selectTheme);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    try {
      // await showBiometricPrompt();
      await activateBioLogin();
    } catch (error) {
      setIsEnabled(previousState => !previousState);
      console.log('Error activating biometric login', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Toggle value={isEnabled} onValueChange={toggleSwitch} />
      <Text style={[styles.text, { color: theme.textColor }]}>Activate Biometric Authentication</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
