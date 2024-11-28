import { View, KeyboardAvoidingView, ScrollView, Platform, Text } from "react-native";
import { router } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePeople from "@/hooks/useUsers";
import { roles, emptyUserForm } from "@/constants/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import Select from '@/components/Select';
import { LangMappings } from "@/util/i8n";
import Back from '@/components/Back';

export default function User() {
  const { createUser } = usePeople();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyUserForm);

  // Create
  const { mutateAsync: submit, isPending: creating, error } = useMutation({
    mutationFn: async () => {
      try {
        await createUser(form);
        setForm(emptyUserForm);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Usuario creado'});
        router.replace('/users');
      } catch(err) {
        Toast.show({ type: 'error', topOffset: 100, text1: err.message });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  if (error) {
    Toast.show({ type: 'error', topOffset: 100, text1: error.message });
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
        <View className="flex gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl font-rbold">
              Crear usuario
            </Text>
          </View>
          <FormField
            name="Usuario"
            value={form.username}
          />
          <FormField
            name="Nombre"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
          />
          <Select
            title="Rol"
            value={LangMappings.user.roles[form.role]}
            data={roles}
            onSelect={(e) => setForm({ ...form, role: e })}
          />
          <FormField
            name="Contraseña"
            value={form.password}
            secure={true}
            handleChangeText={(e) => setForm({ ...form, password: e })}
          />
          <View className="flex gap-0">
            <CustomButton
              title={'Cancelar'}
              containerStyles="rounded-xl my-2 p-3 border-2 border-orange-400"
              textStyles="text-orange-400"
              handlePress={() => router.push("/users")}
            />
            <CustomButton 
              title={'Guardar'}
              containerStyles="rounded-xl my-2 p-3 bg-primary"
              iconColor="#0396B7"
              textStyles="text-white"
              handlePress={submit}
              isLoading={creating}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
