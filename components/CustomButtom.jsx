import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CustomButton ({ title, handlePress, isLoading, icon, containerStyles, iconColor, textStyles, }) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`rounded-xl flex flex-row justify-center items-center 
      ${ isLoading ? "bg-secondary" : "" }
      ${containerStyles}
      `}
      disabled={isLoading}
    >
      { icon ? <MaterialIcons className="mr-2" name={icon} color={iconColor} size={24}/> : null }
      <Text className={`font-rmedium text-xl ${textStyles}`}>
        {isLoading ? "" : title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};
