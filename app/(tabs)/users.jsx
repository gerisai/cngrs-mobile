import { View, FlatList, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useUser } from '@/lib/context/user';
import Card from '@/components/Card';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomButton from '@/components/CustomButtom';
import Loading from '@/components/Loading';
import Filter from '@/components/Filter';
import useUsers from '@/hooks/useUsers';
import { emptyUsersFilter, pageSize } from '@/constants/constants';
import canRoleDo from '@/util/roleValidation';
import EmptyResult from '@/components/EmptyResult';
import FAB from '@/components/FAB';

export default function Users() {
  const [filter,setFilter] = useState(emptyUsersFilter); // Filter object to collect properties
  const [filtersVisible, setFiltersVisible] = useState(false); // Filter modal
  const [filterApplied, setFilterApplied] = useState(false); // Controls filter applied state
  const [filterChanged,setFilterChanged] = useState(false); // Controls changes in filter to refetch
  const { readUsers } = useUsers();
  const queryClient = useQueryClient();
  const [input, setInput] = useState(null);
  const [search, setSearch] = useState(null);
  const { user } = useUser();
  const canCreate = canRoleDo(user.role, 'CREATE', 'user');

  const { data: queryUsers , isPending, fetchNextPage, hasNextPage, error } = useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => {
      return readUsers({ name: search, ...filter, limit: pageSize, page: pageParam })
    },
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.length >= pageSize ? allPages.length + 1 : undefined
    },
    queryKey: ['users', { search }, { filterChanged }],
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
    queryClient.invalidateQueries(['users', { search }, { filterChanged }]);
  }

  return (
    <>
    <View
      className="w-full h-full p-4"
    >
      { canCreate &&
        <FAB
          icon="add"
          containerStyles="bg-primary rounded-full"
          iconSize={32}
          iconColor="white"
          handlePress={() => router.push("/user/new/user")}
        />
      }
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
          data={queryUsers.pages.flat()}
          keyExtractor={item => item.username}
          renderItem={({ item }) => 
            <Card
              data={item}
              type="user"
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
      type="user"
    />
    </>
  );
}
