// Hook used for auto reseting state
import { useEffect, useState } from "react";
import { useNavigation } from 'expo-router';

export default function useReseteableState (defaultValue) {
  const navigation = useNavigation();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
      return navigation.addListener("focus", () => {
          setValue(defaultValue);
      });
  }, [navigation]);

  return [value, setValue];
};
