import React, { useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axiosInstance, { InterceptorConfig } from "../../core/utils/api";

const interceptorConfig: InterceptorConfig = {
    addHeaders: {
      gatewayAppId: true,
      appDomain: true,
      deviceId: true,
      auhtorization: true,
      applicationidentifier: true,
      accounttype: true,
      applicationversion: true,
      useragent: true
    }
  };

const HomeScreen = () => {
  const rawData = [
    {
      "timestamp": "2024-07-16T00:00:00Z",
      "cash": 15247.77,
      "investment": 7149.93,
      "pnL": 3460.51,
      "inProcessCashouts": 0.00,
      "equity": 25858.21
    },
    {
      "timestamp": "2024-07-17T00:00:00Z",
      "cash": 15247.76,
      "investment": 7150.93,
      "pnL": 3474.65,
      "inProcessCashouts": 0.00,
      "equity": 25873.34
    },
    {
      "timestamp": "2024-07-18T00:00:00Z",
      "cash": 15247.75,
      "investment": 7149.73,
      "pnL": 3300.40,
      "inProcessCashouts": 0.00,
      "equity": 25697.88
    },
    {
      "timestamp": "2024-07-19T00:00:00Z",
      "cash": 15247.74,
      "investment": 7144.22,
      "pnL": 3246.40,
      "inProcessCashouts": 0.00,
      "equity": 25638.36
    },
    {
      "timestamp": "2024-07-20T00:00:00Z",
      "cash": 15247.73,
      "investment": 7145.64,
      "pnL": 3339.76,
      "inProcessCashouts": 0.00,
      "equity": 25733.13
    },
    {
      "timestamp": "2024-07-21T00:00:00Z",
      "cash": 15247.72,
      "investment": 7145.64,
      "pnL": 3383.01,
      "inProcessCashouts": 0.00,
      "equity": 25776.37
    },
    {
      "timestamp": "2024-07-22T00:00:00Z",
      "cash": 15247.71,
      "investment": 7145.64,
      "pnL": 3494.12,
      "inProcessCashouts": 0.00,
      "equity": 25887.47
    },
    {
      "timestamp": "2024-07-23T00:00:00Z",
      "cash": 15247.70,
      "investment": 7145.66,
      "pnL": 3456.68,
      "inProcessCashouts": 0.00,
      "equity": 25850.04
    },
    {
      "timestamp": "2024-07-24T00:00:00Z",
      "cash": 15247.69,
      "investment": 7146.68,
      "pnL": 3349.84,
      "inProcessCashouts": 0.00,
      "equity": 25744.21
    },
    {
      "timestamp": "2024-07-25T00:00:00Z",
      "cash": 15247.87,
      "investment": 7142.34,
      "pnL": 3159.26,
      "inProcessCashouts": 0.00,
      "equity": 25549.47
    },
    {
      "timestamp": "2024-07-26T00:00:00Z",
      "cash": 15237.72,
      "investment": 7206.70,
      "pnL": 3041.25,
      "inProcessCashouts": 0.00,
      "equity": 25485.67
    },
    {
      "timestamp": "2024-07-27T00:00:00Z",
      "cash": 15237.71,
      "investment": 7232.83,
      "pnL": 3235.58,
      "inProcessCashouts": 0.00,
      "equity": 25706.12
    },
    {
      "timestamp": "2024-07-28T00:00:00Z",
      "cash": 15237.70,
      "investment": 7232.83,
      "pnL": 3236.01,
      "inProcessCashouts": 0.00,
      "equity": 25706.54
    },
    {
      "timestamp": "2024-07-29T00:00:00Z",
      "cash": 15237.69,
      "investment": 7232.83,
      "pnL": 3253.79,
      "inProcessCashouts": 0.00,
      "equity": 25724.31
    },
    {
      "timestamp": "2024-07-30T00:00:00Z",
      "cash": 15237.68,
      "investment": 7232.84,
      "pnL": 3206.25,
      "inProcessCashouts": 0.00,
      "equity": 25676.77
    },
    {
      "timestamp": "2024-07-31T00:00:00Z",
      "cash": 15237.67,
      "investment": 7228.36,
      "pnL": 3152.07,
      "inProcessCashouts": 0.00,
      "equity": 25618.10
    },
    {
      "timestamp": "2024-08-01T00:00:00Z",
      "cash": 15237.66,
      "investment": 7229.53,
      "pnL": 3123.27,
      "inProcessCashouts": 0.00,
      "equity": 25590.46
    },
    {
      "timestamp": "2024-08-02T00:00:00Z",
      "cash": 15237.65,
      "investment": 7228.73,
      "pnL": 3034.43,
      "inProcessCashouts": 0.00,
      "equity": 25500.81
    },
    {
      "timestamp": "2024-08-03T00:00:00Z",
      "cash": 15237.80,
      "investment": 7264.29,
      "pnL": 2613.20,
      "inProcessCashouts": 0.00,
      "equity": 25115.29
    },
    {
      "timestamp": "2024-08-04T00:00:00Z",
      "cash": 15237.79,
      "investment": 7264.29,
      "pnL": 2509.55,
      "inProcessCashouts": 0.00,
      "equity": 25011.63
    },
    {
      "timestamp": "2024-08-05T00:00:00Z",
      "cash": 15237.78,
      "investment": 7245.77,
      "pnL": 2322.60,
      "inProcessCashouts": 0.00,
      "equity": 24806.15
    },
    {
      "timestamp": "2024-08-06T00:00:00Z",
      "cash": 15237.77,
      "investment": 7220.47,
      "pnL": 1972.26,
      "inProcessCashouts": 0.00,
      "equity": 24430.50
    },
    {
      "timestamp": "2024-08-07T00:00:00Z",
      "cash": 15237.76,
      "investment": 7220.51,
      "pnL": 2175.66,
      "inProcessCashouts": 0.00,
      "equity": 24633.93
    },
    {
      "timestamp": "2024-08-08T00:00:00Z",
      "cash": 15237.75,
      "investment": 7220.88,
      "pnL": 2118.30,
      "inProcessCashouts": 0.00,
      "equity": 24576.93
    },
    {
      "timestamp": "2024-08-09T00:00:00Z",
      "cash": 15237.74,
      "investment": 7221.11,
      "pnL": 2632.43,
      "inProcessCashouts": 0.00,
      "equity": 25091.28
    },
    {
      "timestamp": "2024-08-10T00:00:00Z",
      "cash": 15237.73,
      "investment": 7221.67,
      "pnL": 2561.25,
      "inProcessCashouts": 0.00,
      "equity": 25020.65
    },
    {
      "timestamp": "2024-08-11T00:00:00Z",
      "cash": 15237.72,
      "investment": 7221.67,
      "pnL": 2572.75,
      "inProcessCashouts": 0.00,
      "equity": 25032.14
    },
    {
      "timestamp": "2024-08-12T00:00:00Z",
      "cash": 15237.71,
      "investment": 7221.67,
      "pnL": 2390.96,
      "inProcessCashouts": 0.00,
      "equity": 24850.34
    },
    {
      "timestamp": "2024-08-13T00:00:00Z",
      "cash": 15237.70,
      "investment": 7221.95,
      "pnL": 2515.24,
      "inProcessCashouts": 0.00,
      "equity": 24974.89
    },
    {
      "timestamp": "2024-08-14T00:00:00Z",
      "cash": 15237.69,
      "investment": 7222.11,
      "pnL": 2630.52,
      "inProcessCashouts": 0.00,
      "equity": 25090.32
    },
    {
      "timestamp": "2024-08-15T00:00:00Z",
      "cash": 15237.68,
      "investment": 7222.03,
      "pnL": 2560.25,
      "inProcessCashouts": 0.00,
      "equity": 25019.96
    },
    {
      "timestamp": "2024-08-16T00:00:00Z",
      "cash": 15244.55,
      "investment": 7223.06,
      "pnL": 2561.99,
      "inProcessCashouts": 0.00,
      "equity": 25029.60
    },
    {
      "timestamp": "2024-08-17T00:00:00Z",
      "cash": 15244.54,
      "investment": 7223.08,
      "pnL": 2618.36,
      "inProcessCashouts": 0.00,
      "equity": 25085.98
    },
    {
      "timestamp": "2024-08-18T00:00:00Z",
      "cash": 15244.53,
      "investment": 7223.08,
      "pnL": 2670.05,
      "inProcessCashouts": 0.00,
      "equity": 25137.66
    },
    {
      "timestamp": "2024-08-19T00:00:00Z",
      "cash": 15244.52,
      "investment": 7223.08,
      "pnL": 2626.78,
      "inProcessCashouts": 30.00,
      "equity": 25064.38
    },
    {
      "timestamp": "2024-08-20T00:00:00Z",
      "cash": 15244.51,
      "investment": 7230.03,
      "pnL": 2769.11,
      "inProcessCashouts": 0.00,
      "equity": 25243.65
    },
    {
      "timestamp": "2024-08-21T00:00:00Z",
      "cash": 15244.50,
      "investment": 7232.47,
      "pnL": 2749.42,
      "inProcessCashouts": 0.00,
      "equity": 25226.39
    },
    {
      "timestamp": "2024-08-22T00:00:00Z",
      "cash": 15244.49,
      "investment": 7242.58,
      "pnL": 2869.66,
      "inProcessCashouts": 0.00,
      "equity": 25356.73
    },
    {
      "timestamp": "2024-08-23T00:00:00Z",
      "cash": 15244.48,
      "investment": 7242.56,
      "pnL": 2803.26,
      "inProcessCashouts": 0.00,
      "equity": 25290.30
    },
    {
      "timestamp": "2024-08-24T00:00:00Z",
      "cash": 15244.47,
      "investment": 7244.59,
      "pnL": 3062.29,
      "inProcessCashouts": 0.00,
      "equity": 25551.35
    },
    {
      "timestamp": "2024-08-25T00:00:00Z",
      "cash": 15244.46,
      "investment": 7244.59,
      "pnL": 3099.00,
      "inProcessCashouts": 0.00,
      "equity": 25588.05
    },
    {
      "timestamp": "2024-08-26T00:00:00Z",
      "cash": 15244.45,
      "investment": 7244.59,
      "pnL": 3056.78,
      "inProcessCashouts": 0.00,
      "equity": 25545.82
    },
    {
      "timestamp": "2024-08-27T00:00:00Z",
      "cash": 15244.45,
      "investment": 7248.53,
      "pnL": 2905.18,
      "inProcessCashouts": 0.00,
      "equity": 25398.16
    },
    {
      "timestamp": "2024-08-28T00:00:00Z",
      "cash": 15246.44,
      "investment": 7249.72,
      "pnL": 2669.30,
      "inProcessCashouts": 2.00,
      "equity": 25163.46
    },
    {
      "timestamp": "2024-08-29T00:00:00Z",
      "cash": 15246.43,
      "investment": 7250.03,
      "pnL": 2605.91,
      "inProcessCashouts": 2.00,
      "equity": 25100.37
    },
    {
      "timestamp": "2024-08-30T00:00:00Z",
      "cash": 15244.42,
      "investment": 7250.27,
      "pnL": 2608.05,
      "inProcessCashouts": 0.00,
      "equity": 25102.74
    },
    {
      "timestamp": "2024-08-31T00:00:00Z",
      "cash": 15244.41,
      "investment": 7249.15,
      "pnL": 2645.09,
      "inProcessCashouts": 0.00,
      "equity": 25138.65
    },
    {
      "timestamp": "2024-09-01T00:00:00Z",
      "cash": 15244.40,
      "investment": 7249.15,
      "pnL": 2618.12,
      "inProcessCashouts": 0.00,
      "equity": 25111.67
    },
    {
      "timestamp": "2024-09-02T00:00:00Z",
      "cash": 15214.39,
      "investment": 7249.25,
      "pnL": 2482.52,
      "inProcessCashouts": 0.00,
      "equity": 24946.16
    },
    {
      "timestamp": "2024-09-03T00:00:00Z",
      "cash": 15214.38,
      "investment": 7249.27,
      "pnL": 2613.98,
      "inProcessCashouts": 0.00,
      "equity": 25077.63
    },
    {
      "timestamp": "2024-09-04T00:00:00Z",
      "cash": 15214.37,
      "investment": 7250.40,
      "pnL": 2397.14,
      "inProcessCashouts": 0.00,
      "equity": 24861.91
    },
    {
      "timestamp": "2024-09-05T00:00:00Z",
      "cash": 15214.36,
      "investment": 7253.45,
      "pnL": 2442.84,
      "inProcessCashouts": 0.00,
      "equity": 24910.65
    },
    {
      "timestamp": "2024-09-06T00:00:00Z",
      "cash": 15214.35,
      "investment": 7253.47,
      "pnL": 2328.28,
      "inProcessCashouts": 0.00,
      "equity": 24796.10
    },
    {
      "timestamp": "2024-09-07T00:00:00Z",
      "cash": 15214.34,
      "investment": 7253.56,
      "pnL": 2115.42,
      "inProcessCashouts": 0.00,
      "equity": 24583.32
    },
    {
      "timestamp": "2024-09-08T00:00:00Z",
      "cash": 15214.33,
      "investment": 7253.56,
      "pnL": 2166.79,
      "inProcessCashouts": 0.00,
      "equity": 24634.68
    },
    {
      "timestamp": "2024-09-09T00:00:00Z",
      "cash": 15214.32,
      "investment": 7253.56,
      "pnL": 2230.62,
      "inProcessCashouts": 0.00,
      "equity": 24698.50
    },
    {
      "timestamp": "2024-09-10T00:00:00Z",
      "cash": 15214.31,
      "investment": 7253.72,
      "pnL": 2410.98,
      "inProcessCashouts": 0.00,
      "equity": 24879.01
    },
    {
      "timestamp": "2024-09-11T00:00:00Z",
      "cash": 15214.30,
      "investment": 7253.85,
      "pnL": 2486.30,
      "inProcessCashouts": 0.00,
      "equity": 24954.45
    },
    {
      "timestamp": "2024-09-12T00:00:00Z",
      "cash": 15214.29,
      "investment": 7251.63,
      "pnL": 2493.68,
      "inProcessCashouts": 0.00,
      "equity": 24959.60
    },
    {
      "timestamp": "2024-09-13T00:00:00Z",
      "cash": 15218.28,
      "investment": 7251.87,
      "pnL": 2568.16,
      "inProcessCashouts": 2.00,
      "equity": 25036.31
    },
    {
      "timestamp": "2024-09-14T00:00:00Z",
      "cash": 15216.27,
      "investment": 7254.05,
      "pnL": 2698.15,
      "inProcessCashouts": 0.00,
      "equity": 25168.47
    },
    {
      "timestamp": "2024-09-15T00:00:00Z",
      "cash": 15216.26,
      "investment": 7254.05,
      "pnL": 2666.68,
      "inProcessCashouts": 0.00,
      "equity": 25136.99
    },
    {
      "timestamp": "2024-09-16T00:00:00Z",
      "cash": 15216.25,
      "investment": 7254.05,
      "pnL": 2565.79,
      "inProcessCashouts": 0.00,
      "equity": 25036.09
    },
    {
      "timestamp": "2024-09-17T00:00:00Z",
      "cash": 15214.24,
      "investment": 7254.10,
      "pnL": 2520.24,
      "inProcessCashouts": 0.00,
      "equity": 24988.58
    },
    {
      "timestamp": "2024-09-18T00:00:00Z",
      "cash": 15215.23,
      "investment": 7254.68,
      "pnL": 2589.95,
      "inProcessCashouts": 0.00,
      "equity": 25059.86
    },
    {
      "timestamp": "2024-09-19T00:00:00Z",
      "cash": 15215.22,
      "investment": 7254.85,
      "pnL": 2651.17,
      "inProcessCashouts": 0.00,
      "equity": 25121.24
    },
    {
      "timestamp": "2024-09-20T00:00:00Z",
      "cash": 15214.21,
      "investment": 7255.18,
      "pnL": 2859.22,
      "inProcessCashouts": 0.00,
      "equity": 25328.61
    },
    {
      "timestamp": "2024-09-21T00:00:00Z",
      "cash": 15214.20,
      "investment": 7255.38,
      "pnL": 2904.10,
      "inProcessCashouts": 0.00,
      "equity": 25373.68
    },
    {
      "timestamp": "2024-09-22T00:00:00Z",
      "cash": 15214.19,
      "investment": 7255.38,
      "pnL": 2960.91,
      "inProcessCashouts": 0.00,
      "equity": 25430.48
    },
    {
      "timestamp": "2024-09-23T00:00:00Z",
      "cash": 15214.18,
      "investment": 7255.38,
      "pnL": 2918.57,
      "inProcessCashouts": 0.00,
      "equity": 25388.13
    },
    {
      "timestamp": "2024-09-24T00:00:00Z",
      "cash": 15214.17,
      "investment": 7255.55,
      "pnL": 2968.82,
      "inProcessCashouts": 0.00,
      "equity": 25438.54
    },
    {
      "timestamp": "2024-09-25T00:00:00Z",
      "cash": 15214.16,
      "investment": 7255.57,
      "pnL": 3110.76,
      "inProcessCashouts": 0.00,
      "equity": 25580.49
    },
    {
      "timestamp": "2024-09-26T00:00:00Z",
      "cash": 15214.15,
      "investment": 7256.56,
      "pnL": 2999.09,
      "inProcessCashouts": 0.00,
      "equity": 25469.80
    },
    {
      "timestamp": "2024-09-27T00:00:00Z",
      "cash": 15214.17,
      "investment": 7257.37,
      "pnL": 3213.12,
      "inProcessCashouts": 0.00,
      "equity": 25684.66
    },
    {
      "timestamp": "2024-09-28T00:00:00Z",
      "cash": 15214.16,
      "investment": 7257.39,
      "pnL": 3289.77,
      "inProcessCashouts": 0.00,
      "equity": 25761.32
    },
    {
      "timestamp": "2024-09-29T00:00:00Z",
      "cash": 15214.15,
      "investment": 7257.39,
      "pnL": 3272.24,
      "inProcessCashouts": 0.00,
      "equity": 25743.78
    },
    {
      "timestamp": "2024-09-30T00:00:00Z",
      "cash": 15214.14,
      "investment": 7257.39,
      "pnL": 3266.85,
      "inProcessCashouts": 0.00,
      "equity": 25738.38
    },
    {
      "timestamp": "2024-10-01T00:00:00Z",
      "cash": 15215.13,
      "investment": 7281.56,
      "pnL": 3097.57,
      "inProcessCashouts": 0.00,
      "equity": 25594.26
    },
    {
      "timestamp": "2024-10-02T00:00:00Z",
      "cash": 15217.12,
      "investment": 7311.28,
      "pnL": 2861.89,
      "inProcessCashouts": 0.00,
      "equity": 25390.29
    },
    {
      "timestamp": "2024-10-03T00:00:00Z",
      "cash": 15214.11,
      "investment": 7343.59,
      "pnL": 2794.02,
      "inProcessCashouts": 0.00,
      "equity": 25351.72
    },
    {
      "timestamp": "2024-10-04T00:00:00Z",
      "cash": 15214.10,
      "investment": 7343.59,
      "pnL": 2766.18,
      "inProcessCashouts": 0.00,
      "equity": 25323.87
    },
    {
      "timestamp": "2024-10-05T00:00:00Z",
      "cash": 15214.09,
      "investment": 7343.61,
      "pnL": 2945.64,
      "inProcessCashouts": 0.00,
      "equity": 25503.34
    },
    {
      "timestamp": "2024-10-06T00:00:00Z",
      "cash": 15214.08,
      "investment": 7343.61,
      "pnL": 2940.12,
      "inProcessCashouts": 0.00,
      "equity": 25497.81
    },
    {
      "timestamp": "2024-10-07T00:00:00Z",
      "cash": 15214.07,
      "investment": 7343.61,
      "pnL": 2999.33,
      "inProcessCashouts": 0.00,
      "equity": 25557.01
    },
    {
      "timestamp": "2024-10-08T00:00:00Z",
      "cash": 15214.06,
      "investment": 7369.97,
      "pnL": 2883.20,
      "inProcessCashouts": 0.00,
      "equity": 25467.23
    },
    {
      "timestamp": "2024-10-09T00:00:00Z",
      "cash": 15214.05,
      "investment": 7370.82,
      "pnL": 2910.59,
      "inProcessCashouts": 0.00,
      "equity": 25495.46
    },
    {
      "timestamp": "2024-10-10T00:00:00Z",
      "cash": 15214.04,
      "investment": 7371.28,
      "pnL": 2848.89,
      "inProcessCashouts": 0.00,
      "equity": 25434.21
    },
    {
      "timestamp": "2024-10-11T00:00:00Z",
      "cash": 15214.03,
      "investment": 7371.25,
      "pnL": 2855.34,
      "inProcessCashouts": 0.00,
      "equity": 25440.62
    },
    {
      "timestamp": "2024-10-12T00:00:00Z",
      "cash": 15214.02,
      "investment": 7361.98,
      "pnL": 2985.99,
      "inProcessCashouts": 0.00,
      "equity": 25561.99
    },
    {
      "timestamp": "2024-10-13T00:00:00Z",
      "cash": 15214.01,
      "investment": 7361.98,
      "pnL": 3026.77,
      "inProcessCashouts": 0.00,
      "equity": 25602.76
    },
    {
      "timestamp": "2024-10-14T00:00:00Z",
      "cash": 15214.00,
      "investment": 7361.98,
      "pnL": 3002.42,
      "inProcessCashouts": 0.00,
      "equity": 25578.40
    },
    {
      "timestamp": "2024-10-15T00:00:00Z",
      "cash": 15237.99,
      "investment": 7381.71,
      "pnL": 3220.68,
      "inProcessCashouts": 0.00,
      "equity": 25840.38
    },
    {
      "timestamp": "2024-10-16T00:00:00Z",
      "cash": 15237.98,
      "investment": 7371.19,
      "pnL": 3129.33,
      "inProcessCashouts": 0.00,
      "equity": 25738.50
    },
    {
      "timestamp": "2024-10-17T00:00:00Z",
      "cash": 15237.97,
      "investment": 7371.16,
      "pnL": 3161.95,
      "inProcessCashouts": 0.00,
      "equity": 25771.08
    },
    {
      "timestamp": "2024-10-18T00:00:00Z",
      "cash": 15237.96,
      "investment": 7370.85,
      "pnL": 3100.50,
      "inProcessCashouts": 0.00,
      "equity": 25709.31
    },
    {
      "timestamp": "2024-10-19T00:00:00Z",
      "cash": 15237.95,
      "investment": 7371.21,
      "pnL": 3209.23,
      "inProcessCashouts": 0.00,
      "equity": 25818.39
    },
    {
      "timestamp": "2024-10-20T00:00:00Z",
      "cash": 15237.94,
      "investment": 7371.21,
      "pnL": 3228.41,
      "inProcessCashouts": 0.00,
      "equity": 25837.56
    },
    {
      "timestamp": "2024-10-21T00:00:00Z",
      "cash": 15237.93,
      "investment": 7371.21,
      "pnL": 3332.87,
      "inProcessCashouts": 0.00,
      "equity": 25942.01
    },
    {
      "timestamp": "2024-10-22T00:00:00Z",
      "cash": 15237.92,
      "investment": 7371.16,
      "pnL": 3232.58,
      "inProcessCashouts": 0.00,
      "equity": 25841.66
    },
    {
      "timestamp": "2024-10-23T00:00:00Z",
      "cash": 15237.91,
      "investment": 7371.11,
      "pnL": 3229.65,
      "inProcessCashouts": 0.00,
      "equity": 25838.67
    },
    {
      "timestamp": "2024-10-24T00:00:00Z",
      "cash": 15238.09,
      "investment": 7370.98,
      "pnL": 3083.99,
      "inProcessCashouts": 0.00,
      "equity": 25693.06
    },
    {
      "timestamp": "2024-10-25T00:00:00Z",
      "cash": 15238.08,
      "investment": 7370.97,
      "pnL": 3240.41,
      "inProcessCashouts": 0.00,
      "equity": 25849.46
    },
    {
      "timestamp": "2024-10-26T00:00:00Z",
      "cash": 15238.07,
      "investment": 7370.92,
      "pnL": 3061.40,
      "inProcessCashouts": 0.00,
      "equity": 25670.39
    },
    {
      "timestamp": "2024-10-27T00:00:00Z",
      "cash": 15237.92,
      "investment": 7370.92,
      "pnL": 3120.03,
      "inProcessCashouts": 0.00,
      "equity": 25728.87
    },
    {
      "timestamp": "2024-10-28T00:00:00Z",
      "cash": 15237.91,
      "investment": 7370.92,
      "pnL": 3185.01,
      "inProcessCashouts": 0.00,
      "equity": 25793.84
    },
    {
      "timestamp": "2024-10-29T00:00:00Z",
      "cash": 15237.90,
      "investment": 7371.06,
      "pnL": 3291.00,
      "inProcessCashouts": 0.00,
      "equity": 25899.96
    },
    {
      "timestamp": "2024-10-30T00:00:00Z",
      "cash": 15237.89,
      "investment": 7371.05,
      "pnL": 3454.49,
      "inProcessCashouts": 0.00,
      "equity": 26063.43
    },
    {
      "timestamp": "2024-10-31T00:00:00Z",
      "cash": 15237.88,
      "investment": 7370.89,
      "pnL": 3448.01,
      "inProcessCashouts": 0.00,
      "equity": 26056.78
    },
    {
      "timestamp": "2024-11-01T00:00:00Z",
      "cash": 15237.87,
      "investment": 7370.84,
      "pnL": 3203.76,
      "inProcessCashouts": 0.00,
      "equity": 25812.47
    },
    {
      "timestamp": "2024-11-02T00:00:00Z",
      "cash": 15237.86,
      "investment": 7365.51,
      "pnL": 3188.08,
      "inProcessCashouts": 0.00,
      "equity": 25791.45
    },
    {
      "timestamp": "2024-11-03T00:00:00Z",
      "cash": 15237.85,
      "investment": 7365.51,
      "pnL": 3169.93,
      "inProcessCashouts": 0.00,
      "equity": 25773.29
    },
    {
      "timestamp": "2024-11-04T00:00:00Z",
      "cash": 15237.84,
      "investment": 7365.51,
      "pnL": 3099.24,
      "inProcessCashouts": 0.00,
      "equity": 25702.59
    },
    {
      "timestamp": "2024-11-05T00:00:00Z",
      "cash": 15237.83,
      "investment": 7369.11,
      "pnL": 2996.58,
      "inProcessCashouts": 0.00,
      "equity": 25603.52
    },
    {
      "timestamp": "2024-11-06T00:00:00Z",
      "cash": 15237.82,
      "investment": 7365.35,
      "pnL": 3200.71,
      "inProcessCashouts": 0.00,
      "equity": 25803.88
    },
    {
      "timestamp": "2024-11-07T00:00:00Z",
      "cash": 15237.81,
      "investment": 7359.77,
      "pnL": 3715.01,
      "inProcessCashouts": 0.00,
      "equity": 26312.59
    },
    {
      "timestamp": "2024-11-08T00:00:00Z",
      "cash": 15237.80,
      "investment": 7372.62,
      "pnL": 3915.42,
      "inProcessCashouts": 0.00,
      "equity": 26525.84
    },
    {
      "timestamp": "2024-11-09T00:00:00Z",
      "cash": 15237.79,
      "investment": 7380.10,
      "pnL": 3983.66,
      "inProcessCashouts": 0.00,
      "equity": 26601.55
    },
    {
      "timestamp": "2024-11-10T00:00:00Z",
      "cash": 15237.78,
      "investment": 7380.10,
      "pnL": 4078.73,
      "inProcessCashouts": 0.00,
      "equity": 26696.61
    },
    {
      "timestamp": "2024-11-11T00:00:00Z",
      "cash": 15237.77,
      "investment": 7380.10,
      "pnL": 4316.47,
      "inProcessCashouts": 0.00,
      "equity": 26934.34
    },
    {
      "timestamp": "2024-11-12T00:00:00Z",
      "cash": 15237.76,
      "investment": 7380.01,
      "pnL": 4662.75,
      "inProcessCashouts": 0.00,
      "equity": 27280.52
    },
    {
      "timestamp": "2024-11-13T00:00:00Z",
      "cash": 15237.75,
      "investment": 7382.94,
      "pnL": 4428.29,
      "inProcessCashouts": 0.00,
      "equity": 27048.98
    },
    {
      "timestamp": "2024-11-14T00:00:00Z",
      "cash": 15237.74,
      "investment": 7386.50,
      "pnL": 4423.41,
      "inProcessCashouts": 0.00,
      "equity": 27047.65
    },
    {
      "timestamp": "2024-11-15T00:00:00Z",
      "cash": 15237.73,
      "investment": 7378.56,
      "pnL": 4236.40,
      "inProcessCashouts": 0.00,
      "equity": 26852.69
    },
    {
      "timestamp": "2024-11-16T00:00:00Z",
      "cash": 15244.60,
      "investment": 7378.79,
      "pnL": 4386.43,
      "inProcessCashouts": 0.00,
      "equity": 27009.82
    },
    {
      "timestamp": "2024-11-17T00:00:00Z",
      "cash": 15244.59,
      "investment": 7378.79,
      "pnL": 4581.69,
      "inProcessCashouts": 0.00,
      "equity": 27205.07
    },
    {
      "timestamp": "2024-11-18T00:00:00Z",
      "cash": 15244.58,
      "investment": 7378.79,
      "pnL": 4538.62,
      "inProcessCashouts": 0.00,
      "equity": 27161.99
    },
    {
      "timestamp": "2024-11-19T00:00:00Z",
      "cash": 15244.57,
      "investment": 7378.74,
      "pnL": 4761.02,
      "inProcessCashouts": 30.00,
      "equity": 27354.33
    },
    {
      "timestamp": "2024-11-20T00:00:00Z",
      "cash": 15245.56,
      "investment": 7379.39,
      "pnL": 4808.35,
      "inProcessCashouts": 1.00,
      "equity": 27432.30
    },
    {
      "timestamp": "2024-11-21T00:00:00Z",
      "cash": 15245.55,
      "investment": 7373.72,
      "pnL": 4819.47,
      "inProcessCashouts": 0.00,
      "equity": 27438.74
    },
    {
      "timestamp": "2024-11-22T00:00:00Z",
      "cash": 15245.54,
      "investment": 7373.47,
      "pnL": 5207.66,
      "inProcessCashouts": 0.00,
      "equity": 27826.67
    },
    {
      "timestamp": "2024-11-23T00:00:00Z",
      "cash": 15245.53,
      "investment": 7373.35,
      "pnL": 5528.58,
      "inProcessCashouts": 0.00,
      "equity": 28147.46
    },
    {
      "timestamp": "2024-11-24T00:00:00Z",
      "cash": 15245.52,
      "investment": 7373.35,
      "pnL": 5735.44,
      "inProcessCashouts": 0.00,
      "equity": 28354.31
    },
    {
      "timestamp": "2024-11-25T00:00:00Z",
      "cash": 15245.51,
      "investment": 7373.35,
      "pnL": 5735.46,
      "inProcessCashouts": 0.00,
      "equity": 28354.32
    },
    {
      "timestamp": "2024-11-26T00:00:00Z",
      "cash": 15245.51,
      "investment": 7376.91,
      "pnL": 5431.50,
      "inProcessCashouts": 0.00,
      "equity": 28053.92
    },
    {
      "timestamp": "2024-11-27T00:00:00Z",
      "cash": 15247.50,
      "investment": 7378.31,
      "pnL": 5344.19,
      "inProcessCashouts": 3.00,
      "equity": 27967.00
    },
    {
      "timestamp": "2024-11-28T00:00:00Z",
      "cash": 15245.49,
      "investment": 7378.30,
      "pnL": 5713.71,
      "inProcessCashouts": 0.00,
      "equity": 28337.50
    },
    {
      "timestamp": "2024-11-29T00:00:00Z",
      "cash": 15244.48,
      "investment": 7380.14,
      "pnL": 5685.73,
      "inProcessCashouts": 0.00,
      "equity": 28310.35
    },
    {
      "timestamp": "2024-11-30T00:00:00Z",
      "cash": 15244.47,
      "investment": 7380.05,
      "pnL": 5943.79,
      "inProcessCashouts": 0.00,
      "equity": 28568.31
    },
    {
      "timestamp": "2024-12-02T00:00:00Z",
      "cash": 15244.46,
      "investment": 7381.61,
      "pnL": 5950.09,
      "inProcessCashouts": 0.00,
      "equity": 28576.16
    },
    {
      "timestamp": "2024-12-03T00:00:00Z",
      "cash": 15244.45,
      "investment": 7382.69,
      "pnL": 6123.00,
      "inProcessCashouts": 0.00,
      "equity": 29750.14
    }
  ];


  axiosInstance.get('/sapi/userstats/Equity/UserName/cadetlevel2?mindate=12/1/2023&client_request_id=93a6ff01-32f4-413d-8552-b3d199f33551',
    {interceptorConfig}
  ).then((a) =>{
    console.log('biba');
    console.log(a);
}).catch(error => {
    console.error('Error occurred:', error.message);
    if (error.response) {
        console.error('Response Status:', error.response.status);
        console.error('Response Data:', error.response.data);
    }
});;

  const [timeRange, setTimeRange] = useState("1W"); // Default to 1 week
  const [tooltipData, setTooltipData] = useState(null); // Tooltip state

  const filterDataByTimeRange = (range) => {
    const now = new Date();
    let startDate;

    switch (range) {
      case "1W":
        startDate = new Date();
        startDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 3);
        break;
      case "6M":
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 6);
        break;
      case "YTD":
        startDate = new Date(now.getFullYear(), 0, 1); // Start of the current year
        break;
      case "12M":
        startDate = new Date();
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0); // Include all data if no range is selected
    }

    return rawData.filter((item) => new Date(item.timestamp) >= startDate);
  };

  const filteredData = filterDataByTimeRange(timeRange);

  const labels = filteredData.map((item, index) =>
      index % Math.ceil(filteredData.length / 10) === 0 // Show only up to 10 labels
          ? new Date(item.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
          : ""
  );
  const equityValues = filteredData.map((item) => item.equity);
  const value = equityValues[equityValues.length-1].toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const currentEquity = equityValues[equityValues.length - 1];
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Start of today

  const endOfYesterday = new Date(startOfDay);
  endOfYesterday.setMilliseconds(-1); // Last millisecond of yesterday

  const startOfYesterday = new Date(startOfDay);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1); // Start of yesterday

