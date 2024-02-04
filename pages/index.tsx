import {Modal, Pressable, StyleSheet, Text, TextInput, View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { useState, useEffect } from 'react';
import storage from '../lib/storage';
import Card from '../components/listed-card';
import { cardData } from '../types/cardType';
import TopBar from '../components/top-bar';
import { useCardStore } from '../stores/cardStore';

let bottomNavBarH = Dimensions.get('screen').height - Dimensions.get('window').height;

export default function Home({navigation, route}: any){
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const {cards, setCards}: any = useCardStore()
  const [cardTitle, setCardTitle] = useState<string>("")

  useEffect(()=>{
    fetchCards()
  }, [])

  const fetchCards = async() => {
    const result = await storage.getData('cards')
    console.log("RESULT CARDS", result)
    setCards(result)
  }

  const saveCard = async() => {
    if(!cardTitle){return}
    const prevData = await storage.getData('cards');
    const newCard = {
      id: Date.now(),
      title: cardTitle,
      todos: []
    }
    await storage.setData("cards", [...prevData, newCard])
    setCards([newCard, ...prevData])
    setCardTitle("")
    setModalVisible(!modalVisible)
  }

  const deleteCard = async(id: number) => {
    setCards(await storage.removeCard(id))
  }

  return(
    <>
    <TopBar/>
    <View style={styles.padding}>
      <TouchableOpacity
        onPress={()=>setModalVisible(true)}
        style={styles.addCard}
        activeOpacity={0.7}>
          <Text style={styles.textAddCard}>Add new card</Text>
        </TouchableOpacity>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>setModalVisible(!modalVisible)}>
        <View style={styles.modal}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalTitle}>What would be the title?</Text>
            <TextInput style={styles.modalInput} value={cardTitle} onChangeText={setCardTitle}/>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton, styles.leftModalButton]} onPress={saveCard}><Text style={styles.leftModalButton}>Add New</Text></Pressable>
              <Pressable style={[styles.modalButton, styles.rightModalButton]} onPress={()=>setModalVisible(!modalVisible)}><Text style={styles.rightModalButton}>Cancel</Text></Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView style={styles.cards}>
        {cards?.map((card: cardData) => <Card key={card.id} card={card} deleteCard={deleteCard}/>).sort((a,b)=>b.props.card.id - a.props.card.id)}
      </ScrollView>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  textAddCard: {
    fontSize: 16,
    color: "#ededed",
    fontWeight: "800"
  },
  addCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "coral",
    padding: 12,
    borderRadius: 10
  },
  cards: {
    marginTop: 10,
    marginBottom: bottomNavBarH+25
  },
  padding: {
    padding: 10
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