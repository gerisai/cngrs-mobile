import { StyleSheet } from 'react-native'
import { SearchBar } from '@rneui/themed';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CustomSearchBar({ value, onChangeText, submit, clear }) {
  return (
    <SearchBar
      containerStyle={styles.searchContainer}
      inputContainerStyle={styles.searchInputContainer}
      inputStyle={styles.searchInput}
      placeholderTextColor="#C2C2C2"
      searchIcon={
        <MaterialIcons name="search" color="#C2C2C2" size={24}/>
      }
      platform="default"
      clearIcon="cancel"
      lightTheme
      onChangeText={onChangeText}
      placeholder="Nombre"
      value={value}
      onBlur={submit}
      onClear={clear}
    />
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "75%", // w-10/12
    margin: 0, 
    padding: 0,
    backgroundColor: "#F4F4F4",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInputContainer: { 
    backgroundColor: "white",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#00BFDD",
    borderRadius: 6
  },
  searchInput: {
    margin: 0,
    paddingRight: 0
  }
})