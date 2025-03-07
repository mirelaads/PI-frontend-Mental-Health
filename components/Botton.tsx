import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const BotaoLogin: React.FC = () => {
    const onPressLogin = () => {
        Alert.alert('Login', 'Você clicou no botão Login!');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onPressLogin}
            >
                <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginTop: height * 0.02,
    },
    btnLogin: {
        backgroundColor: '#007bff',
        width: Math.min(width * 0.8, 300),
        height: Math.min(height * 0.07, 50),
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    textLogin: {
        color: '#FFFFFF',
        fontSize: Math.min(width * 0.05, 18),
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Arial' : 'PoppinsBold',
    },
});

export default BotaoLogin;
