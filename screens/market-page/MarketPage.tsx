import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import WebView from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import LoginSerivce from "../../core/services/LoginSerivce";
import Loader from "../../core/components/atoms/Loader";

const MarketPageScreen = () => {
  const route = useRoute();
  const { instrument } = route.params as { instrument: string };
  const [isLoading, setIsLoading] = useState(true);

  // Use effect to delay the hiding of the loader for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loader after 5 seconds
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  const INJECTED_JAVASCRIPT = `
    (function() {
        window.silentLoginData = { accessToken: '${LoginSerivce.accessToken}' };
        window.isWrappedByReactApp = true;
    })();
  `;

  const handleLoadEnd = () => {
    // Ensure loader is hidden when the webview finishes loading
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Show loader until the WebView has loaded or 5 seconds has passed */}
      {isLoading && (
        <View style={styles.loaderContainer}>
          <Loader/>
        </View>
      )}

      <WebView
        source={{
          uri: `https://testenv-2688-2.front.preprod.etoro.com/markets/${instrument}`,
        }}
        style={styles.webview}
        webviewDebuggingEnabled={true}
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onLoadEnd={handleLoadEnd} // Hide loader when WebView finishes loading
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default MarketPageScreen;
