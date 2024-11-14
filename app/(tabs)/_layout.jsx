import { Tabs } from "expo-router";
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const tabs = [
    { name: 'index', title: 'Inicio', icon: 'home' },
    { name: 'scan', title: 'Scan', icon: 'qr-code-scanner' },
    { name: 'asistants', title: 'Registro', icon: 'checklist' },
    { name: 'users', title: 'Usuarios', icon: 'groups' },
]

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0396B7',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0000',
        }
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
                      ? [props.style, { borderTopColor: '#0396B7', borderTopWidth: 5 }]
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
    </Tabs>
  )
}
