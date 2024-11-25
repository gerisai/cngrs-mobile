import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import useUsers from '@/hooks/useUsers';
import EditUser from '@/components/EditUser';
import Loading from '@/components/Loading';

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
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
    router.replace("/home");
  }

  return (
    <KeyboardAvoidingView
      className="h-dvh"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView directionalLockEnabled={true}>
      <View className="w-full h-full flex p-8 bg-gray">
        <EditUser
          readUser={user}
        />
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
