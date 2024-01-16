import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
  const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Thử lấy thông tin người dùng từ AsyncStorage khi ứng dụng khởi động
    const bootstrapAsync = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Lỗi khi khởi động:', error);
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (userData) => {
    try {
      // Lưu thông tin người dùng vào AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      Toast.show({
        type: 'success',
        text1: 'Đăng nhập thành công',
        visibilityTime: 2000, // Thời gian hiển thị toast (milliseconds)
      });
    } catch (error) {
      console.error('Lỗi khi đăng nhập:', error);
    }
  };

  const logout = async () => {
    try {
      // Xóa thông tin người dùng khỏi AsyncStorage
      await AsyncStorage.removeItem('user');
      setUser(null);
      Toast.show({
        type: 'success',
        text1: 'Đăng xuất thành công',
        visibilityTime: 2000, // Thời gian hiển thị toast (milliseconds)
      });
      navigation.navigate('Home');
      // Nếu muốn chuyển hướng về màn hình Home sau khi đăng xuất
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
