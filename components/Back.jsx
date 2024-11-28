import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Back({ size = 24, handlePress, styles, color = "#000" }) {
  return (
    <TouchableOpacity className={`${styles}`} onPress={handlePress}>
      <MaterialIcons name="chevron-left" size={size} color={color} />
    </TouchableOpacity>
  )
}