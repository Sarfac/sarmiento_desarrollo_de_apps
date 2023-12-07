import { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [texto, setTexto] = useState("");
  const [itemList, setItemList] = useState([]);
  const [itemSelecc, setItemSelecc] = useState({})
  const [modalVisible, setmodalVisible] = useState(false)

  const manejarTexto = (texto) => {
    setTexto(texto);
  };

  const manejarBoton = () => {
    texto != "" &&
      setItemList([
        ...itemList,
        { id: Math.random().toString(), valor: texto },
      ]);

    console.log(itemList);
    setTexto("");
  };

  const onItemSelec = (id) => {
    setmodalVisible(!modalVisible)
    setItemSelecc(itemList.find(elemt => elemt.id === id))
  }

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.valor}</Text>
      <Button title="X" onPress={()=>onItemSelec(item.id)}></Button>
    </View>
  );

  const eliminarTarea = () =>{
    setItemList(itemList.filter(elemt => elemt.id !== itemSelecc.id))
    setmodalVisible(!modalVisible)
  }

  return (
    <>
      <View style={styles.container}>
        <Text>Lista de tareas</Text>
        <View style={styles.contenedorInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Agregar Tarea"
            onChangeText={manejarTexto}
            value={texto}
          />
          <Button title="add" onPress={manejarBoton} />
        </View>
        <FlatList
          data={itemList}
          renderItem={renderListItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <View style={styles.modalMensaje}>
          <Text>Se eliminara:</Text>
          <Text>{itemSelecc.valor}</Text>
        </View>
        <View style={styles.modalBotones}>
          <Button title="Eliminar" color='#FF0000' onPress={()=>eliminarTarea()}></Button>
          <Button title="No" onPress={()=>setmodalVisible(!modalVisible)}></Button>
        </View>

      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3e5f8a",
    padding: 40,
  },
  contenedorInput: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textInput: {
    width: 250,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#427ed7",
    borderRadius: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    backgroundColor: "#2196f3",
    borderRadius: 10,
    padding: 10,
  },
  modalMensaje:{
    marginTop:40,
    alignItems:'center',
  },
  modalBotones:{
    flexDirection:'row',
    justifyContent: 'space-evenly',
    padding: 10,
  }
});
