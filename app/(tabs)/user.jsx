import { useState } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Avatar } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import { router} from 'expo-router';
import CustomButton from "@/components/CustomButtom";
import FormField from "@/components/FormField";
import Back from "@/components/Back";
import Select from '@/components/Select';
import { useUser } from '@/lib/context/user';
import useUsers from '@/hooks/useUsers';
import { LangMappings } from "@/util/i8n";
import canRoleDo from '@/util/roleValidation';
import { roles } from '@/constants/constants';

export default function User() {
  const { user, logout } = useUser();
  const queryClient = useQueryClient();
  const [form,setForm] = useState({
    username: user.username,
    name: user.name,
    role: user.role,
    password: null
  });
  const { updateUser, uploadAvatar } = useUsers();

  const canEdit = canRoleDo(user.role,'UPDATE', 'user');

  const chooseAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) return // No picture selected

    try {
      const avatar = result.assets[0];
      const data = new FormData();
      data.append('avatar', {
        name: 'avatar',
        type: avatar.type,
        uri: Platform.OS === 'ios' ? avatar.uri.replace('file://', '') : avatar.uri
      });
      await uploadAvatar(user.username, data);
      Toast.show({ type: 'success', topOffset: 100, text1: 'Avatar actualizado'});
    }
    catch (err) {
      Alert.alert(`Error: ${err.message}`);
    }
  }

  const { mutateAsync: submit, isPending: updating } = useMutation({
    mutationFn: async () => {
      try {
        await updateUser(form);
        Toast.show({ type: 'success', topOffset: 100, text1: 'Usuario actualizado'});
        setForm({ ...form, password: null });
        router.replace('/home')
      } catch(err) {
        Alert.alert(`Error: ${err.message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  const onLogout = async () => {
    await logout();
    router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      className="h-dvh"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={10}
    >
      <ScrollView directionalLockEnabled={true}>
      <Back styles="px-2 pt-4" handlePress={() => router.back()} size={32} />
      <View className="w-full h-full flex p-8 bg-gray">
        <View className="flex gap-2">
          <Text className="text-4xl font-rbold mb-2">
            Información
          </Text>
          <TouchableOpacity className="flex items-center" onPress={chooseAvatar}>
            { user.avatar ?
              <Avatar image={{ uri: user.avatar }} size={72}/> :
              <Avatar label={user.name} size={72} color="#00BFDD"/>
            }
          </TouchableOpacity>
          <FormField
            name="Usuario"
            defaultValue={user.username}
            disabled={true}
          />
          <FormField
            name="Nombre"
            value={form.name}
            defaultValue={user.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            disabled={!canEdit}
            required
          />
          <Select
            title="Rol"
            value={LangMappings.user.roles[form.role || user.role]}
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
            <CustomButton 
              title={'Guardar'}
              containerStyles="rounded-xl my-2 p-3 bg-primary"
              iconColor="#0396B7"
              textStyles="text-white"
              handlePress={submit}
              isLoading={updating}
            />
          }
            <CustomButton 
              title={'Cerrar Sesión'}
              containerStyles="rounded-xl my-2 p-3 border-2 border-red-500"
              textStyles="text-red-500"
              handlePress={onLogout}
            />
          </View>
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
