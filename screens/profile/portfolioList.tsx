import {  ActivityIndicator, FlatList, StyleSheet, View,Text } from "react-native";
import renderMirrorItem from './components/miroritem';
import { EtoroRoutes, EtoroScreenProps } from '../../core/@etoro/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchInstruments, ResultInstrument } from '../../core/services/instrumentsRepo';
import  fetchLoginData from '../../core/services/loginData/loginData.service';
import { LoginDataResponse } from '../../core/@etoro/types/loginData.interface';
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
    const  queryClient = useQueryClient();
    
    const {isLoading,error,data} = useQuery({queryKey:['instrumentMeta'], queryFn:async ()=>{
        const [instruments, loginData] = await Promise.all([
            fetchInstruments(),
            fetchLoginData()
          ]);
          return groupPositionsWithInstruments(loginData, instruments);}, })
     
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
      renderItem={(item)=>renderMirrorItem({item:item.item,
        onPress:()=>navigation.navigate(EtoroRoutes.MarketPage, { instrument:item.item.instrument.InstrumentID.toString() })
      })}
      keyExtractor={(mirror) => mirror.instrument.InstrumentID.toString()}
      contentContainerStyle={styles.container}
    />
    </>
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
export interface  PositionGroup {
    instrument: ResultInstrument;
    positions: Position[];
    totalUnits: number;
  }
export const groupPositionsWithInstruments = (
    loginData: LoginDataResponse,
    instruments: {[key: number]: ResultInstrument}
  ): PositionGroup[] => {
    const groupedPositions: {[key: number]: PositionGroup} = {};
  
    // Group positions by InstrumentID and add instrument data
    loginData.AggregatedResult?.ApiResponses?.PrivatePortfolio?.Content.ClientPortfolio?.Positions.forEach(position => {
      const instrumentId = position.InstrumentID;
      const instrument = instruments[instrumentId];
  
      if (!groupedPositions[instrumentId]) {
        groupedPositions[instrumentId] = {
          instrument,
          positions: [],
          totalUnits: 0
        };
      }
  
      groupedPositions[instrumentId].positions.push(position);
      groupedPositions[instrumentId].totalUnits += position.Amount;
    });
  
    return Object.values(groupedPositions);
  };