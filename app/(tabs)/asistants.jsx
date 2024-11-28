import { View, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import Card from '@/components/Card';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomButton from '@/components/CustomButtom';
import Loading from '@/components/Loading';
import Filter from '@/components/Filter';
import usePeople from '@/hooks/usePeople';
import { emptyPeopleFilter, pageSize } from '@/constants/constants';
import EmptyResult from '@/components/EmptyResult';
import FAB from '@/components/FAB';

export default function Asistants() {
  const [filter, setFilter] = useState(emptyPeopleFilter); // Filter object to collect properties
  const [filtersVisible, setFiltersVisible] = useState(false); // Filter modal
  const [filterApplied, setFilterApplied] = useState(false); // Controls filter applied state
  const [filterChanged,setFilterChanged] = useState(false); // Controls changes in filter to refetch
  const { readPeople } = usePeople();
  const queryClient = useQueryClient();
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState(null);
  
  const { data: queryPeople , isPending, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      return readPeople({ name: search, ...filter, limit: pageSize, page: pageParam })
    },
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length >= pageSize ? allPages.length + 1 : undefined
    },
    queryKey: ['people', { search }, { filterChanged }],
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
    queryClient.invalidateQueries(['people', { search }, { filterChanged }]);
  }

  return (
    <>
    <View
      className="w-full h-full p-4"
    >
      <FAB
        icon="add"
        containerStyles="bg-primary rounded-full"
        iconSize={32}
        iconColor="white"
        handlePress={() => router.push("/person/new/person")}
      />
      <View className="flex-row gap-6">
        <CustomSearchBar
          onChangeText={e => setInput(e)}
          value={input}
          submit={() => setSearch(input)}
          clear={() => setSearch(null)}
        />
        <CustomButton
          containerStyles={`${filterApplied ? "bg-secondary" : "bg-primary"} rounded-lg w-2/12 shadow`}
          icon={filterApplied ? "filter-alt-off" : "filter-alt"}
          iconColor="white"
          iconSize={32}
          handlePress={()=> setFiltersVisible(true)}
        />
      </View>
      <View style={{ paddingBottom: 35 }}>
        <FlatList
          onRefresh={onRefresh}
          refreshing={isPending}
          data={queryPeople.pages.flat()}
          keyExtractor={item => item.personId}
          renderItem={({ item }) => 
            <Card
              data={item}
              type="person"
            />
          }
          onEndReached={hasNextPage && fetchNextPage}
          ListFooterComponent={isPending && ActivityIndicator}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyResult/>}
        />
      </View>
    </View>
    <Filter
      filter={filter}
      setFilter={setFilter}
      show={filtersVisible}
      setShow={setFiltersVisible}
      applyFn={setFilterApplied}
      applied={filterApplied}
      filterChanged={filterChanged}
      setFilterChanged={setFilterChanged}
      type="person"
    />
    </>
  );
}
