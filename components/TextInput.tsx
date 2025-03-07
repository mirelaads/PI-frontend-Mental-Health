import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const TextInputLogin = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok && data.accessToken && data.refreshToken) {
                await AsyncStorage.setItem('accessToken', data.accessToken);
                await AsyncStorage.setItem('refreshToken', data.refreshToken);
                await AsyncStorage.setItem('userEmail', email);

                router.push('../(tabs)/home');
            } else {
                Alert.alert('Erro', data.message || 'Erro ao realizar o login');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar realizar o login. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>

                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/at-sign.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        placeholder="Digite seu email"
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#888"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/images/lock.png')}
                        style={styles.icon}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setSenha}
                        value={senha}
                        placeholder="Digite sua senha"
                        secureTextEntry
                        placeholderTextColor="#888"
                    />
                </View>

                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.textLogin}>Login</Text>
                    )}
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 5,
    },
    input: {
        flex: 1,
        height: 45,
        fontSize: 16,
        color: '#333',
        paddingLeft: 5,
        paddingBottom: 3,
        fontFamily: 'PoppinsRegular',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
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
        marginTop: height * 0.015,
    },
    textLogin: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TextInputLogin;
