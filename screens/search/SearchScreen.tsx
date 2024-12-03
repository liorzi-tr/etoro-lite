import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { EtoroScreenProps } from '../../core/@etoro/types';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/selectors/themeSelectors';
import { useState } from 'react';
import { EtoroRoutes } from '../../core/@etoro/types/routes';
import Input from '../../core/components/atoms/Input';

export default function SearchScreen({ navigation }: EtoroScreenProps<EtoroRoutes.Search>) {
  const theme = useSelector(selectTheme);
  const [instrument, setInstrument] = useState<string>('btc'); // Default to 'btc'

  const navigateToMarketPage = () => {
    navigation.navigate(EtoroRoutes.MarketPage, { instrument });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Text style={[styles.text, { color: theme.textColor }]}>Account Screen</Text>

      {/* Input field to set the instrument dynamically */}
      <Input
        style={[styles.input, { color: theme.textColor, borderColor: theme.borderColor }]}
        value={instrument}
        onChangeText={setInstrument}
        placeholder="Enter instrument (e.g. BTC)"
        // placeholderTextColor={theme.textColor}
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
