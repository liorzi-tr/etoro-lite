import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { PositionGroup } from '../../portfolio/screens/PortfolioScreen';

interface RenderItemProps {
  item: PositionGroup;
  onPress:()=>void
}

export  default function renderMirrorItem({ item, onPress }: RenderItemProps) {
  const { instrument, positions, totalUnits } = item;

  return (
    <Pressable onPress={onPress}>
    <View style={styles.container}>
      {/* Instrument Header */}
      <View style={styles.header}>
        <Image style={{
            width: 50,
            height: 50,
            borderRadius:8,
            borderWidth:  instrument.IsMarketOpen?1:0,
            borderColor:'transparent'
        }
        }
        source={{uri:item.instrument.Images[0].Uri}}/>
        <View style={{
            flexDirection:'column',
            paddingBlockStart:3,
            paddingInlineStart:3,
            gap:5,
        }}>

        {/* <Text style={styles.instrumentName}>{instrument.InstrumentDisplayName}</Text> */}
        <Text style={styles.symbolText}>{instrument.SymbolFull}</Text>
        </View>
      </View>

      {/* Position Details */}
      <View style={styles.details}>
        <Text style={styles.detailText}> {totalUnits}</Text>
        <Text style={styles.detailText}>
          {instrument.OfficialClosingPrice.toFixed(2)}
        </Text>
      </View>
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection:'row',
    // minHeight: 130,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    width: '30%'
  },
  instrumentName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  symbolText: {
    fontSize: 16,
    color: '#666',
  },
  details: {
    flex:1,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 8,
    alignContent:'space-around',
  },
  detailText: {
    fontSize: 18,
    color: '#444',
  },
  marketStatus: {
    fontSize: 14,
    color: '#007AFF',
  },
  positionsList: {
    marginTop: 8,
  },
  positionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  positionText: {
    fontSize: 14,
    color: '#666',
  },
});
