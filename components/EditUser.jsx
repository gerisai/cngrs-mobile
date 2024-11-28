import { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@/lib/context/user';
import { Avatar } from "@react-native-material/core";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButtom";
import useUsers from '@/hooks/useUsers';
import { roles } from '@/constants/constants';
import Select from '@/components/Select';
import { LangMappings } from "@/util/i8n";
import canRoleDo from '@/util/roleValidation';
import validateForm from "@/util/formValidation";

export default function EditUser({ readUser }) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [form,setForm] = useState({
    username: readUser.username,
    name: readUser.name,
    role: readUser.role,
    password: null
  });
  const { updateUser, deleteUser } = useUsers();
  const canEdit = canRoleDo(user.role, 'UPDATE', 'user');

  // Update
  const { mutateAsync: submit, isPending: updating } = useMutation({
    mutationFn: async () => {
      if(!validateForm(form, Alert.alert)) return
      try {
        await updateUser(form);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Usuario actualizado'});
        router.replace('/users');
      } catch(err) {
        Toast.show({ type: 'error', topOffset: 100, text1: err.message });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  // Delete
  const { mutateAsync: del, isPending: deleting } = useMutation({
    mutationFn: async () => {
      try {
        await deleteUser(readUser.username);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Usuario borrado'});
        router.replace('/users');
      } catch(err) {
        Toast.show({ type: 'error', topOffset: 100, text1: err.message });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });
  
  const onDel = () => {
    Alert.alert("Confirmar", `¿Borrar usuario ${readUser.name}?`, [
      { text: 'Cancelar', style: 'cancel'},
      { text: 'Si', style: 'destructive', onPress: del},
    ])
  }

  return (
    <View className="flex gap-2">
      <Text className="text-4xl font-rbold mb-2">
        Información
      </Text>
      <View className="flex items-center">
        { readUser.avatar ?
          <Avatar image={{ uri: readUser.avatar }} size={72}/> :
          <Avatar label={readUser.name} size={72} color="#00BFDD"/>
        }
      </View>
      <FormField
        name="Usuario"
        value={form.username}
        disabled={true}
      />
      <FormField
        name="Nombre"
        value={form.name}
        handleChangeText={(e) => setForm({ ...form, name: e })}
        disabled={!canEdit}
        required
      />
      <Select
        title="Rol"
        value={LangMappings.user.roles[form.role]}
        data={roles}
        onSelect={(e) => setForm({ ...form, role: e })}
        disabled={!canEdit}
        required
      />
      <FormField
        name="Contraseña"
        value={form.password}
        secure={true}
        handleChangeText={(e) => setForm({ ...form, password: e })}
        disabled={!canEdit}
      />
      <View className="flex gap-0">
      { canEdit &&
        <>
        <CustomButton 
          title={'Guardar'}
          containerStyles="rounded-xl my-2 p-3 bg-primary"
          iconColor="#0396B7"
          textStyles="text-white"
          handlePress={submit}
          isLoading={updating}
        />
        <CustomButton 
          title={'Eliminar'}
          containerStyles="rounded-xl my-2 p-3 border-2 border-red-500"
          textStyles="text-red-500"
          handlePress={onDel}
          isLoading={deleting}
        />
        </>
      }
      </View>
    </View>
)
}