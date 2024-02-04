import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { cardData } from "../types/cardType";
import calculateDate from "../utils/dateConverter";
import {useState} from 'react'
import * as React from 'react'
import { useNavigation } from "@react-navigation/native";

export default function Card({card, deleteCard}: {card: cardData, deleteCard: Function}){
  const [deleteState, setDeleteState] = useState(false)
  const navigation: any = useNavigation()
  const shortenTitle = card?.title?.substring(0,26)
  
  const clickOnCard = () => {
    if(deleteState){
      setDeleteState(false)
      return
    }
    navigation.navigate('Card', {
      cardId: card.id
    })
  }

  return(
    <TouchableOpacity style={[styles.card, deleteState && styles.delete]} activeOpacity={0.6} onPress={clickOnCard} onLongPress={()=>setDeleteState(true)}>
      <View style={styles.top}>
        <Text style={styles.title}>{card?.title?.length > 30 ? `${shortenTitle}...` : card.title}</Text>
        <Text style={styles.date}>{calculateDate(card?.id)}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.todos}>Todos: {card?.todos?.length}</Text>

        {deleteState ?  <TouchableOpacity style={styles.deleteIco} onPress={()=>deleteCard(card.id)}>
                          <Image source={require('../assets/deleteIcoDark.png')}/>
                        </TouchableOpacity> : <></>}

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todos: {
    color: "#909090",
  },
  deleteIco: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    right: 0,
    bottom: 0,
    justifyContent: "center",
  },
  delete: {
    borderRightWidth: 8
  },
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    borderRightColor: "#ee6b6e",
    borderRadius: 10
  },
  title: {
    color: "#202020",
    fontSize: 18,
    fontWeight: "bold",
    width: "70%",
    overflow: "hidden",
    height: 26
  },
  date: {
    color: "#909090",
    fontSize: 12,
    fontWeight: "bold"
  },
  top: {
    display: "flex",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between"
  }
})