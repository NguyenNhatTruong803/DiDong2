import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

function Header() {
    const navigation = useNavigation();

    const handlePress = () => {
        console.log('Link clicked!');
    };
    const Cart = () => {
        navigation.navigate('Cart');
      };
    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)}>
        <Text style={styles.categoryItem}>{item}</Text>
        </TouchableOpacity>
    );
    return (
        <View>
            <View style={styles.header1}>
                <Icon name="map" size={20} color="#FFFFFF" /><Text> </Text>
                <Text style={styles.colorWhite}> Địa điểm của bạn là: Hồ Chí Minh </Text>

                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Text style={styles.linkText}>Đổi</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.header2}>
                <View style={styles.icon}>
                    <Icon name="navicon" size={20} color="#000000" />
                    <Text style={styles.header21}>TGSTORE </Text>
                </View>
                <View style={styles.header22}>
                        <View style={styles.header222}>
                            <Text style={styles.linkText1}>Đăng nhập</Text><Text> </Text>
                            <Icon name="user-o" size={20} color="#000000" />
                            <Text> </Text>
                            <TouchableOpacity onPress={Cart}>
                                <Icon name="shopping-cart" size={20} color="#000000" />
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    
    header1: {
        width: '100%',
        height: '25%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 17, 0.4)',
        marginTop: 28,
        paddingLeft: 8,
    },
    linkText: {
        textDecorationLine: 'underline',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 8,
        color: '#FFFFFF',
        fontSize:16,
    },
    linkText1: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textDecorationLine: 'underline',
        paddingRight: 8,
        color: '#000',
        fontSize:16,
    },
    header2: {
        marginTop: 6,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    header21:{
        fontFamily:'Kalnia_SemiExpanded-Light',
        fontSize:20,
    },
    header22: {
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header222: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 1,
    },
    icon: {
        paddingLeft: 8,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorWhite: {
        color: '#FFFFFF',
    },
    dropdownMenu: {
        position: 'absolute',
        top: 40,
        right: 8,
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 5,
        elevation: 5,
        zIndex: 1,
      },
    
      categoryItem: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 8,
      },
});

export default Header;
