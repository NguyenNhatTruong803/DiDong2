import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Checkout = ({ navigation, route }) => {
  const { selectedProducts, totalAmount } = route.params || {
    selectedProducts: [],
    totalAmount: 0,
  };
  const [recipientInfo, setRecipientInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const fetchOrderDetail = async () => {
    try {
      // Retrieve the order details from AsyncStorage
      const storedOrderDetail = await AsyncStorage.getItem('orderDetail');
  
      if (storedOrderDetail) {
        // Parse the JSON string to get the order details
        const parsedOrderDetail = JSON.parse(storedOrderDetail);
  
        // Update the state with the fetched order details
        setOrderDetail(parsedOrderDetail);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  

  useEffect(() => {
    // Load order details when the component mounts
    fetchOrderDetail();
  }, []);

  // Check if the cart array is present
  if (!selectedProducts || !selectedProducts.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Xác nhận thanh toán</Text>
        <Text style={styles.errorText}>Không có sản phẩm nào để thanh toán.</Text>
      </View>
    );
  }
  const handlePayment = async () => {
    // Kiểm tra xem người dùng đã nhập đầy đủ thông tin người nhận chưa
    if (!recipientInfo.name || !recipientInfo.address || !recipientInfo.phone) {
      alert('Vui lòng nhập đầy đủ thông tin người nhận.');
      return;
    }

    await clearCart(selectedProducts);

    // Lưu sản phẩm và thông tin người nhận vào OrderDetail
    saveOrderDetail(selectedProducts, totalAmount, recipientInfo);

    // Load lại dữ liệu ngay sau khi đặt hàng
    fetchOrderDetail();

    // Thực hiện các bước thanh toán ở đây, có thể sử dụng thông tin người nhận từ state recipientInfo
    navigation.navigate('Home');
    Toast.show({
      type: 'success',
      text1: `Thanh toán thành công !`,
      visibilityTime: 2000, // Thời gian hiển thị toast (milliseconds)
    });
  };

  const clearCart = async (productsToClear) => {
    try {
      // Retrieve the cart items from AsyncStorage
      const storedCart = await AsyncStorage.getItem('cart');
  
      // Check if the cart has data
      if (storedCart) {
        // Parse the JSON string to an array of cart items
        const cartItems = JSON.parse(storedCart);
  
        // Check if productsToClear is provided and is an array
        if (Array.isArray(productsToClear) && productsToClear.length > 0) {
          // Filter out the products to clear from the cartItems
          const updatedCart = cartItems.filter(item => !productsToClear.some(productToClear => productToClear.id === item.id));
  
          // Save the updated cart back to AsyncStorage
          await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  
          console.log('Cart has been updated:', updatedCart);
        }
      }
    } catch (error) {
      console.error('Error updating the cart:', error);
    }
  };
  
  // Function to save order detail
  const saveOrderDetail = async (products, total, recipientInfo) => {
    try {
      // Lấy danh sách đơn hàng chi tiết từ AsyncStorage
      const storedOrderDetail = await AsyncStorage.getItem('orderDetail');
  
      // Kiểm tra xem đã có đơn hàng chi tiết chưa
      const orderDetail = storedOrderDetail ? JSON.parse(storedOrderDetail) : [];
  
      // Tạo thông tin đơn hàng mới
      const newOrder = {
        products,
        total,
        recipientInfo,
        orderDate: new Date().toISOString(), // Thêm thông tin ngày đặt hàng
      };
  
      // Thêm đơn hàng mới vào danh sách đơn hàng chi tiết
      orderDetail.push(newOrder);
  
      // Lưu lại danh sách đơn hàng chi tiết mới vào AsyncStorage
      await AsyncStorage.setItem('orderDetail', JSON.stringify(orderDetail));
  
      console.log('Đơn hàng đã được lưu:', newOrder);
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng chi tiết:', error);
    }
  };
  
  
  

  return (
    <View style={styles.container}><ScrollView>
      <Text style={styles.title}>Xác nhận thanh toán</Text>
      <View style={styles.orderSummary}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        {selectedProducts.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>{`$${item.price} x ${item.quantity}`}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.totalText}>Tổng cộng: ${totalAmount}</Text>
      </View>
      
      <View style={styles.recipientInfo}>
        <Text style={styles.recipientTitle}>Thông tin người nhận</Text>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={recipientInfo.name}
          onChangeText={(text) => setRecipientInfo({ ...recipientInfo, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ"
          value={recipientInfo.address}
          onChangeText={(text) => setRecipientInfo({ ...recipientInfo, address: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={recipientInfo.phone}
          onChangeText={(text) => setRecipientInfo({ ...recipientInfo, phone: text })}
        />
      </View><TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
        <Text style={styles.paymentButtonText}>Thanh toán</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderSummary: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  paymentButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  recipientInfo: {
    marginBottom: 16,
  },
  recipientTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  
});

export default Checkout;
