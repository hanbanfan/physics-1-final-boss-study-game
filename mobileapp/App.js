import React from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const GAME_URL = "https://hanbanfan.github.io/physics-1-final-boss-study-game/";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>Physics Final Boss</Text>
      </View>
      <WebView
        source={{ uri: GAME_URL }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        originWhitelist={["*"]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  header: {
    backgroundColor: "#020617",
    paddingTop: 6,
    paddingBottom: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  title: {
    color: "#67e8f9",
    fontSize: 16,
    fontWeight: "900",
  },
  webview: {
    flex: 1,
    backgroundColor: "#020617",
  },
});