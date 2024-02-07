import { StyleSheet, Text, View, Pressable, Image, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, {useSharedValue, withTiming, Easing, ReduceMotion} from "react-native-reanimated";
import * as React from 'react'

const animConfig = {
  duration: 200,
  easing: Easing.linear,
  reduceMotion: ReduceMotion.System,
}

const maxWidth = Dimensions.get('window').width

export default function TopBar({title, setToolbarToggle, toolbarToggle}: {title?: string, setToolbarToggle?: Function, toolbarToggle?: boolean}){
  const [isHome, setIsHome] = React.useState(true)
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
      {!isHome
        ? <Pressable style={styles.backButton} onPress={()=>navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
        : <></>}
      <View style={styles.topbarTextView}>
        <Text style={styles.topbarText} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
          {title ? title
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
    maxWidth: maxWidth,
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
    backgroundColor: "coral",
    borderRadius: 10,
    padding: 6,
    right: 10
  },
  topbarTextView: {
    alignItems: "flex-start",
    justifyContent: "center",
    paddingRight: 10,
    width: "70%"
  },
  topbarText: {
    fontSize: 16,
    color: "#808080",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "coral",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    marginRight: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "500"
  }
})