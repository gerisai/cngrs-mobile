import { View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function Loading() {
  return (
    <View className="w-full h-full justify-center">
      <ActivityIndicator
        animating={true}
        color="#00BFDD"
        size="large"
      />
    </View>
  )
}
