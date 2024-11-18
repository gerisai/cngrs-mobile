import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from "@react-native-material/core";
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
      <TextInput
        className="font-rlight"
        style={{
          backgroundColor: 'white',
          borderRadius: 5
        }}
        inputStyle={{
          fontSize: 18
        }}
        placeholder={placeholder} 
        variant="none"
        color="#00BFDD"
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={name === "password" && !showPassword}
        leading={props => <MaterialIcons name={icon} color="#9E9E9E" size={24} {...props} />}
        trailing={props =>
            name === "password" && 
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialCommunityIcons name={!showPassword ? "eye-off" : "eye" } color="#00BFDD" size={24}/>
            </TouchableOpacity>
        }
      />
  </View>
  );
};
