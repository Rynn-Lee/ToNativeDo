import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Image, Modal, TextInput} from "react-native";
import Animated, {useSharedValue, withTiming, Easing, ReduceMotion} from "react-native-reanimated";
import { todosData } from "../types/cardType";

const animConfig = {
    duration: 200,
    easing: Easing.in(Easing.ease),
    reduceMotion: ReduceMotion.System,
}

export default function Toolbar({toolbarToggle, addRecord, editCardTitle}: {toolbarToggle: boolean, addRecord: Function, editCardTitle: Function}){
  const [modalState, setModalState] = React.useState(false)
  const [todoText, setTodoText] = React.useState("")
  const [titleModalState, setTitleModalState] = React.useState(false)
  const [cardTitle, setCardTitle] = React.useState("")
  const height = useSharedValue(0)
  const padding = useSharedValue(0)

  React.useEffect(()=>{
    toolbarToggle ? height.value = withTiming(100, animConfig) : height.value = withTiming(0, animConfig)
    toolbarToggle ? padding.value = withTiming(6, animConfig) : padding.value = withTiming(0, animConfig)
  }, [toolbarToggle])
  
  const makeTodo = () => {
    if(!todoText){return}
    const data: todosData = {
      id: Date.now(),
      text: todoText,
      done: false
    }
    addRecord(data)
    setModalState(false)
    setTodoText('')
  }

  const changeTitle = () => {
    if(!cardTitle){return}
    editCardTitle(cardTitle)
    setTitleModalState(false)
    setCardTitle('')
  }

  return(
    <>
    <Animated.View style={[styles.toolbar, {height}]}>
      <TouchableOpacity activeOpacity={0.7} style={styles.toolbarButton} onPress={()=>setModalState(!modalState)}>
        <Image source={require("../assets/addIco.png")}/>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} style={styles.toolbarButton} onPress={()=>setTitleModalState(!titleModalState)}>
        <Image source={require("../assets/edit.png")}/>
      </TouchableOpacity>
    </Animated.View>


    <Modal
        animationType='fade'
        transparent={true}
        visible={titleModalState}
        onRequestClose={()=>setTitleModalState(!titleModalState)}>
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>Enter new title</Text>
            <TextInput style={styles.modalInput} value={cardTitle} onChangeText={setCardTitle}/>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.leftModalButton]} onPress={changeTitle}><Text style={styles.leftModalButton}>Change title</Text></Pressable>
              <Pressable style={[styles.modalButton, styles.rightModalButton]} onPress={()=>setTitleModalState(!titleModalState)}><Text style={styles.rightModalButton}>Cancel</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>

      
    <Modal
        animationType='fade'
        transparent={true}
        visible={modalState}
        onRequestClose={()=>setModalState(!modalState)}>
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>Enter option name</Text>
            <TextInput style={styles.modalInput} value={todoText} onChangeText={setTodoText}/>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.leftModalButton]} onPress={makeTodo}><Text style={styles.leftModalButton}>Add New</Text></Pressable>
              <Pressable style={[styles.modalButton, styles.rightModalButton]} onPress={()=>setModalState(!modalState)}><Text style={styles.rightModalButton}>Cancel</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  toolbar: {
    zIndex: 10,
    position: "absolute",
    right: 6,
    top: 68,
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    borderRadius: 10,
    height: 0
  },
  toolbarButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "coral",
    height: 38,
    width: 38,
    borderRadius: 10,
    marginRight: 6,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 6,
  },
  modal: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",  
    backgroundColor: "#00000060"
  },
  modalWindow: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#eeeeee",
    borderRadius: 20,
    width: "90%",
    height: "auto",
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    color: "#707070",
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
  },
  modalButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    padding: 8,
    backgroundColor: "coral",
  },
  leftModalButton: {
    color: "white",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 2
  },
  rightModalButton: {
    color: "white",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 2
  },
  modalInput: {
    borderBottomColor: "coral",
    color: "#101010",
    padding: 5,
    borderBottomWidth: 1,
    marginBottom: 10,
    marginTop: 4
  }
})