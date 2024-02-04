import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
import storage from "../../lib/storage";
import * as React from 'react'

export default function TopBar({title}: {title?: string}){
  const [isHome, setIsHome] = React.useState(true)
  const [subbedTitle, setSubbedTitle] = React.useState(title?.substring(0,38))
  const route = useRoute()
  const navigation = useNavigation()

  React.useEffect(()=>{
    if(route.name != "Home"){
      setIsHome(false)
    }
  }, [route.name])

  return(
    <View style={styles.topbar}>
      {!isHome
        ? <Pressable style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        : <></>}
      <Text style={styles.topbarText}>
        {title 
          ? title.length > 38
            ? subbedTitle + "..."
            : title
          : "To Native Do ✨ Everrynn"}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  topbar: {
    paddingBottom: 14,
    paddingLeft: 14,
    paddingTop: 14,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  topbarText: {
    color: "#808080",
    height: 25,

    fontSize: 18
  },
  backButton: {
    backgroundColor: "coral",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 10,
    borderRadius: 8
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "500"
  }
})