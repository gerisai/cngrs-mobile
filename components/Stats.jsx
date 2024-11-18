import { View, Text } from 'react-native';
import { Divider } from "@react-native-material/core";
import React from 'react';
import PieChart from 'react-native-pie-chart';

const stats = [
  {
    label: 'Registrados',
    value: 122
  },
  {
    label: 'Por registrar',
    value: 378
  },
  {
    label: 'Confirmados',
    value: 500
  }
]

export default function Stats() {
  const widthAndHeight = 180;
  const series = [100,500];
  const sliceColor = ['#00BFDD', '#EDEDED'];

  return (
    <View className="flex gap-2 bg-white w-11/12 border-1 rounded-md shadow-sm m-4 p-4">
        <Text className="text-xl font-rbold">
            Resumen de asistencia
        </Text>
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="flex flex-col">
            { stats.map((s, i) =>
              <View key={i}>
                { i !== 0 ? <Divider style={{ height: "1.5" }} color="#00BFDD"/> : null}
              <View className="py-2">
                <Text className="text-3xl text-center font-rbold">{s.value}</Text>
                <Text className="text-xs text-center text-color-gray">{s.label}</Text>
              </View>
              </View>
            )
            }
          </View>
          <View className="flex items-center justify-center">
            <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                coverRadius={0.70}
                coverFill={null}
            />
            <View className="absolute">
              <Text className="text-5xl font-rbold">60%</Text>
            </View>
          </View>
        </View>
    </View>
  )
}
