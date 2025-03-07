import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const LoginScreen: React.FC = () => {
    const router = useRouter();  // Instancia o router

    const onPressLogin = () => {
        // Ação de login (você pode adicionar lógica aqui)
        // Redireciona para a tela Home
        router.push('/home');  // Navega para a tela Home
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Mental Health</Text>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onPressLogin}  // Chama a função de redirecionamento
            >
                <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        textAlign: 'center',
    },
    btnLogin: {
        backgroundColor: '#007bff',
        width: Math.min(width * 0.8, 350),
        height: Math.min(height * 0.07, 60),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    textLogin: {
        color: '#FFFFFF',
        fontSize: Math.min(width * 0.05, 22),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginScreen;
