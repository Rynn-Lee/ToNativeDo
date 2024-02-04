import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from "react-native";
import { useNavigation, useNavigationState, useRoute } from "@react-navigation/native";
import Animated, {useSharedValue, withTiming, Easing, ReduceMotion} from "react-native-reanimated";
import * as React from 'react'

const animConfig = {
  duration: 200,
  easing: Easing.linear,
  reduceMotion: ReduceMotion.System,
}

export default function TopBar({title, setToolbarToggle, toolbarToggle}: {title?: string, setToolbarToggle?: Function, toolbarToggle?: boolean}){
  const [isHome, setIsHome] = React.useState(true)
  const subbedTitle = title?.substring(0,30)
  const route = useRoute()
  const navigation = useNavigation()
  const rotation = useSharedValue("0rad")

  React.useEffect(()=>{
    if(route.name != "Home"){
      setIsHome(false)
    }
  }, [route.name])

  const openToolbar = () => {
    if(!setToolbarToggle){return}
    toolbarToggle ? rotation.value = withTiming("0rad", animConfig) : rotation.value = withTiming("1.57079633rad", animConfig)
    setToolbarToggle(!toolbarToggle);
  }

  return(
    <View style={styles.topbar}>
      <View style={styles.subbar}>
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
      {setToolbarToggle 
      ? <Animated.View style={[styles.hideToolbar, {transform: [{rotateZ: rotation}]}]}>
          <Pressable onPress={openToolbar}>
            <Image source={require("../assets/menu.png")}/>
          </Pressable>
        </Animated.View>
      : <></>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  topbar: {
    paddingBottom: 14,
    paddingLeft: 14,
    paddingTop: 14,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "row"
  },
  text: {
    color: "#ffffff"
  },
  hideToolbar: {
    position: "absolute",
    backgroundColor: "coral",
    borderRadius: 10,
    padding: 6,
    right: 10
  },
  subbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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