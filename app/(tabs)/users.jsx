import { Text, View, StyleSheet } from 'react-native';

export default function UsersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Usuarios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
