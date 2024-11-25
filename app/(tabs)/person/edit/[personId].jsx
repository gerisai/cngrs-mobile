import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { router, useLocalSearchParams } from 'expo-router';
import Loading from '@/components/Loading';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import usePeople from "@/hooks/usePeople";
import EditPerson from '@/components/EditPerson';

export default function Assistant() {
  const { personId } = useLocalSearchParams();
  const { readPerson } = usePeople();

  const { data: person , isPending, error } = useQuery({
    queryFn: () => readPerson(personId),
    queryKey: ['person', { personId }],
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
        <EditPerson person={person}/>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
