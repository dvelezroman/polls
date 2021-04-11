import React from 'react';
import {
  Image,
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

const ModalComponent = ({ modalVisible, register, onToggleModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={register && modalVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
            <Text
              style={{ fontSize: 20 }}
            >
              {`${register.mesa} - ${register.sexo}`}
            </Text>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {`${register.parroquia} - ${register.recinto}`}
            </Text>
       

          <Image
            source={{ uri: register.imageURL }}
            fadeDuration={2}
            style={{ marginVertical: 10, height: 300, width: 300 }}
          />
          <TouchableOpacity
            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
            onPress={() => {
              onToggleModal();
            }}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalComponent
