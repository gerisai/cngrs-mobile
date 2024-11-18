import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { logo } from '../../constants/images';
import Stats from '../../components/Stats';
import CustomButton from "../../components/CustomButtom";

export default function Home() {
  return (
    <View
      className="w-full h-full flex items-center pt-8 bg-gray"
    >
      <View className="flex-row gap-2 items-center">
        <Image
          style={{ width: 50, height: 50 }}
          source={logo}
          onError={({error}) => console.log(error)}
        />
        <Text className="text-2xl text-primary font-rbold text-center">
            Congreso 2024
        </Text>
      </View>
      <Stats/>
      <View>
      <CustomButton
        title="Registrar Asistente"
        icon="qr-code-scanner"
        iconColor="white"
        containerStyles="bg-primary"
        textStyles="text-white"
        handlePress={() => console.log('register')}
      />
      <CustomButton
        title="Registro Manual"
        icon="edit"
        iconColor="#0396B7"
        containerStyles="border-2 border-secondary-100"
        textStyles="text-secondary-100"
        handlePress={() => console.log('register')}
      />
      </View>
    </View>
  );
}
