import { StatusBar, StyleSheet, Text, View } from "react-native";

const topPadding = StatusBar.currentHeight || 20;
export default function TopBar(){
  return(
    <View style={styles.topbar}>
      <Text style={styles.topbarText}>To Native Do</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  topbar: {
    paddingBottom: 12,
    paddingTop: topPadding+2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  topbarText: {
    color: "#404040",
    fontSize: 15
  }
})