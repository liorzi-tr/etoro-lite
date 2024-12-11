import { View, Text, StyleSheet, FlatList } from "react-native";
import WatchlistInstrument from "../components/WatchlistInstrument";
import { selectTheme } from "../../../store/selectors/themeSelectors";
import { useSelector } from "react-redux";


export default function WatchlistScreen() {
  const theme = useSelector(selectTheme);

  return (
    <FlatList style={[styles.container, { backgroundColor: theme.topBackgroundColor }]} data={[
      { id: 1, name: 'Instrument 1' },
      { id: 2, name: 'Instrument 2' },
      { id: 3, name: 'Instrument 3' },
      { id: 4, name: 'Instrument 4' },
      { id: 5, name: 'Instrument 5' },
    ]} renderItem={({ item }) => (
      <WatchlistInstrument name={item.name} id={item.id} />
    )} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
