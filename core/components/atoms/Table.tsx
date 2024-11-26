import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../../store/selectors/themeSelectors';

interface TableProps {
  data: Array<{
    column1: string | number;
    column2: string | number;
  }>;
}

const Table = ({ data }: TableProps) => {
  const theme = useSelector(selectTheme);

  return (
    <View style={[styles.container]}>
      {/* Table header */}
      <View style={[styles.row]}>
        <Text style={styles.headerCell}>Header 1</Text>
        <Text style={styles.headerCell}>Header 2</Text>
      </View>

      {/* Table rows */}
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.cell, { color: theme.textColor }]}>{row.column1}</Text>
          <Text style={[styles.cell, { color: theme.textColor }]}>{row.column2}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Table;
