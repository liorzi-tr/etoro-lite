import { Mirror } from "../types";

export const sampleMirrors: Mirror[] = [
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