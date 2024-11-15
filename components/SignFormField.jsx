import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import '../global.css';

export default function SignFormField({
  name,
  value,
  icon,
  placeholder,
  handleChangeText,
}) 
{
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mt-5">
    <View className="w-full h-14 px-6 bg-white rounded-lg flex flex-row items-center">
      <MaterialIcons name={icon} color="#9E9E9E" size={24}/>
      <TextInput
        style={styles.input}
        className={`flex-1 overflow-hidden h-12 text-xl px-4`}
        value={value}
        placeholderTextColor="#9E9E9E"
        placeholder={placeholder}
        onChangeText={handleChangeText}
        secureTextEntry={name === "password" && !showPassword}
      />
      {name === "password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons name={!showPassword ? "eye" : "eye-off" } color="#9E9E9E" size={24}/>
          </TouchableOpacity>
        )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
