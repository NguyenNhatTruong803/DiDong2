import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState({
    selectedProducts: [],
    totalAmount: 0,
    recipientInfo: {},
  });
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    // Fetch order details when the component mounts
    fetchOrderDetail();
  }, []);

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

  const deleteOrder = async () => {
    try {
      // Remove the order details from AsyncStorage
      await AsyncStorage.removeItem('orderDetail');
      setOrderDetail({
        selectedProducts: [],
        totalAmount: 0,
        recipientInfo: {},
      });
      setForceRender((prev) => !prev);
      // Optionally, you may want to perform additional actions like navigating to another screen
      Toast.show({
        type: 'success',
        text1: 'Xóa đơn hàng thành công !',
        visibilityTime: 2000, // Thời gian hiển thị toast (milliseconds)
      });
    } catch (error) {
      console.error('Error deleting order:', error);
    }
    fetchOrderDetail();
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderDate}>{item.orderDate}</Text>
  
      {/* Sử dụng FlatList để hiển thị danh sách sản phẩm */}
      <FlatList
        data={item.products}
        renderItem={({ item: product }) => (
          <View>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>{`$${product.price} x ${product.quantity}`}</Text>
          </View>
        )}
        keyExtractor={(product) => product.id.toString()}
      />
  
      <Text style={styles.totalText}>{`Tổng cộng: $${item.total}`}</Text>
  
      {item.recipientInfo && (
        <View style={styles.recipientInfo}>
          {item.recipientInfo.name && <Text>{`Họ và tên: ${item.recipientInfo.name}`}</Text>}
          {item.recipientInfo.address && <Text>{`Địa chỉ: ${item.recipientInfo.address}`}</Text>}
          {item.recipientInfo.phone && <Text>{`Số điện thoại: ${item.recipientInfo.phone}`}</Text>}
        </View>
      )}
      <TouchableOpacity onPress={deleteOrder} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Xóa đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
  
         
  return (
    <View style={styles.container}>
      {orderDetail && orderDetail.length > 0 ? (
        <View style={styles.orderSummary}>
          <Text style={styles.summaryTitle}>Thông tin đơn hàng</Text>
          <FlatList
            data={orderDetail}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.orderDate}
            extraData={forceRender}
          />
        </View>
      ) : (
        <View style={styles.noOrderContainer}>
          <Text style={styles.noOrderText}>Không có đơn hàng</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  orderSummary: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    bottom: 0,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  orderItem: {
    marginBottom: 16,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
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
  recipientInfo: {
    marginBottom: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noOrderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetail;
