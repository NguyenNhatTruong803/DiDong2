import React,{useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,ScrollView } from 'react-native';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

export default function App() {
const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Header />
    </View>

    <ScrollView style={{ flex: 1, width: '100%' }}>
    <Content selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </ScrollView>

    <View style={styles.footer}>
    <Footer setSelectedCategory={setSelectedCategory} />
    </View>

    <StatusBar style="auto" />
  </View>
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
    height: 85,
    alignItems: 'center',
    backgroundColor: '#FF6633',
  },
  footer:{
    alignItems: 'center',
    height: '6%',
  },
});
