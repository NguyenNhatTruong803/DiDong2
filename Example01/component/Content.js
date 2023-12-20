// Content.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity,Alert } from 'react-native';
import Slider from './Slider';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Content = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [visibleSpringItemCount, setVisibleSpringItemCount] = useState(3);
  const [cart, setCartItems] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu sản phẩm
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));

    // Replace this with your logic to get stored cart items
    
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const existingCart = await AsyncStorage.getItem('cart');
      const existingCartArray = existingCart ? JSON.parse(existingCart) : [];
  
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      const existingProduct = existingCartArray.find(item => item.id === product.id);
  
      if (existingProduct) {
        // Nếu đã tồn tại, cập nhật số lượng
        existingProduct.quantity += 1;
      } else {
        // Nếu chưa tồn tại, thêm mới vào giỏ hàng
        existingCartArray.push({ ...product, quantity: 1 });
      }
  
      // Lưu giỏ hàng mới vào AsyncStorage
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

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetail', { product,handleAddToCart });
  };

  const handleShowMoreSpring = () => {
    const newVisibleCount =
      visibleSpringItemCount === products.length ? 3 : products.length;
    setVisibleSpringItemCount(newVisibleCount);
  };
  return (
    <View>
      <Slider />
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
        data={products.slice(0, visibleSpringItemCount)}
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
