import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function FAB ({ 
  title, 
  handlePress, 
  isLoading, 
  icon, 
  containerStyles, 
  iconColor, 
  iconSize = 24, 
  textStyles
 }) {
  return (
    <TouchableOpacity
      style={{
        width: 60,
        zIndex: 1,
        height: 60,
        position: 'absolute',
        bottom: 10,
        right: 14,
      }}
      onPress={handlePress}
      className={`flex flex-row justify-center items-center
      ${ isLoading ? "bg-secondary" : "" }
      ${containerStyles}
      `}
      disabled={isLoading}
    >
      { icon ? <MaterialIcons className={`${ title && "mr-2"}`} name={icon} color={iconColor} size={iconSize}/> : null }
      { title &&
      <Text className={`font-rmedium text-xl ${textStyles}`}>
        {isLoading ? "" : title}
      </Text>
      }
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
