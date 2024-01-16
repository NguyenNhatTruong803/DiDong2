import React, { useState } from 'react';
import Home from './component/Home';
import Checkout from './component/product/Checkout';
import { StyleSheet, View,ScrollView } from 'react-native';
import Cart from './component/product/ProductCart';
import ProductDetail from './component/product/ProductDetail';
import { useFonts } from 'expo-font'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './component/user/LoginScreen';
import SignUpScreen from './component/user/SignUpScreen';
import Profile from './component/Profile';
import { AuthProvider } from './component/services/AuthProvider';
import Toast from 'react-native-toast-message';
import OrderDetail from './component/product/OrderDetail';
export default function App() {
  const Stack = createStackNavigator();
  const [orderDetail, setOrderDetail] = useState({
    selectedProducts: [],
    totalAmount: 0,
    recipientInfo: {},
  });
  const [fontLoaded] = useFonts({
    'Shizuru-Regular': require('./assets/fonts/Shizuru-Regular.ttf'),
    'JosefinSans-ExtraLight': require('./assets/fonts/JosefinSans-ExtraLight.ttf'),
    'JosefinSans-ExtraLightItalic': require('./assets/fonts/JosefinSans-ExtraLightItalic.ttf'),
    'JosefinSans-Italic': require('./assets/fonts/JosefinSans-Italic.ttf'),
    'JosefinSans-Light': require('./assets/fonts/JosefinSans-Light.ttf'),
    'JosefinSans-LightItalic': require('./assets/fonts/JosefinSans-LightItalic.ttf'),
    'JosefinSans-Medium': require('./assets/fonts/JosefinSans-Medium.ttf'),
    'JosefinSans-MediumItalic': require('./assets/fonts/JosefinSans-MediumItalic.ttf'),
    'JosefinSans-Regular': require('./assets/fonts/JosefinSans-Regular.ttf'),
    'JosefinSans-SemiBold': require('./assets/fonts/JosefinSans-SemiBold.ttf'),
    'JosefinSans-SemiBoldItalic': require('./assets/fonts/JosefinSans-SemiBoldItalic.ttf'),
    'JosefinSans-Thin': require('./assets/fonts/JosefinSans-Thin.ttf'),
    'JosefinSans-ThinItalic': require('./assets/fonts/JosefinSans-ThinItalic.ttf'),
    'Kalnia_Expanded-Bold': require('./assets/fonts/Kalnia_Expanded-Bold.ttf'),
    'Kalnia_Expanded-ExtraLight': require('./assets/fonts/Kalnia_Expanded-ExtraLight.ttf'),
    'Kalnia_Expanded-Light': require('./assets/fonts/Kalnia_Expanded-Light.ttf'),
    'Kalnia_Expanded-Medium': require('./assets/fonts/Kalnia_Expanded-Medium.ttf'),
    'Kalnia_Expanded-Regular': require('./assets/fonts/Kalnia_Expanded-Regular.ttf'),
    'Kalnia_Expanded-SemiBold': require('./assets/fonts/Kalnia_Expanded-SemiBold.ttf'),
    'Kalnia_Expanded-Thin': require('./assets/fonts/Kalnia_Expanded-Thin.ttf'),
    'Kalnia_SemiExpanded-Bold': require('./assets/fonts/Kalnia_SemiExpanded-Bold.ttf'),
    'Kalnia_SemiExpanded-ExtraLight': require('./assets/fonts/Kalnia_SemiExpanded-ExtraLight.ttf'),
    'Kalnia_SemiExpanded-Light': require('./assets/fonts/Kalnia_SemiExpanded-Light.ttf'),
    'Kalnia_SemiExpanded-Medium': require('./assets/fonts/Kalnia_SemiExpanded-Medium.ttf'),
    'Kalnia_SemiExpanded-Regular': require('./assets/fonts/Kalnia_SemiExpanded-Regular.ttf'),
    'Kalnia_SemiExpanded-SemiBold': require('./assets/fonts/Kalnia_SemiExpanded-SemiBold.ttf'),
    'Kalnia_SemiExpanded-Thin': require('./assets/fonts/Kalnia_SemiExpanded-Thin.ttf'),
    'Kalnia-Bold': require('./assets/fonts/Kalnia-Bold.ttf'),
    'Kalnia-ExtraLight': require('./assets/fonts/Kalnia-ExtraLight.ttf'),
    'Kalnia-Light': require('./assets/fonts/Kalnia-Light.ttf'),
    'Kalnia-Medium': require('./assets/fonts/Kalnia-Medium.ttf'),
    'Kalnia-Regular': require('./assets/fonts/Kalnia-Regular.ttf'),
    'Kalnia-SemiBold': require('./assets/fonts/Kalnia-SemiBold.ttf'),
    'Kalnia-Thin': require('./assets/fonts/Kalnia-Thin.ttf'),
    'JosefinSans-Bold': require('./assets/fonts/JosefinSans-Bold.ttf'),
    'JosefinSans-BoldItalic': require('./assets/fonts/JosefinSans-BoldItalic.ttf'),
  });

  if (!fontLoaded) {
    return <View />; // Render a loading indicator or placeholder while the font is loading
  }
  
  return (
  <NavigationContainer>
    <AuthProvider>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown:false }}/>
          <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerTitle:"Chi tiết sản phẩm" }}/>
          <Stack.Screen name="Cart" component={Cart} options={{ headerTitle:"Giỏ hàng" }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }}/>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown:false }}/>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Checkout" options={{ title: 'Thanh toán' }}>
            {(props) => <Checkout {...props} setOrderDetail={setOrderDetail} />}
          </Stack.Screen>       
          <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ title: 'Đơn hàng' }} />

        </Stack.Navigator>
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: '#FF6633',
  },
  footer:{
    alignItems: 'center',
    height: '6%',
  },
});
