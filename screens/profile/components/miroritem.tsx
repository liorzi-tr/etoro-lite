import { View, Text ,FlatList, StyleSheet} from 'react-native';
import { Mirror } from '../../../core/@etoro/types/loginData.interface';
import { RenderPositionItem } from './positionItem';

export const renderMirrorItem = ({ item }: { item: Mirror }) => (
    <View>
      <Text style={styles.mirrorHeader}>{`Mirror ID: ${item.MirrorID}`}</Text>
      <FlatList
        data={item.Positions}
        renderItem={RenderPositionItem}
        keyExtractor={(position) => position.PositionID.toString()}
      />
    </View>
  );

  const styles = StyleSheet.create({
    mirrorHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
      },
  });

