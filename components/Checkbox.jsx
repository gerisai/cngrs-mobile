import { Text, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const styles = {
  false: { 
    icon: 'check-box-outline-blank',
    color: '#C2C2C2'
  },
  true: {
    icon: 'check-box',
    color: '#00BFDD'
  }
}

export default function Checkbox({ checked, text, handlePress, containerStyles }) {
  const style = styles[checked];

  return (
    <Pressable onPress={handlePress} className={`flex-row items-center gap-2 ${containerStyles}`}>
      <MaterialIcons name={style.icon} color={style.color} size={24}/>
      <Text className="text-neutral-90 font-rbold text-lg">{text}</Text>
    </Pressable>
  )
}
