import {View, Text, StyleSheet, TouchableOpacity,Image, Modal, TextInput, Pressable } from 'react-native';
import { todosData } from '../types/cardType';
import Animated, {useSharedValue, withTiming, Easing, ReduceMotion} from "react-native-reanimated";
import * as React from 'react'


export default function Todo({todo, removeRecord, editText, todoToggle}: {todo: todosData, removeRecord: Function, editText: Function, todoToggle: Function}){
  const [deleteState, setDeleteState] = React.useState(false)
  const [modalState, setModalState] = React.useState(false)
  const [newText, setNewText] = React.useState(todo.text)

  const saveText = () => {
    editText(todo.id, newText)
    setModalState(false)
    setNewText("")
  }

  return(
    <>
    <TouchableOpacity activeOpacity={0.7} onLongPress={()=>setDeleteState(true)} onPress={()=>setDeleteState(false)} style={[styles.todo, deleteState && styles.deleteTodo, todo.done ? styles.done : styles.active]}>
      <View style={styles.todoTextBlock}>
        <Text style={styles.todoText}>{todo.text}</Text>
      </View>
      {deleteState ? 
      <View style={[styles.icons, {flex: deleteState ? 4 : 0}]}>
        <TouchableOpacity style={styles.icon} onPress={()=>todoToggle(todo.id)}>
          <Image source={require("../assets/check.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={()=>setModalState(!modalState)}>
          <Image source={require("../assets/edit.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={()=>removeRecord(todo.id)}>
          <Image source={require("../assets/deleteIco.png")}/>
        </TouchableOpacity>
      </View>
      : <></>}
    </TouchableOpacity>

    <Modal
        animationType='fade'
        transparent={true}
        visible={modalState}
        onRequestClose={()=>setModalState(!modalState)}>
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>What would be the text?</Text>
            <TextInput style={styles.modalInput} value={newText} onChangeText={setNewText}/>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.leftModalButton]} onPress={saveText}><Text style={styles.leftModalButton}>Edit Text</Text></Pressable>
              <Pressable style={[styles.modalButton, styles.rightModalButton]} onPress={()=>setModalState(!modalState)}><Text style={styles.rightModalButton}>Cancel</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  todo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderLeftWidth: 4,
    backgroundColor: "#ffffff"
  },
  deleteTodo: {
    borderRightColor: "#ee6b6e",
    borderRightWidth: 4 
  },
  todoTextBlock: {
    flex: 7
  },
  todoText: {
    color: "#101010"
  },
  icons: {
    justifyContent: "flex-end",
    flex: 0,
    width: 100,
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    padding: 2,
    backgroundColor: "coral",
    borderRadius: 10,
    marginLeft: 4
  },
  done: {
    borderLeftColor: "lightgreen"
  },
  active: {
    borderLeftColor: "#a6bdbf"
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