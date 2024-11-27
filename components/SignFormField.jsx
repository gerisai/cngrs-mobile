import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TextInput } from "@react-native-material/core";

export default function SignFormField({
  name,
  value,
  icon,
  iconColor,
  iconSize,
  placeholder,
  handleChangeText,
  containerStyles
})
{
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`${containerStyles}`}>
      <TextInput
        className="font-rregular"
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
        leading={props => <MaterialIcons name={icon} color={iconColor} size={iconSize}/>}
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
