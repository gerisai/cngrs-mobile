import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useQuery } from '@tanstack/react-query';
import { logo } from '@/constants/images';
import Stats from '@/components/Stats';
import CustomButton from "@/components/CustomButtom";
import Loading from '@/components/Loading';
import usePeople from "@/hooks/usePeople";

export default function Home() {
  const { getPeopleStats } = usePeople();

  const { data: accessed , isPending: accessLoading , error: accessError } = useQuery({
    queryFn: () => getPeopleStats({ accessed: 1 }),
    queryKey: ['person', 'accessed'],
    retry: false
  });

  const { data: total , isPending: totalPending, error: totalError } = useQuery({
    queryFn: () => getPeopleStats(),
    queryKey: ['person', 'total'],
    retry: false
  });

  if (accessLoading || totalPending) return <Loading/>;

  if (accessError || totalError) {
    const error = accessError || totalError;
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
    router.replace("/home");
  }

  return (
    <View
      className="w-full h-full flex items-center pt-8 bg-gray"
    >
      <View className="flex-row gap-2 items-center">
        <Image
          style={{ width: 50, height: 50 }}
          source={logo}
          onError={({error}) => console.log(error)}
        />
        <Text className="text-2xl text-primary font-rbold text-center">
            Congreso 2024
        </Text>
      </View>
      <Stats accessed={accessed} total={total}/>
      <View>
      <CustomButton
        title="Registrar Asistente"
        icon="qr-code-scanner"
        iconColor="white"
        containerStyles="my-2 p-6 bg-primary"
        textStyles="text-white"
        handlePress={() => router.push('/scanner')}
      />
      <CustomButton
        title="Registro Manual"
        icon="edit"
        iconColor="#0396B7"
        containerStyles="my-2 p-3 border-2 border-secondary-100"
        textStyles="text-secondary-100"
        handlePress={() => console.log('register')}
      />
      </View>
    </View>
  );
}
