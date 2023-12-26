// CategoryList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { getCategories } from '../api/apiService';

const CategoryList = ({ onSelectCategory,onAllPress}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        // Add "All" category to the beginning of the categories array
        setCategories(['All', ...categoryData]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectCategory(item)}>
      <View style={styles.categoryItem}>
        <Text>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Categories</Text>
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.toString()}
      horizontal
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoryItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});

export default CategoryList;
