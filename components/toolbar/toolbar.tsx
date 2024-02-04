import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function Toolbar(){
  return(
    <View style={styles.toolbar}>
      <Text>Toolbar</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    padding: 12,
    backgroundColor: "#ffffff",
    borderTopColor: "#cccccc",
    borderTopWidth: 0.2
  }
})