import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image ,Alert} from 'react-native';
import Footer from '../Footer';
import { useFocusEffect } from '@react-navigation/native';

const Cart = () => {
  const [cart, setCartItems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cart');
          const parsedCart = storedCart ? JSON.parse(storedCart) : [];
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
        }
      };
      fetchCart();
    }, [])
  );
  
  const removeItemFromCart = async (itemId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?',
      [
        {
          text: 'Có',
          onPress: async () => {
            try {
              const updatedCart = cart.filter((item) => item.id !== itemId);
              setCartItems(updatedCart);
              await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
            } catch (error) {
              console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
            }
          },
        },
        {
          text: 'Không',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
  
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      } catch (error) {
        console.error('Lỗi khi cập nhật AsyncStorage:', error);
      }
    }
  };
  

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>{`$${item.price}`}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
          {cart.length > 0 ? (
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text style={styles.emptyText}>Giỏ hàng trống !</Text>
          )}
       
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalAmount}>${totalAmount}</Text>
        </View> 
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    justifyContent: 'space-between',
    flex:1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    marginBottom:30,
  },
  itemText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: 50, // Điều chỉnh kích thước ảnh theo ý muốn
    height: 50,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: 'center',
  },
  productCategory: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
    alignSelf: 'flex-end', // Thêm dòng này để phần tử dính sát dưới
    position: 'absolute', // Thêm dòng này để vị trí không ảnh hưởng đến layout chính
    bottom: 0, // Thêm dòng này để phần tử nằm ở phía dưới
    left: 0, // Thêm dòng này để căn trái
    right: 0, // Thêm dòng này để căn phải
    backgroundColor:"white",

  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 10,
    color: '#007BFF',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default Cart;
