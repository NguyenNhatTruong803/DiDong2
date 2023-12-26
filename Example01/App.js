import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,ScrollView } from 'react-native';
import Header from './component/Header';
import Content from './component/Content';
import Footer from './component/Footer';
import Cart from './component/product/ProductCart';
import ProductDetail from './component/product/ProductDetail';
import { useFonts } from 'expo-font'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
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
  const HomeScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
  
      <ScrollView style={{ flex: 1, width: '100%' }}>
        <Content />
      </ScrollView>
  
      <View style={styles.footer}>
        <Footer />
      </View>
  
      <StatusBar style="auto" />
    </View>
  );
  

  return (
  
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown:false }}/>
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="Cart" component={Cart}/>
      </Stack.Navigator>
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
    height: '12%',
    alignItems: 'center',
    backgroundColor: '#FF6633',
  },
  footer:{
    alignItems: 'center',
    height: '6%',
  },
});
