import { View, Text } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { fields } from '@/constants/constants';
import CustomButton from "@/components/CustomButtom";
import InfoField from "@/components/InfoField";
import Loading from '@/components/Loading';
import usePeople from "@/hooks/usePeople";

const types = {
  light: {
    iconColor: "#5CC3B5",
    labelColor: "text-green-400"
  },
  dark: {
    iconColor: "#218076",
    labelColor: "text-green-600"
  }
}

const displayFields = ["zone", "branch", "city", "room"];

export default function Assistant() {
  const queryClient = useQueryClient();
  const { personId } = useLocalSearchParams();
  const { readPerson, updatePerson } = usePeople();

  const { data: person , isPending, error } = useQuery({
    queryFn: () => readPerson(personId),
    queryKey: ['person'],
    retry: false
  });

  const { mutateAsync: registerAccess } = useMutation({
    mutationFn: async () => {
      try {
        await updatePerson({ personId, accessed: true });
        Toast.show({ type: 'success', topOffset: 100, text1: 'Registro exitoso'});
        router.replace('/home')
      } catch(err) {
        Toast.show({ type: 'error', topOffset: 100, text1: err });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['people']);
    }
  });

  if (isPending) {
    return <Loading/>;
  }

  if (error) {
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
    router.replace("/home");
  }

  return (
    <View
      className="w-full h-full flex items-center pt-4 bg-gray"
    >
      <View className="flex gap-2 bg-white w-11/12 border-1 rounded-xl shadow-sm m-4 p-4">
        <MaterialIcons className="self-center" name="account-circle" color="#00BFDD" size={72}/>
        <Text className="text-2xl text-center font-rmedium px-12">
            {person.name}
        </Text>
        <View className="my-6 mx-2 flex gap-3">
          { displayFields.map((f,i) => {
            const style = types[i % 2 ? "light" : "dark"];
            const field = fields[f]
            return (<InfoField
              key={i}
              icon={field.icon}
              iconColor={style.iconColor}
              iconSize={32}
              textSize="text-xl"
              labelColor={style.labelColor}
              label={field.label}
              value={person[f]}
            />)
            })
          }
        </View>
        { !person.accessed ?
          <CustomButton
          title="Registrar"
          icon="check"
          iconColor="white"
          containerStyles="rounded-xl my-2 p-3 bg-primary shadow"
          textStyles="text-white"
          handlePress={registerAccess}
        />
        :
          <View className="flex-row items-center justify-center">
            <MaterialIcons name="check-circle" color="#2D9F92" size={32}/>
            <Text className="text-2xl text-green-600 text-center font-rmedium px-2">Registrado</Text>
          </View>
        }
    </View>
    </View>
  );
}
