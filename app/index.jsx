import { useState } from "react";
import { router, Redirect } from "expo-router";
import { Image } from 'expo-image';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { logoWhite } from '@/constants/images';
import SignFormField from "@/components/SignFormField.jsx";
import CustomButton from "@/components/CustomButtom.jsx";
import { useUser } from '@/lib/context/user.jsx';
import validateForm from "@/util/formValidation";
import '@/global.css';

export default function SignIn() {
  const { user, login } = useUser();
  if (user) return <Redirect href="/home" />;
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // Login
  const { mutateAsync: onLogin, isPending: loging } = useMutation({
    mutationFn: async () => {
      if(!validateForm(form, Alert.alert)) return
      try {
        await login(form);
        router.replace("/home");
      } catch(err) {
        Alert.alert("Error: ", err.message);
      }
    }
  });

  return (
    <LinearGradient
        colors={['#5CC3B5','#00BFDD']}
        style={styles.background}
    >
    <SafeAreaView className="h-full">
        <KeyboardAvoidingView
            className="w-full h-dvh flex items-center justify-end px-6 gap-14 pt-20"
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={10}
        >
          <View className="flex-row gap-2 items-center">
            <Image
                style={{ width: 50, height: 50 }}
                source={logoWhite}
                onError={({error}) => console.log(error)}
            />
            <Text className="text-2xl text-white font-rbold text-center">
              Congreso 2024
            </Text>
          </View>
          <View className="w-full flex">
            <Text className="text-4xl font-rbold text-white text-center pb-2">
              Iniciar Sesión
            </Text>
            <SignFormField
              name="username"
              value={form.username}
              icon="person"
              iconColor="#9E9E9E"
              iconSize={24}
              containerStyles="mt-5"
              placeholder="Usuario"
              handleChangeText={(e) => setForm({ ...form, username: e })}
            />
            <SignFormField
              name="password"
              value={form.password}
              icon="vpn-key"
              iconColor="#9E9E9E"
              iconSize={24}
              containerStyles="mt-5"
              placeholder="Contraseña"
              handleChangeText={(e) => setForm({ ...form, password: e })}
            />
            <CustomButton 
              title={'Continuar'}
              containerStyles="rounded-xl mt-4 p-4 border-2 border-white"
              textStyles="text-white"
              handlePress={onLogin}
              isLoading={loging}
            />
          </View>
        </KeyboardAvoidingView>
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
