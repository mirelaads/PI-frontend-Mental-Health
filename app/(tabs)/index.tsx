import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import TextInputLogin from '@/components/TextInput';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const router = useRouter();

    const onPressLogin = () => {
        router.push('/home');
    };

    const onPressCadastro = () => {
        router.push('/cadastro');
    };

    return (
        <View style={styles.container}>
            <ThemedText type="title" style={styles.title}>MENTAL HEALTH</ThemedText>

            <Image
                source={require('../../assets/images/brain.png')}
                style={styles.reactLogo}
            />

            <Text style={styles.subtitle}>Entrar</Text>
            <TextInputLogin />

            <TouchableOpacity
                style={styles.btnLogin}
                onPress={onPressLogin}
            >
                <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressCadastro}>
                <Text style={styles.textCadastro}>
                    Ainda não possui conta? <Text style={styles.link}>Cadastre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E7EB',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.08,
    },
    title: {
        fontSize: width * 0.065,
        fontWeight: 'bold',
        marginBottom: height * 0.015,
        textAlign: 'center',
    },
    reactLogo: {
        width: width * 0.45,
        height: width * 0.45,
        resizeMode: 'contain',
        marginBottom: height * 0.03,
    },
    subtitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        fontFamily: 'PoppinsRegular',
        marginBottom: height * 0.02,
    },
    btnLogin: {
        backgroundColor: '#007bff',
        width: Math.min(width * 0.8, 320),
        height: Math.min(height * 0.07, 50),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginTop: height * 0.02,
    },
    textLogin: {
        color: '#FFFFFF',
        fontSize: Math.min(width * 0.05, 20),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textCadastro: {
        fontSize: Math.min(width * 0.045, 16),
        color: '#333',
        marginTop: height * 0.015,
        textAlign: 'center',
    },
    link: {
        textDecorationLine: 'underline'
    },
});

export default HomeScreen;
