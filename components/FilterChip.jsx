import { View, Text } from 'react-native';
import InfoField from '@/components/InfoField';

export default function FilterChip({ name, values }) {
  return (
    <View className="flex border bg-s-50 rounded-md border-s-300 mt-3 p-2">
      <InfoField
        icon="filter-alt"
        iconSize={16}
        iconColor="#2D9F92"
        value={name}
        valueColor="text-s-500"
      />
      <View className="m-1">
        <Text style={{ flex: 1 }} ellipsizeMode="tail" numberOfLines={1} className="font-rbold">{values || 'N/A'}</Text>
      </View>
    </View>
  )
}