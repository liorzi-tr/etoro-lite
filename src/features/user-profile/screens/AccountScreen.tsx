import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { MainTabParamList } from '../../../navigation/types';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { routes } from '../../../core/constants/routes';

export default function AccountScreen({ navigation }: MainTabParamList['Account']) {
  const theme = useSelector(selectTheme);
  const [instrument, setInstrument] = useState<string>('btc'); // Default to 'btc'

  const navigateToMarketPage = () => {
    navigation.navigate(routes.MarketPage, { instrument });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Account Screen</Text>

      {/* Input field to set the instrument dynamically */}
      <TextInput
        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
        value={instrument}
        onChangeText={setInstrument}
        placeholder="Enter instrument (e.g. BTC)"
        placeholderTextColor={theme.textColor}
      />

      <Button title={`Open Market Page (${instrument.toUpperCase()})`} onPress={navigateToMarketPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 10,
  },
});
