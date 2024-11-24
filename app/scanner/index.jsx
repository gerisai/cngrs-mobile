import { CameraView } from "expo-camera";
import { Stack, router } from "expo-router";
import { SafeAreaView, StyleSheet, Pressable, Alert } from "react-native";
import Toast from 'react-native-toast-message';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { url } from '../../constants/constants';

export default function Scanner() {

  const goBack = () => {
    router.replace('/home');
  }

  const scanPerson = async ({ data }) => {
    if(!url.test(data)) {
      Toast.show({ type: 'error', topOffset: 100, text1: 'Código no válido'});
      router.replace("/home");
      return
    }
    const personId = data.split('/').at(-1);
    router.replace(`/person/register/${personId}`);
    return
  }

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ["qr"]
        }}
        onBarcodeScanned={scanPerson}
      >
        <Pressable onPress={goBack}>
          <MaterialIcons className="bg-black rounded-full flex self-start ml-4 mt-12" name="arrow-back" color="#00BFDD" size={42}/>
        </Pressable>
      </CameraView>
    </SafeAreaView>
  );
}