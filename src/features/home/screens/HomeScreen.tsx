import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axiosInstance, { InterceptorConfig } from "../../../core/utils/api";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../store/selectors/themeSelectors";

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
    const theme = useSelector(selectTheme);
    const [rawData, setRawData] = useState([]); // Store fetched data in state
    const [user, setUser] = useState(""); // Store the username
    const [cashAvailable, setCash] = useState(0); // Store the username
    const [bonus, setBonus] = useState(0); // Store the username

    // Function to fetch user data
    const fetchUser = () => {
      const baseUrl = "https://www.etoro.com/api/logindata/v1.1/logindata";
      const url = `${baseUrl}?conditionIncludeDisplayableInstruments=false&conditionIncludeMarkets=false&conditionIncludeMetadata=false&conditionIncludeMirrorValidation=false`;

      return axiosInstance
        .get(url, { interceptorConfig })
        .then((response) => {
          const fetchedUser = response.data.AggregatedResult.ApiResponses.CurrentUserData.Content.users[0].username;
          const cash = response.data.AggregatedResult.ApiResponses.PrivatePortfolio.Content.ClientPortfolio.Credit;
          const bonus = response.data.AggregatedResult.ApiResponses.PrivatePortfolio.Content.ClientPortfolio.BonusCredit;
          setCash(cash);
          setBonus(bonus);
          console.log("Fetched Username:", fetchedUser);
          setUser(fetchedUser); // Update state with the fetched username
          return fetchedUser; // Return the username for chaining
        })
        .catch((error) => {
          console.error("Error fetching user:", error.message);
          if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
          }
        });
    };

    // Function to fetch equity data for a specific user
    const fetchEquityData = (username: any) => {
      if (!username) return; // Ensure username is available before making the call

      const url = `/sapi/userstats/Equity/UserName/${username}?mindate=12/1/2023&client_request_id=93a6ff01-32f4-413d-8552-b3d199f33551`;

      axiosInstance
        .get(url, { interceptorConfig })
        .then((response) => {
          setRawData(response.data.equity); // Update state with fetched equity data
          console.log("Fetched Equity Data:", response.data.equity[response.data.equity.length - 1].equity);
        })
        .catch((error) => {
          console.error("Error fetching equity data:", error.message);
          if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
          }
        });
    };

    useEffect(() => {
      // First fetch the user, then fetch equity data
      fetchUser().then((fetchedUser) => {
        if (fetchedUser) {
          fetchEquityData(fetchedUser); // Use the fetched username to get equity data
        }
      });

      // Set up an interval to refetch data every 5 seconds
      const intervalId = setInterval(() => {
        if (user) {
          fetchEquityData(user); // Fetch equity data periodically if user is available
        }
      }, 5000);

      // Cleanup interval on component unmount
      return () => clearInterval(intervalId);
    }, [user]);

  const [timeRange, setTimeRange] = useState("1W"); // Default to 1 week
  const [tooltipData, setTooltipData] = useState<any>(null); // Tooltip state

  const filterDataByTimeRange = (range: any) => {
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

    return rawData.filter((item: any) => new Date(item.timestamp) >= startDate);
  };

  const filteredData = filterDataByTimeRange(timeRange);

  const labels = filteredData.map((item: any, index) =>
      index % Math.ceil(filteredData.length / 10) === 0 // Show only up to 10 labels
          ? new Date(item.timestamp).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
          : ""
  );

  const equityValues = filteredData.length
  ? filteredData
      .map((item: any) => item.equity)
      .filter((value) => typeof value === 'number' && !isNaN(value) && isFinite(value))
  : [0];
  const value = equityValues?.length ? equityValues[equityValues.length-1].toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) : 0;

  const currentEquity = equityValues[equityValues.length - 1];
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Start of today

  const endOfYesterday = new Date(startOfDay);
  endOfYesterday.setMilliseconds(-1); // Last millisecond of yesterday

  const startOfYesterday = new Date(startOfDay);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1); // Start of yesterday

// Filter for items from yesterday
  const filteredYesterday = filteredData.filter((item: any) => {
    if (!item || !item.timestamp) return false; // Skip invalid items

    const itemDate = new Date(item.timestamp);

    // Check if itemDate is within yesterday's range
    return itemDate >= startOfYesterday && itemDate <= endOfYesterday;
  });

// Find the latest timestamp among yesterday's items
  const latestYesterday = filteredYesterday.reduce((latest: any, item: any) => {
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
      <View style={[styles.container, {backgroundColor: theme.bottomBackgroundColor}]}>
        <Text style={styles.username}>Hi, {user}!</Text>
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
              datasets: [{ data: equityValues.slice(0, 10) }],
            }}
            width={Dimensions.get("window").width + 80} // Full screen width with some padding
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              backgroundGradientFrom: theme.bottomBackgroundColor,
              backgroundGradientTo: theme.bottomBackgroundColor,
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









         {/* Profit/Loss */}
      <View style={styles.row}>
        <Text style={styles.label}>Profit/Loss</Text>
        <View>
          <Text
            style={[
              styles.value,
              { color: profitLoss >= 0 ? 'green' : 'red' }, // Green for profit, red for loss
            ]}
          >
            {profitLoss >= 0 ? '▲' : '▼'} ${Math.abs(profitLoss).toFixed(2)}
          </Text>
          <Text
            style={[
              styles.percentage,
              { color: profitLoss >= 0 ? 'green' : 'red' },
            ]}
          >
            ({profitLossPercentage}%)


          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Bonus Credit</Text>
        <Text style={styles.value}>${bonus}</Text>
      </View>

      {/* Cash Available */}
      <View style={styles.row}>
        <Text style={styles.label}>Cash Available</Text>
        <Text style={styles.value}>${cashAvailable}</Text>
      </View>

      </View>
  );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        },
    label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    },
        value: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        },
        percentage: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 2,
        },
  profitLoss: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  username: {
    fontWeight: 600,
    fontSize: 22,
    marginTop: 16,
  },
  acountValue: {
    fontWeight: 800,
    fontSize: 32,
    fontFamily: 'general-font, "Open Sans", Arial, sans-serif'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white"
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
