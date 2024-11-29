import { View, KeyboardAvoidingView, ScrollView, Platform, Text, Alert } from "react-native";
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePeople from "@/hooks/useUsers";
import { roles, emptyUserForm } from "@/constants/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import Select from '@/components/Select';
import { LangMappings } from "@/util/i8n";
import Back from '@/components/Back';
import validateForm from "@/util/formValidation";
import useCustomState from "@/hooks/useCustomState";

export default function User() {
  const { createUser } = usePeople();
  const queryClient = useQueryClient();
  const [form, setForm] = useCustomState(emptyUserForm);

  // Create
  const { mutateAsync: submit, isPending: creating, error } = useMutation({
    mutationFn: async () => {
      if(!validateForm(form, Alert.alert)) return
      try {
        await createUser(form);
        setForm(emptyUserForm);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Usuario creado'});
        router.replace('/users');
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

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
        <View className="flex gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl font-rbold">
              Crear usuario
            </Text>
          </View>
          <FormField
            name="Usuario"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            autoCapitalize="none"
            required
          />
          <FormField
            name="Nombre"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            required
          />
          <FormField
            name="Correo"
            type="email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            required
          />
          <Select
            title="Rol"
            value={LangMappings.user.roles[form.role]}
            data={roles}
            onSelect={(e) => setForm({ ...form, role: e })}
            required
          />
          <FormField
            name="Contraseña"
            value={form.password}
            secure={true}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            required
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
