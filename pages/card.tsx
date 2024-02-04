import {Modal, Pressable, StyleSheet, Text, TextInput, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import TopBar from '../components/top-bar/top-bar';
import Toolbar from '../components/toolbar/toolbar';
import React from 'react';
import storage from '../lib/storage';
import { cardData } from '../types/card';



export default function Card({route}: any){
  const [cardData, setCardData] = React.useState<cardData>()
  const { cardId } = route.params;

  React.useEffect(()=>{
    if(!cardId){return}
    fetchCardData()
  }, [cardId])

  const fetchCardData = async() => {
    console.log("called fetch")
    const result = await storage.searchById('cards', cardId)
    console.log(result)
    setCardData(result[0])
  }

  return(
    <>
    <TopBar title={cardData?.title}/>
    <Toolbar/>
    <View style={styles.padding}>
      <Text>Card page! {}</Text>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  padding: {
    padding: 10
  },
})