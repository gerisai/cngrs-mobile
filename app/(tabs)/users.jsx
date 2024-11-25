import { View, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Card from '@/components/Card';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomButton from '@/components/CustomButtom';
import Loading from '@/components/Loading';
import useUsers from '@/hooks/useUsers';

export default function Users() {
  const { readUsers } = useUsers();
  const queryClient = useQueryClient();
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState(null);

  const { data: queryUsers , isPending, error } = useQuery({
    queryFn: () => readUsers({ name: search }),
    queryKey: ['users', { search }],
    retry: false
  });

  if (isPending) {
    return <Loading/>;
  }

  if (error) {
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
    router.replace("/home");
  }

  const onRefresh = () => {
    queryClient.invalidateQueries(['users', { search }]);
  }

  return (
    <ScrollView 
      className="w-full h-full p-4"
      directionalLockEnabled={true}
      refreshControl={
        <RefreshControl refreshing={isPending} onRefresh={onRefresh} />
      }
    >
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
      { queryUsers.map((p,i) =>
        <Card
          key={i}
          data={p}
          type="user"
        />
      )}
      </View>
    </ScrollView>
  );
}
