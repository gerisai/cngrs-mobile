import { Text, View } from 'react-native';
import CustomButton from "@/components/CustomButtom";
import { useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';
import { Redirect } from "expo-router";
import * as Linking from 'expo-linking';

export default function AboutScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  
  // First time it should trigger automatically
  useEffect(() => {
    requestPermission();
  },[])
  
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex h-full items-center justify-center">
        <Text className="text-3xl text-center pb-6">La app necesita permisos para acceder a la cámara</Text>
        <CustomButton
              icon="front-hand"
              iconColor="white"
              title={'Permitir'}
              containerStyles="bg-primary"
              textStyles="text-white"
              handlePress={Linking.openSettings}
        />
      </View>
    );
  }
  return (
    <Redirect href="/scanner" />
  );
}
