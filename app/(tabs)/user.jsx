import { useState } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import { router} from 'expo-router';
import CustomButton from "@/components/CustomButtom";
import FormField from "@/components/FormField";
import Select from '@/components/Select';
import { useUser } from '@/lib/context/user';
import useUsers from '@/hooks/useUsers';
import { LangMappings } from "@/util/i8n";
import canRoleDo from '@/util/roleValidation';
import { roles } from '@/util/constants';

export default function User() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { user, logout } = useUser();
  const [form,setForm] = useState({
    username: user.username,
    name: null,
    role: null,
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
      Toast.show({ type: 'error', topOffset: 100, text1: err.message});
    }
  }

  const submit = async () => {
    try {
      setSubmitting(true);
      await updateUser(form);
      router.replace("/home");
    } catch (err) {
      Toast.show({ type: 'error', topOffset: 100, text1: err.message});
    } finally {
      setSubmitting(false);
      setForm({
        username: user.username,
        name: null,
        role: null,
        password: null
      });
    }
  }

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
          />
          <Select
            title="Rol"
            value={LangMappings.user.roles[form.role || user.role]}
            data={roles}
            onSelect={(e) => setForm({ ...form, role: e })}
            disabled={!canEdit}
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
              containerStyles="my-2 p-3 bg-primary"
              iconColor="#0396B7"
              textStyles="text-white"
              handlePress={submit}
              isLoading={isSubmitting}
            />
          }
            <CustomButton 
              title={'Cerrar Sesión'}
              containerStyles="my-2 p-3 border-2 border-red-500"
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
