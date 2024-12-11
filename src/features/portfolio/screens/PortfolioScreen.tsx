import { FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Loader from '../../../core/components/Loader';
import { selectTheme } from '../../../store/selectors/themeSelectors';
import { routes } from '../../../core/constants/routes';
import { useCallback } from 'react';
import MirrorItem from '../components/MirrorItem';
import { useNavigation } from '@react-navigation/native';
import { getPortfolioData } from '../services/PortfolioService';
import { useQuery } from '@tanstack/react-query';
import { PositionGroup } from '../types';

export default function PortfolioScreen() {
  const theme = useSelector(selectTheme);
  const navigation = useNavigation<any>();
  const { isLoading, error, data } = useQuery<PositionGroup[], Error>({
    queryKey: ['portfolioData'],
    queryFn: getPortfolioData,
  });

  const handleInstrumentPress = useCallback((instrumentSymbol: string) => {
    navigation.navigate(routes.MarketPage, { instrument: instrumentSymbol });
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          <MirrorItem
            item={item}
            onPress={() => handleInstrumentPress(item.instrument.SymbolFull)}
          />
        }
        keyExtractor={(mirror) => mirror.instrument.InstrumentID.toString()}
        contentContainerStyle={[styles.container, { backgroundColor: theme.topBackgroundColor }]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    fontSize: 14,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});
