import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { verifyTwoFactor } from "../../../store/slices/twoFactorSlice";
import { setAuthenticated } from "../../../store/slices/authSlice";
import { ActivityIndicator, Button, Text, TextInput, View } from "react-native";


export default function TwoFactorScreen({ navigation }: any) {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const twoFactorState = useSelector((state: RootState) => state.twoFactor);

  const handleVerify = async () => {
    if (!twoFactorState.data) return;

    const verificationData = {
      twoFAData: twoFactorState.data,
      otp,
    };

    const resultAction = await dispatch(verifyTwoFactor(verificationData));
    if (verifyTwoFactor.fulfilled.match(resultAction)) {
      dispatch(setAuthenticated(true));
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthScreen' }],
      });
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
      <Button
        title="Verify"
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
