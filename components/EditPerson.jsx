import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/lib/context/user';
import CustomButton from "@/components/CustomButtom";
import FormField from "@/components/FormField";
import Select from '@/components/Select';
import { LangMappings } from "@/util/i8n";
import usePeople from "@/hooks/usePeople";
import canRoleDo from '@/util/roleValidation';
import { merge } from '@/util/utilities';
import { genders } from "@/constants/constants";
import validateForm from "@/util/formValidation";

export default function EditPerson({ person, setEnabled }) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [form, setForm] = useState({
    name: null,
    gender: null,
    cellphone: null,
    email: null,
    tutor: null,
    illness: null,
    zone: null,
    branch: null,
    city: null,
    room: null
  });
  const { updatePerson, deletePerson } = usePeople();
  const canEdit = canRoleDo(user.role, 'UPDATE', 'person');
  
  // Update
  const { mutateAsync: submit, isPending: updating } = useMutation({
    mutationFn: async () => {
      const merged = merge(person, form);
      if(!validateForm(merged, Alert.alert)) return
      try {
        await updatePerson({ personId: person.personId, ...merged });
        Toast.show({ type: 'success', topOffset: 100, text1: 'Asistente actualizado'});
        router.replace('/asistants');
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['people']);
    }
  });

  // Register
  const { mutateAsync: registerAccess, isPending: registering } = useMutation({
    mutationFn: async () => {
      try {
        await updatePerson({ personId: person.personId, accessed: true });
        Toast.show({ type: 'success', topOffset: 100, text1: 'Registro exitoso'});
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['people']);
    }
  });
  
  // Delete
  const { mutateAsync: del, isPending: deleting } = useMutation({
    mutationFn: async () => {
      try {
        await deletePerson(person.personId);
        setEnabled(false);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Asistente borrado'});
        router.replace('/asistants');
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['people']);
    }
  });
  
  const onDel = () => {
    Alert.alert("Confirmar", `¿Borrar asistente ${person.name}?`, [
      { text: 'Cancelar', style: 'cancel'},
      { text: 'Si', style: 'destructive', onPress: del},
    ])
  }

  
  return (
    <View className="flex gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-4xl font-rbold">
          Editar
        </Text>
        <CustomButton 
          title={`${person.accessed ? "Registrado" : "Registrar"}`}
          containerStyles={`rounded-xl p-3 px-8 ${person.accessed ? "bg-primary-100" : "shadow-sm bg-primary"}`}
          textStyles={`${person.accessed ? "text-primary-400" : "text-white"}`}
          handlePress={registerAccess}
          isLoading={registering}
        />
      </View>
      <FormField
        name="Nombre"
        value={form.name || person.name}
        handleChangeText={(e) => setForm({ ...form, name: e })}
        disabled={!canEdit}
        required
      />
      <Select
        title="Género"
        value={LangMappings.person.genders[form.gender || person.gender]}
        data={genders}
        onSelect={(e) => setForm({ ...form, gender: e })}
        disabled={!canEdit}
        required
      />
      <FormField
        name="Teléfono"
        value={form.cellphone || String(person.cellphone)}
        handleChangeText={(e) => setForm({ ...form, cellphone: e })}
        disabled={!canEdit}
        required
      />
      <FormField
        name="Correo"
        value={form.email || person.email}
        handleChangeText={(e) => setForm({ ...form, email: e })}
        disabled={!canEdit}
        required
      />
      <FormField
        name="Tutor"
        value={form.tutor || person.tutor}
        handleChangeText={(e) => setForm({ ...form, tutor: e })}
        disabled={!canEdit}
      />
      <FormField
        name="Observaciones médicas"
        value={form.illness || person.illness}
        handleChangeText={(e) => setForm({ ...form, illness: e })}
        disabled={!canEdit}
      />
      <FormField
        name="Zona / Estado"
        value={form.zone || person.zone}
        handleChangeText={(e) => setForm({ ...form, zone: e })}
        disabled={!canEdit}
      />
      <FormField
        name="Localidad"
        value={form.branch || person.branch}
        handleChangeText={(e) => setForm({ ...form, branch: e })}
        disabled={!canEdit}
      />
      <FormField
        name="Ciudad"
        value={form.city || person.city}
        handleChangeText={(e) => setForm({ ...form, city: e })}
        disabled={!canEdit}
      />
      <FormField
        name="Caurto"
        value={form.room || person.room}
        handleChangeText={(e) => setForm({ ...form, room: e })}
        disabled={!canEdit}
      />
      <View className="flex gap-0">
      { canEdit &&
        <>
        <CustomButton
          title={'Eliminar'}
          containerStyles="rounded-xl my-2 p-3 border-2 border-red-500"
          textStyles="text-red-500"
          handlePress={onDel}
          isLoading={deleting}
        />
        <CustomButton 
          title={'Guardar'}
          containerStyles="rounded-xl my-2 p-3 bg-primary"
          iconColor="#0396B7"
          textStyles="text-white"
          handlePress={submit}
          isLoading={updating}
        />
        </>
      }
      </View>
    </View>
  )
}