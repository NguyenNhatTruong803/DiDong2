import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const [cart, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigation = useNavigation();

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
  const selectedProducts = cart.filter((item) =>
        selectedItems.includes(item.id)
      );

    // Tính tổng tiền chỉ cho các sản phẩm được chọn
    const totalAmount = selectedProducts.reduce(
      (total, selectedItem) =>
        total + selectedItem.price * selectedItem.quantity,
      0
    );
  const handleCheckout = () => {
    navigation.navigate('Checkout', { selectedProducts, totalAmount });
  };

  const handleCheckboxToggle = (itemId) => {
    // Toggle the selected status of the item
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <CheckBox
        checked={selectedItems.includes(item.id)}
        onPress={() => handleCheckboxToggle(item.id)}
      />
      <View style={styles.productInfo}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{item.title}</Text>
          <Text style={styles.productPrice}>{`$${item.price}`}</Text>
        </View>
      </View>
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
          <View>
            <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    marginBottom: 30,
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
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 4,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
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
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    paddingTop: 8,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
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
  checkoutButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Cart;
