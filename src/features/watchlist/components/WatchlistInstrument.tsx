import { Pressable, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/selectors/themeSelectors";

interface WatchlistInstrumentProps {
  name: string;
  id: number;
}

export default function WatchlistInstrument({ name, id }: WatchlistInstrumentProps) {
  const theme = useSelector(selectTheme);

  return (
    <Pressable style={[styles.container, { backgroundColor: theme.topBackgroundColor }]}>
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 15,
  },
  text: {
    fontSize: 16,
  },
});
