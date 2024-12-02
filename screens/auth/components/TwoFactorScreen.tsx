import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { verifyTwoFactor } from "../../../store/slices/twoFactorSlice";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import { EtoroRoutes, EtoroScreenProps } from "../../../core/@etoro/types";
import EtButton from "../../../core/components/atoms/EtButton";
import { setAuthenticatedTrue } from "../../../store/slices/authSlice";

export default function TwoFactorScreen({ navigation, route }: EtoroScreenProps<EtoroRoutes.TwoFactorScreen>) {
  const [otp, setOtp] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const twoFactorState = useSelector((state: RootState) => state.twoFactor);

  const handleVerify = async () => {
    if (!twoFactorState.data) return;

    const verificationData = {
      twoFAData: twoFactorState.data,
      otp,
    };
    console.log('Verification data:', verificationData);

    const resultAction = await dispatch(verifyTwoFactor(verificationData));
    if (verifyTwoFactor.fulfilled.match(resultAction)) {
      console.log('Two factor verification successful');

      dispatch(setAuthenticatedTrue());
      navigation.navigate(EtoroRoutes.Profile);
    }
  };


  return (
    <View>
      <Text>Enter the verification code:</Text>
      <TextInput
        placeholder="Verification Code"
        value={otp}
        onChangeText={text => setOtp(text)}
        keyboardType="numeric"
        style={{ marginBottom: 8, borderBottomWidth: 1 }}
      />
      <EtButton
        title="Continue"
        onPress={handleVerify}
        disabled={twoFactorState.status === 'loading'}
      />
      {twoFactorState.status === 'loading' && <ActivityIndicator size="small" />}
      {twoFactorState.error && (
        <Text style={{ color: 'red', marginTop: 8 }}>{twoFactorState.error}</Text>
      )}
    </View>
  )
}
