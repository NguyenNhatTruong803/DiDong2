import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Iconnn from 'react-native-vector-icons/AntDesign';

const Footer = () => {
  const navigation = useNavigation();
  const [reloadApp, setReloadApp] = useState(false);
  

  useEffect(() => {
    if (reloadApp) {
      // Perform any actions you need before "reloading" the app
      // For example, you can reset some state or fetch fresh data

      // After that, setReloadApp(false) to reset the "reload" state
      setReloadApp(false);
    }
  }, [reloadApp]);

  const handleHomePress = () => {
    // Set the reloadApp state to true when the "Trang Chủ" button is pressed
    setReloadApp(true);
  };

  return (
    <View style={styles.footer}>
      
        <TouchableOpacity style={styles.footer1} onPress={handleHomePress}>
          <Icon name="home" size={20} color="#000000" />
          <Text>Trang Chủ</Text>
      </TouchableOpacity>
      
      <View style={styles.footer1}>
        <Iconnn name="mail" size={20} color="#000000" />
        <Text>Mail</Text>
      </View>
      <View style={styles.footer1}>
        <Icon name="video" size={20} color="#000000" />
        <Text>Live</Text>
      </View>
      <View style={styles.footer1}>
        <Icon name="bell" size={20} color="#000000" />
        <Text>Thông Báo</Text>
      </View>
      <View style={styles.footer1}>
        <Icon name="grid" size={20} color="#000000" />
        <Text>Tôi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 'auto',
  },
  footer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-center',
  },
});

export default Footer;
