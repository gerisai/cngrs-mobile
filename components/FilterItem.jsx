import { Text, TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react'

export default function FilterItem({title, value, handlePress, active }) {
  return (
      <TouchableOpacity 
        onPress={handlePress}
        className={`flex-row items-center justify-between py-4 px-4 
          ${ active && "border-l-4 border-p-600" }
        `}>
        <Text className={`${ active ? "text-p-600" : "text-[#404040]" } text-lg font-rbold`}>{title}</Text>
        <MaterialIcons name="chevron-right" color={`${ active ? "#0396B7" : "#404040"}`} size={24}/>
      </TouchableOpacity>
    )
}
