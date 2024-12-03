import {  FlatList, StyleSheet } from "react-native";
import { renderMirrorItem } from './components/miroritem';
import { EtoroRoutes, EtoroScreenProps } from '../../core/@etoro/types';
import { DisplayedColumnsProvider } from './components/displayedColumns.provider';

// TypeScript Interfaces
interface Position {
  PositionID: number;
  CID: number;
  OpenDateTime: string;
  OpenRate: number;
  InstrumentID: number;
  IsBuy: boolean;
  TakeProfitRate: number;
  StopLossRate: number;
  Amount: number;
  Leverage: number;
  Units: number;
  TotalFees: number;
  InitialAmountInDollars: number;
  IsSettled: boolean;
}

interface Mirror {
  MirrorID: number;
  CID: number;
  ParentCID: number;
  StopLossPercentage: number;
  IsPaused: boolean;
  CopyExistingPositions: boolean;
  AvailableAmount: number;
  StopLossAmount: number;
  InitialInvestment: number;
  Positions: Position[];
}

// Sample Data
const sampleMirrors: Mirror[] = [
  {
    MirrorID: 1,
    CID: 123,
    ParentCID: 456,
    StopLossPercentage: 5,
    IsPaused: false,
    CopyExistingPositions: true,
    AvailableAmount: 1000,
    StopLossAmount: 50,
    InitialInvestment: 2000,
    Positions: [
      {
        PositionID: 1,
        CID: 123,
        OpenDateTime: "2024-12-01T12:00:00Z",
        OpenRate: 602.55,
        InstrumentID: 101,
        IsBuy: true,
        TakeProfitRate: 700,
        StopLossRate: 550,
        Amount: 8000,
        Leverage: 2,
        Units: 100,
        TotalFees: 15,
        InitialAmountInDollars: 5000,
        IsSettled: false,
      },
    ],
  },
];

export default function Portfolio({ navigation }: EtoroScreenProps<EtoroRoutes.Portfolio>){
  return (
    <DisplayedColumnsProvider columns={[]}>

    <FlatList
      data={sampleMirrors}
      renderItem={renderMirrorItem}
      keyExtractor={(mirror) => mirror.MirrorID.toString()}
      contentContainerStyle={styles.container}
    />
    </DisplayedColumnsProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
 
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

