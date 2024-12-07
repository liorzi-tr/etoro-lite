import { View , StyleSheet ,Text} from 'react-native';
import { Position } from '../../../core/@etoro/types/login-data';

const renderColumn = (position: Position, column: string) => {
    switch (column) {
      case "Amount":
        return <Text style={styles.text}>{`$${position.Amount.toFixed(2)}`}</Text>;
      case "Leverage":
        return <Text style={styles.text}>{`x${position.Leverage}`}</Text>;
      case "InitialAmountInDollars":
        return (
          <Text style={styles.text}>{`$${position.InitialAmountInDollars.toFixed(2)}`}</Text>
        );
      default:
        return null;
    }
  };
export function RenderPositionItem ({ item }: { item: Position })  {
const displayedColumns = ['Leverage']
//useSelector((state: RootState) => state.portfolioColumns.displayedColumns);

    return <View style={styles.row}>
      {/* Static Leftmost Column */}
      <View style={styles.leftColumn}>
        <Text style={styles.name}>{`Position ID: ${item.PositionID}`}</Text>
        <Text style={styles.details}>{`CID: ${item.CID}`}</Text>
      </View>

      {/* Configurable Columns */}
      <View style={styles.rightColumns}>
        {displayedColumns.map((column) => (
          <View key={column} style={styles.column}>
            {renderColumn(item, column)}
          </View>
        ))}
      </View>
    </View>
};

  const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      },
      leftColumn: {
        flexDirection: "column",
        flex: 2,
      },
      name: {
        fontSize: 16,
        fontWeight: "bold",
      },
      details: {
        fontSize: 14,
        color: "#555",
      },
      rightColumns: {
        flexDirection: "row",
        flex: 3,
        justifyContent: "space-around",
      },
      column: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      },
      text: {
        fontSize: 14,
      },
  });
