import { View, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import useUsers from '@/hooks/useUsers';
import EditUser from '@/components/EditUser';
import Loading from '@/components/Loading';
import Back from '@/components/Back';

export default function User() {
  const { username } = useLocalSearchParams();
  const { readUser } = useUsers();

  const { data: user , isPending, error } = useQuery({
    queryFn: () => readUser(username),
    queryKey: ['user', { username }],
    retry: false
  });

  if (isPending) {
    return <Loading/>;
  }

  if (error) {
    Alert.alert(`Error: ${error.message}`);
    router.replace("/users");
  }

  return (
    <KeyboardAvoidingView
      className="h-dvh"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView directionalLockEnabled={true}>
      <Back styles="px-2 pt-4" handlePress={() => router.push('/users')} size={32} />
      <View className="w-full h-full flex px-8 py-2 bg-gray">
        <EditUser
          readUser={user}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
