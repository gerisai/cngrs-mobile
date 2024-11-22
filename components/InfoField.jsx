import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const types = {
  light: {
    iconColor: "#5CC3B5",
    color: "text-green-400"
  },
  dark: {
    iconColor: "#218076",
    color: "text-green-600"
  }
}

export default function InfoField({ icon, type, label, value }) {
  const style = types[type];
  
  return (
    <View className="flex flex-row items-center">
      <MaterialIcons className="mr-2" name={icon} color={style.iconColor} size={32}/>
      <Text className={`font-rbold text-xl ${style.color}`}>{label}: </Text>
      <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1} className="font-rbold text-xl">{value}</Text>
    </View>
  )
}
