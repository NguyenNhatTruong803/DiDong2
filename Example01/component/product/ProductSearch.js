// ProductSearch.js
import React from 'react';
import { View, TextInput, TouchableOpacity ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductSearch = ({ searchText, onSearchTextChange, onSearchPress }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchText}
        onChangeText={onSearchTextChange}
      />
      <TouchableOpacity onPress={onSearchPress}>
        <Icon name="search" size={20} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    margin:3,
    padding: 1,
    width:'100%',
},
searchInput: {
    flex: 1,
},
});
export default ProductSearch;
