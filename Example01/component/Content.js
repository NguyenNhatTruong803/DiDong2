// Content.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Slider from './product/Slider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProducts } from './api/apiService'; 
import ProductSearch from './product/ProductSearch'; // Import the ProductSearch component
import CategoryList from './product/CategoryList';
const Content = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [visibleSpringItemCount, setVisibleSpringItemCount] = useState(3);
  const [cart, setCartItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const existingCartArray = existingCart ? JSON.parse(existingCart) : [];
      const existingProduct = existingCartArray.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        existingCartArray.push({ ...product, quantity: 1 });
      }
      await AsyncStorage.setItem('cart', JSON.stringify(existingCartArray));
      setCartItems(existingCartArray);
      Alert.alert('Thông báo', `Đã thêm sản phẩm ${product.title} vào giỏ hàng !`);
    } catch (error) {
      console.error('Lỗi khi thêm vào giỏ hàng:', error);
    }
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

  const handleShowMoreSpring = () => {
    const dataToShow = searchResults.length > 0 ? searchResults : products;
    const newVisibleCount =
      visibleSpringItemCount === dataToShow.length ? 3 : dataToShow.length;
    setVisibleSpringItemCount(newVisibleCount);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product, handleAddToCart });
  };

  const handleSearchPress = () => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSelectCategory = async (category) => {
    setSelectedCategory(category);
    try {
      const categoryProducts = await getProductsByCategory(category);
      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };
  return (
    <View>
      <ProductSearch
        searchText={searchText}
        onSearchTextChange={setSearchText}
        onSearchPress={handleSearchPress}
      />
      <Slider />
      <CategoryList onSelectCategory={handleSelectCategory} />
      <View style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.sectionTitle}>Spring Collection</Text>
          {visibleSpringItemCount < products.length && (
            <TouchableOpacity onPress={handleShowMoreSpring} style={styles.showMoreButton}>
              <Text style={styles.showMoreButtonText}>Xem thêm</Text>
            </TouchableOpacity>
          )}
        </View>
        <FlatList
          data={searchResults.length > 0 ? searchResults.slice(0, visibleSpringItemCount) : products.slice(0, visibleSpringItemCount)}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 3,
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 120,
    height: 150,
    
  },
  showMoreButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    borderRadius: 5,
  },
  showMoreButtonText: {
    fontSize: 16,
  },
  productItem: {
    flex: 1,
    alignItems: 'center',
    width:133,
    margin:2,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  addToCartButton: {
    backgroundColor: '#FF6633',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});

export default Content;
