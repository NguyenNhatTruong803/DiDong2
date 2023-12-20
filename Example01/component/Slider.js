import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Slider = () => {
  const slides = [
    { id: 1, imageUrl: require('../assets/slider/slider_1.jpg'), text: 'Slide 1' },
    { id: 2, imageUrl: require('../assets/slider/slider_2.jpg'), text: 'Slide 2' },
    // Add more slides here with corresponding image paths
  ];

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.imageUrl} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.sliderContainer}>
      <Carousel
        data={slides}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width - 20} // Adjusted width to leave some margin
        sliderHeight={136} // Adjusted height
        layout={'default'}
        loop
        autoplay
        autoplayInterval={5000} // Set the interval in milliseconds (e.g., 3000 for 3 seconds)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    height: 136,
    backgroundColor: '#e0e0e0',
    marginTop: 2,
  },
  slide: {
    width: Dimensions.get('window').width - 20, // Adjusted width to match the screen width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Slider;
