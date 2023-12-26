// ProductsByCategory.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getProductsByCategory } from '../api/apiService'; // Assuming you have an appropriate API service function

const ProductsByCategory = ({ route }) => {
  const { categoryId, categoryTitle } = route.params;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const data = await getProductsByCategory(categoryId);
        setCategoryProducts(data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      }
    };

    fetchCategoryProducts();
  }, [categoryId]);

  const handleProductPress = (product) => {
    // You can navigate to the product detail screen or perform any other actions
    navigation.navigate('ProductDetail', { product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item)}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productPrice}>{`$${item.price}`}</Text>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCartButton}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text>Sản phẩm theo danh mục : {categoryTitle}</Text>
      <FlatList
        data={categoryProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ProductsByCategory;
