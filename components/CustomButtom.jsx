import { ActivityIndicator, Text, TouchableOpacity } from "react-native";


export default function CustomButton ({ title,handlePress,isLoading}) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`mt-5 rounded-xl min-h-[52px] flex flex-row justify-center items-center ${
        isLoading ? "bg-secondary" : "border-2 border-white"
      }`}
      disabled={isLoading}
    >
      <Text className={`text-white font-rmedium text-xl`}>
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
