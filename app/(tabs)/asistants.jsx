import { View, ScrollView } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Card from '@/components/Card';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomButton from '@/components/CustomButtom';
import usePeople from '@/hooks/usePeople';

export default function Asistants() {
  const { readPeople } = usePeople();
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState(null);
  
  const { data: queryPeople , isPending, error } = useQuery({
    queryFn: () => readPeople({ name: search }),
    queryKey: ['people', { search }],
    retry: false
  });

  if (isPending) {
    return <View className="bg-gray w-full h-full"/>
  }

  if (error) {
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
    router.replace("/home");
  }

  return (
    <ScrollView className="w-full h-full p-4" directionalLockEnabled={true}>
      <View className="flex-row gap-6">
        <CustomSearchBar
          onChangeText={e => setInput(e)}
          value={input}
          submit={() => setSearch(input)}
          clear={() => setSearch(null)}
        />
        <CustomButton
          containerStyles="bg-primary w-2/12 rounded-lg shadow"
          icon="filter-alt"
          iconColor="white"
          iconSize={32}
        />
      </View>
      <View className="flex items-center pt-4 gap-4">
      { queryPeople.map((p,i) =>
        <Card
          key={i}
          data={p}
          type="person"
        />
      )}
      </View>
    </ScrollView>
  );
}
