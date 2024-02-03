import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async(key: string, data: any) => {
  try{
    await AsyncStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log("setData Error", e)
  }
}

const getData = async(key: string) => {
  try{
    const result = await AsyncStorage.getItem(key) || "[]"
    return JSON.parse(result)
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

const remove = async() => {
  try{
    await AsyncStorage.clear()
  } catch(e) { 
    console.log("remove error", e)
  }
}

const storage = {setData, getData, getAllKeys, getAllData, remove}

export default storage