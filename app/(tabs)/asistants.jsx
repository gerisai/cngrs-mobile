import { View, ScrollView, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Card from '@/components/Card';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomButton from '@/components/CustomButtom';
import Loading from '@/components/Loading';
import Filter from '@/components/Filter';
import usePeople from '@/hooks/usePeople';
import { emptyPeopleFilter } from '@/constants/constants';

export default function Asistants() {
  const [filter,setFilter] = useState(emptyPeopleFilter); // filter object to collect properties
  const [filtersVisible, setFiltersVisible] = useState(false); // filter modal
  const [filterApplied, setFilterApplied] = useState(false); // apply controller to refecth data
  const { readPeople } = usePeople();
  const queryClient = useQueryClient();
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState(null);
  
  const { data: queryPeople , isPending, error } = useQuery({
    queryFn: () => {
      return readPeople({ name: search, ...filter })
    },
    queryKey: ['people', { search }, { filterApplied }],
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
    <>
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
          containerStyles="rounded-lg bg-primary w-2/12 shadow"
          icon="filter-alt"
          iconColor="white"
          iconSize={32}
          handlePress={()=> setFiltersVisible(true)}
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
    <Filter
      filter={filter}
      setFilter={setFilter}
      show={filtersVisible}
      setShow={setFiltersVisible}
      applyFn={setFilterApplied}
      applied={filterApplied}
      type="person"
    />
    </>
  );
}
