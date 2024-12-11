import { Text, StyleSheet, Pressable, View, Image } from 'react-native';
import { PositionGroup } from '../types';

interface MirrorItemProps {
  item: PositionGroup;
  onPress: () => void;
}

export default function MirrorItem({ item, onPress }: MirrorItemProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={{ uri: item.instrument.Images[0].Uri }} style={{
        height: item.instrument.Images[0].Height,
        width: item.instrument.Images[0].Width,
      }} />
      <View style={styles.leftColumn}>
        <Text style={styles.name}>{item.instrument.SymbolFull}</Text>
      </View>
      <View style={styles.rightColumns}>
        <View style={styles.column}>
          <Text style={styles.text}>{item.totalUnits.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    gap: 15,
  },
  image: {
    width: 40,
    height: 40,
  },
  leftColumn: {
    flexDirection: 'column',
    flex: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  rightColumns: {
    flexDirection: 'row',
    flex: 3,
    justifyContent: 'space-around',
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
  },
});
