// Profile.js
import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import { useAuth } from './services/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  const { user, logout } = useAuth();
  const goToOrderDetail = () => {
    navigation.navigate('OrderDetail');
  };

  return (
    <View style={styles.container}>
    {user ? (
      <View>
        <Text style={styles.title}>Xin chào, {user.name.firstname}!</Text>
        <Button title="Xem Đơn Hàng" onPress={goToOrderDetail} />
        <Button title="Đăng xuất" onPress={logout} />
      </View>
    ) : (
      <Text style={styles.title}>Bạn chưa đăng nhập.</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Profile;
