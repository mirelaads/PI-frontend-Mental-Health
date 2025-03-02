import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TextRegisterHome: React.FC = () => {
    const onPressLogin = () => {
        Alert.alert('Login', 'Você clicou no botão Login!');
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.registerText}>Ainda não possui uma conta? </Text>
                <TouchableOpacity onPress={onPressLogin}>
                    <Text style={styles.register}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerText: {
        fontSize: width * 0.04,
        color: '#000',
    },
    register: {
        fontSize: width * 0.04,
        textDecorationLine: 'underline',
    },
});

export default TextRegisterHome;