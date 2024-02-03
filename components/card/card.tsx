import { Text, View, StyleSheet } from "react-native";
import { cardData } from "../../types/card";
import calculateDate from "../../utils/dateConverter";
import {useState} from 'react'

export default function Card({card}: {card: cardData}){
  const shortenTitle = card.title.substring(0,26)

  return(
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles?.title}>{card.title.length > 30 ? `${shortenTitle}...` : card.title}</Text>
        <Text style={styles?.date}>{calculateDate(card?.id)}</Text>
      </View>
      <View style={styles.bottom}>
        <Text>Todos: {card?.todos?.length} | Completed: 0</Text>
        <Text>{}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    marginBottom: 12,
    padding: 16,
    display: "flex",
    flexDirection: "column",
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
    justifyContent: "space-between"
  }
})