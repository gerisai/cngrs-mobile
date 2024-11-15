import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image } from 'expo-image';
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';
import { logoWhite } from '../constants/images';
import SignFormField from "../components/SignFormField.jsx";
import '../global.css';

export default function SignIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <LinearGradient
        colors={['#5CC3B5','#00BFDD']}
        style={styles.background}
    >
    <SafeAreaView className="h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex items-center h-full py-5">
          <View className="flex-row gap-2 items-center mt-10">
            <Image
                style={{ width: 50, height: 50 }}
                source={logoWhite}
                onError={({error}) => console.log(error)}
            />
            <Text className="text-3xl text-white font-rbold text-center">
              Congreso 2024
            </Text>
          </View>
          <View className="w-full flex h-full px-6 mt-20">
            <Text className="text-4xl font-rbold text-white text-center">
              Iniciar Sesión
            </Text>
            <SignFormField
              name="username"
              value={form.username}
              icon="person"
              placeholder="Usuario"
              handleChangeText={(e) => setForm({ ...form, username: e })}
            />
            <SignFormField
              name="password"
              value={form.password}
              icon="vpn-key"
              placeholder="Contraseña"
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />
          
          </View>
      </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '100%'
    }
});