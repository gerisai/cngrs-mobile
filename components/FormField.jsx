import { Text, View, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useCustomState from "@/hooks/useCustomState";

export default function FormField({
  name,
  defaultValue,
  required = false,
  multiline = false,
  value,
  placeholder,
  handleChangeText,
  disabled,
  secure = false,
  type = "text"
}) 
{
  const [showPassword, setShowPassword] = useCustomState(false);
  const [valid, setValid] = useCustomState(true);

  const validate = () => {
    if (required && !value) setValid(false);
  }

  return (
    <View className="my-1">
      <Text className="text-md font-rbold mb-2">{name}<Text className="text-red-500">{required && " *"}</Text></Text>
      <TextInput
        inputMode={type}
        editable={!disabled}
        className={`bg-white border rounded-lg 
        font-rmedium text-black p-2 pl-3
        ${multiline ? "h-20" : "h-12"}
        ${disabled ? "opacity-50" : ""}
        ${valid ? "focus:border-primary" : "focus:border-red-500"}
        ${valid ? "border-slate-400" : "border-red-500"}
        `}
        textAlignVertical="top" // Multiline behaviour the same on iOS and Android
        multiline={multiline}
        onBlur={validate}
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
