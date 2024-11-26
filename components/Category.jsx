import { ScrollView, View, Text } from 'react-native';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '@/components/Checkbox';
import Radio from '@/components/Radio';
import { Divider } from "@react-native-material/core";
import { getStaticCategory } from '@/constants/constants';
import usePeople from '@/hooks/usePeople';
import Loading from '@/components/Loading';

export default function Category ({ name, filter, setFilter, isStatic, isRadio }) {
  const { getPeopleCategory } = usePeople();

  const [checked,setChecked] = useState(filter[name].length === 0 ? null : filter[name][0]); // Pulling up radio state to enable "Todos" to change it

  const { data: category , isPending, error } = useQuery({
    queryFn: isStatic ? () => getStaticCategory(name) : () => getPeopleCategory(name),
    queryKey: ['category',{ name }],
    retry: false,
    staleTime: 5 * 60 * 1000 // Wait at least 5 min before refetching
  });

  if (isPending) return <Loading/>;
  if (error) return <View><Text>Error cargando opciones: {error.message}</Text></View>;

  const setAll = () => {
    setFilter({ ...filter, [name]: [] });
    if (isRadio) setChecked(null);
  }
  
  return (
    <ScrollView className="bg-white w-1/2">
      <Checkbox
        text="Todos"
        checked={filter[name].length === 0 ? true : false}
        handlePress={setAll}
        containerStyles="m-4"
      />
    <Divider />
    <View className="pr-4">
    { !isRadio ? category.map((c,i) => (
      <Checkbox
        key={i}
        text={c || "N/A"}
        checked={filter[name].includes(c)}
        handlePress={() => setFilter({ 
            ...filter,
            [name]: filter[name].concat([c]) })
        }
        containerStyles="mx-4 m-2"
      />
    )) :
      <Radio
        options={category}
        containerStyles="mx-4 m-2"
        handlePress={(value) => setFilter({
          ...filter, 
           [name]: [value]
          })
        }
        checked={checked}
        setChecked={setChecked}
      />
    }
    </View>
  </ScrollView>
  )
}