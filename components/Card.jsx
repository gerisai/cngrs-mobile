import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import InfoFields from '@/components/InfoFields';
import { fields } from '@/constants/constants';

const typeStyles = {
    true: {
        icon: "check-circle",
        color: "#00BFDD"
    },
    false: {
        icon: "pending",
        color: "#C2C2C2"
    }
}

function buildData (data, type) {
  // Create nested list with pair of items to display them properly in UI
  const typeFields = {
    user: ["role"],
    person: ["zone", "branch", "room", "city"]
  }
  const builtData = []; // General list
  let pair = [] // Temp pair list to push to general list
  typeFields[type].forEach((e,i) => {
    pair.push({
      icon: fields[e].icon,
      value: data[e] || "Pendiente"
    });
    if (i % 2 !== 0) {
      builtData.push(pair);
      pair = []
    }
  });
  return builtData;
}


export default function Card({ data, type }) {
  const style = typeStyles[data.accessed]
  const displayData = buildData(data,type);

  return (
    <View className="flex gap-2 bg-white border-1 rounded-md p-4">
      <TouchableOpacity onPress={() => router.push(`/person/edit/${data.personId}`)}>
      <View className="flex-row gap-2">
        {  type && <MaterialIcons name={style.icon} color={style.color} size={24}/> }
        <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1} className="text-lg font-rbold">{data.name}</Text>
      </View>
      <View>
        { displayData.map((d,i) => {
          return (<InfoFields
            key={i}
            iconColor="#757575"
            iconSize={24}
            valueColor="text-[#757575]"
            textSize="text-md"
            data={d}
          />)
        })}
      </View>
      </TouchableOpacity>
    </View>
  )
}