import { View, KeyboardAvoidingView, ScrollView, Platform, Text, Alert } from "react-native";
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePeople from "@/hooks/usePeople";
import { genders, emptyPersonForm } from "@/constants/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import Select from '@/components/Select';
import { LangMappings } from "@/util/i8n";
import Back from '@/components/Back';
import validateForm from "@/util/formValidation";
import useReseteableState from "@/hooks/useReseteableState";

export default function Assistant() {
  const { createPerson } = usePeople();
  const queryClient = useQueryClient();
  const [form, setForm] = useReseteableState(emptyPersonForm);


  // Create
  const { mutateAsync: submit, isPending: creating, error } = useMutation({
    mutationFn: async () => {
      if(!validateForm(form, Alert.alert)) return
      try {
        await createPerson(form);
        setForm(emptyPersonForm);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Asistente creado'});
        router.replace('/asistants');
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['people']);
    }
  });

  if (error) {
    Alert.alert(`Error: ${error.message}`);
    router.replace("/asistants");
  }

  return (
    <KeyboardAvoidingView
      className="h-dvh"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView directionalLockEnabled={true}>
      <Back styles="px-2 pt-4" handlePress={() => router.replace('/asistants')} size={32} />
      <View className="w-full h-full flex px-8 py-2 bg-gray">
        <View className="flex gap-2">
          <View className="flex-row items-center justify-between">
            <Text className="text-4xl font-rbold">
              Crear asistente
            </Text>
          </View>
          <FormField
            name="Nombre"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            required
          />
          <Select
            title="Género"
            value={LangMappings.person.genders[form.gender]}
            data={genders}
            onSelect={(e) => setForm({ ...form, gender: e })}
            required
          />
          <FormField
            name="Teléfono"
            type="tel"
            value={form.cellphone}
            handleChangeText={(e) => setForm({ ...form, cellphone: e })}
            required
          />
          <FormField
            name="Correo"
            type="email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            required
          />
          <FormField
            name="Tutor"
            value={form.tutor}
            handleChangeText={(e) => setForm({ ...form, tutor: e })}
          />
          <FormField
            name="Observaciones médicas"
            value={form.illness}
            handleChangeText={(e) => setForm({ ...form, illness: e })}
            multiline={true}
          />
          <FormField
            name="Zona / Estado"
            value={form.zone}
            handleChangeText={(e) => setForm({ ...form, zone: e })}
          />
          <FormField
            name="Localidad"
            value={form.branch}
            handleChangeText={(e) => setForm({ ...form, branch: e })}
          />
          <FormField
            name="Ciudad"
            value={form.city}
            handleChangeText={(e) => setForm({ ...form, city: e })}
          />
          <View className="flex gap-0">
            <CustomButton
              title={'Cancelar'}
              containerStyles="rounded-xl my-2 p-3 border-2 border-orange-400"
              textStyles="text-orange-400"
              handlePress={() => router.push("/asistants")}
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
