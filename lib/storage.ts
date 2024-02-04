import AsyncStorage from '@react-native-async-storage/async-storage';
import { todosData } from '../types/cardType';

const setData = async(key: string, data: any) => {
  try{
    await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log("setData Error", e)
  }
}

const getData = async(key: string) => {
  try{
    const result = await AsyncStorage.getItem(key) || '[]'
    const formatted = JSON.parse(result)
    return formatted
  } catch (e) {
    console.log("getData Error", e)
  }
}

const getAllKeys = async() => {
  try{
    return await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log("getAllKeys Error", e)
  }
}

const getAllData = async() => {
  let array: any[] = []
  try{
    const keys = await AsyncStorage.getAllKeys();
    keys.forEach(async(key) => {
      console.log("KEYS", key)
      array.push(await AsyncStorage.getItem(key))
    })
    return array
  } catch (e) {
    console.log("getAllKeys Error", e)
  }
}

const searchById = async(storage: string, id: number) => {
  const data = await getData(storage)
  const result = data.filter((item: any) => item.id == id)
  return result
}

const remove = async() => {
  try{
    await AsyncStorage.clear()
  } catch(e) { 
    console.log("remove error", e)
  }
}


const removeCard = async(id: number) => {
  const data = await getData('cards')
  const result = data.filter((item: any) => item.id != id)
  setData('cards', result)
  return result
}

const addTodo = async(id: number, newTodo: todosData) => {
  const data = await getData('cards')
  const result = data.map((item: any) => item.id != id ? item : {...item, todos: [newTodo, ...item.todos]})
  setData('cards', result)
  return result
}

const removeTodo = async(cardId: number, todoId: number) => {
  const data = await getData('cards')
  const result = data.map((item: any) => {
    if(item.id != cardId){return item}
    const filtered = item.todos.filter((todo: todosData) => todoId != todo.id)
    return {...item, todos: filtered}
  })
  setData('cards', result)
  return result
}

const toggleTodoDone = async(cardId: number, todoId: number) => {
  const data = await getData('cards')
  const result = data.map((card: any) => {
    if(card.id != cardId){return card}
    const filtered = card.todos.map((todo: todosData) => todoId != todo.id ? todo : {...todo, done: !todo.done})
    return {...card, todos: filtered}
  })
  setData('cards', result)
  return result
}

//{...item, todos: [newTodo, ...item.todos]}
const storage = {setData, getData, getAllKeys, getAllData, remove, searchById, removeCard, addTodo, removeTodo, toggleTodoDone}

export default storage