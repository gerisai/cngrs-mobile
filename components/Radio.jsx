import { View, Text, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const styles = {
  false: { 
    icon: 'radio-button-unchecked',
    color: '#C2C2C2'
  },
  true: {
    icon: 'radio-button-checked',
    color: '#00BFDD'
  }
}

export default function Radio({ options, containerStyles, handlePress, checked, setChecked }) {

  const select = (value) => {
    setChecked(value);
    handlePress(value);
  }

  return (
    <View>
      { options.map((v,i) => {
        const style = styles[checked === v.value];
        return (
        <Pressable key={i} onPress={() => select(v.value)} className={`flex-row items-center gap-2 ${containerStyles}`}>
          <MaterialIcons name={style.icon} color={style.color} size={24}/>
          <Text className="text-neutral-90 font-rbold text-lg">{v.text}</Text>
        </Pressable>
        )
      })}
    </View>
  )
}