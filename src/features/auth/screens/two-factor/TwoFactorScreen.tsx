import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { verifyTwoFactor } from "../../../../store/slices/twoFactorSlice";
import { ActivityIndicator, Keyboard, StyleSheet, Text, View } from "react-native";
import EtButton from "../../../../core/components/EtButton";
import { setAuthenticatedTrue } from "../../../../store/slices/authSlice";
import { useTranslation } from "react-i18next";
import OTPInput from "../../components/OtpInput";
import { routes } from "../../../../core/constants/routes";
import { AuthStackProp, TwoFactorRouteProp } from "../../../../navigation/params";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function TwoFactorScreen() {
  const navigation = useNavigation<AuthStackProp>();
  const route = useRoute<TwoFactorRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const {t} = useTranslation();
  const [otp, setOtp] = useState<string>('');
  const twoFactorState = useSelector((state: RootState) => state.twoFactor);

  const handleVerify = async () => {
    if (!twoFactorState.data) return;

    const verificationData = {
      twoFAData: twoFactorState.data,
      otp,
    };

    const resultAction = await dispatch(verifyTwoFactor(verificationData));
    if (verifyTwoFactor.fulfilled.match(resultAction)) {
      dispatch(setAuthenticatedTrue());
      navigation.navigate(routes.Home as any);
    }
  };

  const onCodeFilled = (code: string) => {
    setOtp(code);
    Keyboard.dismiss();
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('twoStep.title')}</Text>
        <Text style={styles.subTitle}>Enter the code which was sent to your mobile device</Text>
      </View>

        <OTPInput
          length={5}
          onCodeFilled={onCodeFilled}
        />
        <EtButton
          title="Continue"
          onPress={handleVerify}
          disabled={twoFactorState.status === 'loading'}
          style={styles.button}
        />
        {twoFactorState.status === 'loading' && <ActivityIndicator size="small" />}
        {twoFactorState.error && (
          <Text style={{ color: 'red', marginTop: 8 }}>{twoFactorState.error}</Text>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-evenly',
    // gap: 100,

  },
  titleContainer: {
    gap: 16,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    // width: '100%',
  },
});
