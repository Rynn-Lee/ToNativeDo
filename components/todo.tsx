import {View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { todosData } from '../types/cardType';
import Animated, {useSharedValue, withTiming, Easing, ReduceMotion} from "react-native-reanimated";
import * as React from 'react'


export default function Todo({todo, removeRecord, todoToggle}: {todo: todosData, removeRecord: Function, todoToggle:Function}){
  const [deleteState, setDeleteState] = React.useState(false)

  return(
    <TouchableOpacity activeOpacity={0.7} onLongPress={()=>setDeleteState(true)} onPress={()=>setDeleteState(false)} style={[styles.todo, deleteState && styles.deleteTodo, todo.done ? styles.done : styles.active]}>
      <View style={styles.todoTextBlock}>
        <Text style={styles.todoText}>{todo.text}</Text>
      </View>
      {deleteState ? 
      <View style={[styles.icons, {flex: deleteState ? 3 : 0}]}>
        <TouchableOpacity style={styles.icon} onPress={()=>todoToggle(todo.id)}>
          <Image source={require("../assets/check.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image source={require("../assets/edit.png")}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={()=>removeRecord(todo.id)}>
          <Image source={require("../assets/deleteIco.png")}/>
        </TouchableOpacity>
      </View>
      : <></>}
    </TouchableOpacity>
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
  }
})