// Filter for items from yesterday
  const filteredYesterday = filteredData.filter(item => {
    if (!item || !item.timestamp) return false; // Skip invalid items

    const itemDate = new Date(item.timestamp);

    // Check if itemDate is within yesterday's range
    return itemDate >= startOfYesterday && itemDate <= endOfYesterday;
  });

// Find the latest timestamp among yesterday's items
  const latestYesterday = filteredYesterday.reduce((latest, item) => {
    if (!latest || new Date(item.timestamp) > new Date(latest.timestamp)) {
      return item;
    }
    return latest;
  }, null);


  const startOfDayEquity = latestYesterday?.equity || 0;

// Calculate profit/loss
  const profitLoss = currentEquity && startOfDayEquity ? currentEquity - startOfDayEquity : 0;
  const profitLossPercentage =
      currentEquity && startOfDayEquity
          ? ((profitLoss / startOfDayEquity) * 100).toFixed(2)
          : 0;

  return (
      <View style={styles.container}>
        <Text style={styles.username}>Hi, dvora!</Text>
        <Text style={styles.title}>Cash and Holding</Text>
        <Text style={styles.acountValue}>${value}</Text>
        <Text style={[styles.profitLoss, { color: profitLoss >= 0 ? "green" : "red" }]}
        >
          {profitLoss >= 0 ? "▲" : "▼"} ${Math.abs(profitLoss).toFixed(2)} (
          {profitLossPercentage}%) Today
        </Text>

        {/* Time Range Buttons */}
        <View style={styles.buttonContainer}>
          {["1W", "1M", "3M", "6M", "YTD", "12M"].map((range) => (
              <TouchableOpacity
                  key={range}
                  style={[styles.button, timeRange === range && styles.activeButton]}
                  onPress={() => setTimeRange(range)}
              >
                <Text style={[styles.buttonText, timeRange === range && styles.activeButtonText]}>{range}</Text>
              </TouchableOpacity>
          ))}
        </View>

        {/* Line Chart */}
        <LineChart
            data={{
              labels: labels, // Adjusted labels to avoid overlap
              datasets: [{ data: equityValues }],
            }}
            width={Dimensions.get("window").width + 80} // Full screen width with some padding
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Green line
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              propsForDots: { r: "4", strokeWidth: "2", stroke: "#fff" },
              fillShadowGradient: "rgba(0, 255, 0, 0.1)",
              fillShadowGradientOpacity: 0.1,
              propsForBackgroundLines: { strokeDasharray: "" },
            }}
            withHorizontalLabels={false} // Remove Y-axis labels
            withInnerLines={false} // Remove grid lines
            withOuterLines={false} // Remove border lines
            verticalLabelRotation={0}
            bezier
            style={styles.chart}
        />

        {/* Tooltip */}
        {tooltipData && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{tooltipData.value}</Text>
              <Text style={styles.tooltipText}>{tooltipData.label}</Text>
            </View>
        )}

        {/* Clear Tooltip on Press Outside */}
        <Pressable
            style={[StyleSheet.absoluteFillObject, { backgroundColor: "transparent" }]}
            pointerEvents="box-none"
            onPress={() => setTooltipData(null)} // Clear tooltip when pressing outside
        />
      </View>
  );
};

const styles = StyleSheet.create({
  profitLoss: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  username: {
    fontWeight: 600,
    fontSize: 22,
  },
  acountValue: {
    fontWeight: 800,
    fontSize: 32,
    fontFamily: 'general-font, "Open Sans", Arial, sans-serif'
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 16,
    marginTop: 4,
    marginBottom: 8,
    color: "#000000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  activeButton: {
    borderColor: "#000000",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    color: "grey",
  },
  activeButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 0,
    marginLeft: -60
  },
  tooltip: {
    position: "absolute",
    top: 120,
    left: 20,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tooltipText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});

export default HomeScreen;

