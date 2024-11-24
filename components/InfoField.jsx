import { View, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function InfoField({ icon, iconColor, iconSize, textSize, label, labelColor, value, valueColor }) {
  return (
    <View className="flex flex-row items-center">
      <MaterialIcons className="mr-2" name={icon} color={iconColor} size={iconSize}/>
      { label && <Text className={`font-rbold ${textSize} ${labelColor}`}>{label}: </Text> }
      <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1} className={`font-rbold ${textSize} ${valueColor}`}>
        {value}
      </Text>
    </View>
  )
}
