import { Text, View, StyleSheet } from 'react-native';

export default function AsistantsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Registro</Text>
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
