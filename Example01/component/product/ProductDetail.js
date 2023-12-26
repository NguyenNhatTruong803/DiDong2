// ProductDetail.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {
  const { product, handleAddToCart } = route.params;
  const navigation = useNavigation();

  const handleAddToCartPress = () => {
    handleAddToCart(product);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productCategory}>{product.category}</Text>
      <Text style={styles.productPrice}>{`$${product.price}`}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity onPress={handleAddToCartPress} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10,
    zIndex: 1,
  },
  backButton: {
    fontSize: 30,
    marginTop:20,
    color: 'red',
  },
  image: {
    width: '100%',
    height: 510,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  addToCartButton:{
    backgroundColor: '#FF6633',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ProductDetail;
