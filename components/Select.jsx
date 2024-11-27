import { TouchableOpacity, Text, Modal, View, FlatList, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";


export default function Select({ title, data, disabled, value, onSelect }) {
  const [modalVisible, setModalVisible] = useState(false);

  const chooseOption = (value) => {
    onSelect(value);
    setModalVisible(!modalVisible);
  }

  const Item = ({title, value}) => (
    <TouchableOpacity onPress={() => chooseOption(value)}  className="py-4">
      <Text className="text-white text-xl font-rbold text-center">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <Text className="text-md font-rbold">{title}</Text>
    <TouchableOpacity
      onPress={() => setModalVisible(!modalVisible)}
      className={`h-12 justify-center bg-white border border-slate-400 rounded-lg ${disabled ? "opacity-50" : ""}`}
      disabled={disabled}
    >
    <View className="flex-row items-center justify-between">
      <Text className="text-black font-rmedium p-2 pl-3">{value}</Text>
      <MaterialCommunityIcons className="mr-2" name="chevron-down" color="black" size={20}/>
    </View>
    </TouchableOpacity>
    <Modal
      className="flex-1 items-center justify-center"
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
    }}>
      <Pressable onPressIn={() => setModalVisible(false)} className="flex-1 justify-end items-center">
        <View className="bg-primary flex items-center rounded-3xl w-full pb-12 pt-4 shadow-xl">
        <FlatList
          data={data}
          renderItem={({item}) => <Item title={item.title} value={item.value}/>}
          keyExtractor={item => item.id}
        />
        </View>
      </Pressable>
    </Modal>
    </>
  )
}
