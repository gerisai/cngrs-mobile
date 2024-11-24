import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function InfoFields({ iconColor, iconSize, labelColor, valueColor, textSize, data }) {
  return (
    <View className="flex flex-row w-full items-center">
      { data.map((d,i) => (
        <View className="flex-row items-center w-1/2" key={i}>
          <MaterialIcons className="mr-2" name={d.icon} color={iconColor} size={iconSize}/>
          { d.label && <Text className={`font-rbold ${textSize} ${labelColor}`}>{d.label}: </Text> }
          <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1} className={`font-rbold ${textSize} ${valueColor}`}>
          {d.value}
          </Text>
        </View>
      ))
      }
    </View>
  )
}
