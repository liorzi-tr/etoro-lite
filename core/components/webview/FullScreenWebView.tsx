import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";
import { useWebView } from "../../webview/WebViewContext";
import LoginSerivce from "../../services/LoginSerivce";

const FullScreenWebView = () => {
  const { url, isVisible, closeWebView } = useWebView();

  if (!isVisible || !url) return null;

  const INJECTED_JAVASCRIPT = `
  (function() {
      window.silentLoginData = { accessToken: '${LoginSerivce.accessToken}' };
  })();`;

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={closeWebView} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Web Page</Text>
        </View>
        {/* WebView */}
        <WebView
          source={{ uri: url }}
          style={styles.webview}
          webviewDebuggingEnabled={true}
          injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
          cacheEnabled={false}
          incognito={true}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 50,
    backgroundColor: "#f8f8f8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  webview: {
    flex: 1,
  },
});

export default FullScreenWebView;
