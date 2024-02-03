import {Button, Modal, Pressable, StyleSheet, View} from 'react-native';
import ListTodos from '../components/list-todos/list-todos';
import { useState } from 'react';
import { BlurView } from '@react-native-community/blur';

export default function Home(){
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  
  return(
    <View style={styles.padding}>
      <Button
        onPress={()=>setModalVisible(!modalVisible)}
        title='Create a new Todo'
        color='coral'/>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={()=>setModalVisible(!modalVisible)}>
        <BlurView blurType='dark' style={styles.modal}>
          <View style={styles.modalWindow}>
            <Button title="close" onPress={()=>setModalVisible(!modalVisible)}/>
          </View>
        </BlurView>
      </Modal>
      <ListTodos/>
    </View>
  )
}

const styles = StyleSheet.create({
  padding: {
    padding: 10
  },
  modal: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",  
  },
  modalWindow: {
    display: "flex",
    flexDirection: "column-reverse",
    backgroundColor: "#ffffff",
    width: "90%",
    height: "auto",
    padding: 5
  }
})