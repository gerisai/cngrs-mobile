import { View, Modal, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import FilterItem from '@/components/FilterItem';
import CustomButton from '@/components/CustomButtom';
import Category from '@/components/Category';
import { emptyPeopleFilter , emptyUsersFilter, categories, staticCategories, mutuallyExclusiveCategories } from '@/constants/constants';

const defaults = {
  user: {
    emptyFilter: emptyUsersFilter,
    initialCategory: "role"
  },
  person: {
    emptyFilter: emptyPeopleFilter,
    initialCategory: "room"
  }

}

export default function Filter({ show, setShow, filter, setFilter, applied, applyFn, type }) {
  const [category,setCategory] = useState(defaults[type].initialCategory);

  const typeCategories = categories[type];

  const resetFilter = () => {
    setFilter(defaults[type].emptyFilter);
  }

  const apply = () => {
    setShow(false);
    applyFn(!applied);
  }

  return (
    <Modal
      className="flex-1 items-center justify-center"
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        setShow(!show);
    }}>
      <View className="flex-1 justify-end items-center">
        <View style={{ height: '86%' }} className="bg-gray w-full">
          <TouchableOpacity onPress={resetFilter} className="flex items-end justify-center py-5 px-5">
            <Text className="text-primary-600 text-xl font-rbold">Reiniciar todos los filtros</Text>
          </TouchableOpacity>
          <View style={{ height: '73%' }} className="flex-row">
            <View className="bg-[#EDEDED] w-1/2">
              <FlatList
                data={typeCategories}
                renderItem={({item}) => 
                  <FilterItem 
                    title={item.title}
                    value={item.value}
                    handlePress={() => setCategory(item.value)}
                    active={category === item.value}
                  />
                  }
                keyExtractor={item => item.id}
              />
            </View>
            <Category
              name={category}
              filter={filter}
              setFilter={setFilter}
              isStatic={staticCategories.includes(category)}
              isRadio={mutuallyExclusiveCategories.includes(category)}
            />
          </View>
          <View className="flex-row justify-center items-center py-5 px-5">
            <CustomButton
              containerStyles="rounded-full border-2 border-primary-500 py-4 px-12"
              textStyles="text-primary-500"
              handlePress={apply}
              title="Aplicar"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}