import { StatusBar, StyleSheet, Text, View } from "react-native";
import storage from "../../lib/storage";

const topPadding = StatusBar.currentHeight || 20;
export default function TopBar(){

  const logData = async() => {
    console.log(await storage.remove())
  }

  return(
    <View style={styles.topbar}>
      <Text style={styles.topbarText} onPress={logData}>To Native Do ✨ Everrynn</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  topbar: {
    paddingBottom: 12,
    paddingLeft: 20,
    paddingTop: topPadding+2,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  topbarText: {
    color: "#808080",
    fontSize: 18
  }
})