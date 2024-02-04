import {StyleSheet, View, ScrollView, FlatList} from 'react-native';
import TopBar from '../components/top-bar';
import Toolbar from '../components/tool-bar';
import React from 'react';
import storage from '../lib/storage';
import { cardData, todosData } from '../types/cardType';
import { useCardStore } from '../stores/cardStore';
import Todo from '../components/todo';



export default function Card({route}: any){
  const [cardData, setCardData] = React.useState<cardData>({})
  const {cards, setCards}: any = useCardStore()
  const [toolbarToggle, setToolbarToggle] = React.useState(false)
  const { cardId } = route.params;

  React.useEffect(()=>{
    if(!cardId){return}
    fetchCardData()
  }, [cardId])

  const fetchCardData = async() => {
    const result = await storage.searchById('cards', cardId)
    setCardData(result[0])
  }
  
  const addRecord = async(todo: todosData) => {
    const result = await storage.addTodo(cardId, todo)
    setCardData({...cardData, todos: [todo, ...cardData.todos]})
    setCards(result)
  }

  const removeRecord = async(todoId: number) => {
    const result = await storage.removeTodo(cardId, todoId)
    setCards(result)
    fetchCardData()
  }

  const todoToggle = async(todoId: number) => {
    const result = await storage.toggleTodoDone(cardId, todoId)
    setCards(result)
    fetchCardData()
  }


  return(
    <>
    <TopBar title={cardData?.title} setToolbarToggle={setToolbarToggle} toolbarToggle={toolbarToggle}/>
    <Toolbar toolbarToggle={toolbarToggle} addRecord={addRecord}/>
    <View style={styles.padding}>
      <FlatList 
        data={cardData.todos}
        renderItem={({item}) => <Todo todo={item} removeRecord={removeRecord} todoToggle={todoToggle}/>}
        keyExtractor={item => item.id}/>
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  padding: {
    marginBottom: 30
  },
})