import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import '../global.css';

export default function FormField({
  name,
  defaultValue,
  value,
  placeholder,
  handleChangeText,
  disabled,
  secure=false
}) 
{
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="my-1">
      <Text className="text-md font-rbold mb-2">{name}</Text>
      <TextInput
        editable={!disabled}
        className={`h-12 bg-white border border-slate-400 rounded-lg 
        font-rmedium text-black p-2 focus:border-primary ${disabled ? "opacity-50" : ""}`}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure && !showPassword}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
      />
      { secure &&
      <TouchableOpacity className="absolute self-end py-10 pr-4" onPress={() => setShowPassword(!showPassword)}>
        <MaterialCommunityIcons name={!showPassword ? "eye-off" : "eye" } color="#000" size={20}/>
      </TouchableOpacity>
      }
  </View>
  );
};
