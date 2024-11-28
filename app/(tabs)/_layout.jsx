import { router, Tabs } from "expo-router";
import { Pressable, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Avatar } from "@react-native-material/core";
import { useUser } from '@/lib/context/user';

const tabs = [
    { name: 'home', title: 'Inicio', icon: 'home'},
    { name: 'scan', title: 'Scan', icon: 'qr-code-scanner' },
    { name: 'asistants', title: 'Registro', icon: 'checklist' },
    { name: 'users', title: 'Usuarios', icon: 'groups' }
]

export default function TabsLayout() {
  const { user } = useUser();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#00BFDD',
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#0000',
          boxShadow: "0px -3px 4px 0px rgba(0, 0, 0, 0.15)"
        },
        headerBackground: (props) => (
          <LinearGradient
            colors={['#00BFDD','#5CC3B5']}
            style={{ flex: 1 }}
            start={[0,0]}
            end={[1,1]}
          />
        ),
        headerTitle: (props) => (
          <TouchableOpacity
            className="flex flex-row items-center justify-center gap-2 pb-2"
            onPress={() => router.push("/user")}
          >
            { user.avatar ?
             <Avatar image={{ uri: user.avatar }} size={32}/> :
             <MaterialIcons name="account-circle" color="white" size={32}/>
            }
            <Text className="text-white font-rmedium text-2xl">
              {user.name.split(" ")[0]}
            </Text>
          </TouchableOpacity>
          
        ),
        headerBackgroundContainerStyle: {
          boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15)"
        },
        headerTitleAlign: "left"
      }}
    >
    {
      tabs.map((t,i) => (
        <Tabs.Screen key={i} name={t.name} options={{ 
          title: t.title,
          tabBarIcon: ({ color }) => (
              <MaterialIcons name={t.icon} color={color} size={24}/>
          ),
          tabBarButton: ({children, ...props}) => {
            return (
            <Pressable
              {...props}
              style={
                props.accessibilityState.selected
                  ? [props.style, { borderTopColor: '#00BFDD', borderTopWidth: 5, color: "#fff" }]
                  : [props.style, { borderTopColor: '#8E8E8F', borderTopWidth: 5 }]
              }
            >
              {children}
            </Pressable>
          )}
          }}
        />
      ))
    }
      <Tabs.Screen name="user" options={{href: null}}/>
      <Tabs.Screen name="person/register/[personId]" options={{ href: null }}/>
      <Tabs.Screen name="person/edit/[personId]" options={{href: null, freezeOnBlur: true }}/>
      <Tabs.Screen name="person/new/person" options={{ href: null, freezeOnBlur: true } }/>
      <Tabs.Screen name="user/edit/[username]" options={{ href: null , freezeOnBlur: true}}/>
      <Tabs.Screen name="user/new/user" options={{ href: null, freezeOnBlur: true } }/>
    </Tabs>
  )
}
