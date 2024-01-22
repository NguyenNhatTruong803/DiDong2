import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import { useAuth } from '../services/AuthProvider';
import Toast from 'react-native-toast-message';

function LoginScreen({ navigation }) {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/users');
          const users = await response.json();
    
          const user = users.find((u) => u.username === username && u.password === password);
    
          if (user) {
            // Đăng nhập thành công, lưu thông tin tài khoản
            login(user);
            Toast.show({
                type: 'success',
                text1: `Đăng nhập thành công !`,
                visibilityTime: 1500, // Thời gian hiển thị toast (milliseconds)
              });
            // Chuyển đến màn hình chính
            navigation.navigate('Home');
          } else {
            Alert.alert('Thông báo', 'Đăng nhập thất bại. Vui lòng kiểm tra lại tên người dùng và mật khẩu.');
          }
        } catch (error) {
          console.error('Lỗi khi thực hiện đăng nhập:', error);
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>
            <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.link}>Chưa có tài khoản? Đăng ký ngay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingLeft: 8,
        width: '100%',
    },
    button: {
        backgroundColor: '#fa8225',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    link: {
        marginTop: 16,
        color: '#e6a16c',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
