import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { sadPug } from '@/constants/images';

export default function EmptyResult() {
  return (
    <View className="flex py-36 justify-center items-center">
      <Text className="text-xl font-rbold">Sin resultados</Text>
      <Image
        style={{ width: 180, height: 110 }}
        source={sadPug}
        onError={({error}) => console.log(error)}
      />
    </View>
  )
}
