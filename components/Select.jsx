import { TouchableOpacity, Text, Modal, View, FlatList, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import useReseteableState from "@/hooks/useReseteableState";


export default function Select({ title, data, disabled, value, onSelect, required = false }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [valid, setValid] = useReseteableState(true);

  const chooseOption = (value) => {
    setValid(true);
    onSelect(value);
    setModalVisible(!modalVisible);
  }

  const validate = () => {
    if (required && !value) setValid(false);
  }

  const Item = ({title, value}) => (
    <TouchableOpacity onPress={() => chooseOption(value)}  className="py-4">
      <Text className="text-white text-xl font-rbold text-center">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <Text className="text-md font-rbold">{title}<Text className="text-red-500">{required && " *"}</Text></Text>
    <TouchableOpacity
      onPress={() => setModalVisible(!modalVisible)}
      className={`h-12 justify-center bg-white border rounded-lg 
      ${disabled ? "opacity-50" : ""}
      ${valid ? "focus:border-primary" : "focus:border-red-500"}
      ${valid ? "border-slate-400" : "border-red-500" }
      `}
      disabled={disabled}
      onBlur={validate}
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
      <Pressable onPressIn={() => {
          validate();
          setModalVisible(false);
        }} 
        className="flex-1 justify-end items-center">
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
