import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Iconnn from 'react-native-vector-icons/AntDesign';

const Footer = ({ setSelectedCategory }) => {
  const navigation = useNavigation();
  const [reloadApp, setReloadApp] = useState(false);
  useEffect(() => {
    if (reloadApp) {
      setReloadApp(false);
    }
  }, [reloadApp]);

  const handleHomePress = () => {
    setReloadApp(true);
    setSelectedCategory(null);
    navigation.navigate('Home');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
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
      <TouchableOpacity style={styles.footer1} onPress={handleProfilePress}>
        <Icon name="user" size={20} color="#000000" />
        <Text>Tôi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 'auto',
    backgroundColor:'white',
    paddingTop:2,
  },
  footer1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-center',
  },
});

export default Footer;
