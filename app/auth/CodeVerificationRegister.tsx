import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const CodeVerificationRegister: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email, token } = route.params || {}; // Desestruturando os parâmetros
    const [code, setCode] = useState('');

    useEffect(() => {
        console.log('Parâmetros recebidos:', { email, token });  // Verificando os parâmetros
        if (!email || !token) {
            Alert.alert('Erro', 'Parâmetros de email ou token não encontrados');
        }
    }, [email, token]);

    const handleSubmit = async () => {
        if (!code) {
            Alert.alert('Erro', 'Por favor, insira o código de verificação');
            return;
        }

        if (!email || !token) {
            Alert.alert('Erro', 'Email ou token ausente');
            return;
        }

        try {
            console.log('Enviando dados para a API:', { email, code });  // Log antes de enviar os dados

            const response = await fetch('http://192.168.1.84:3000/auth/validate-signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token: code }), // Envia o token como o código inserido
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Cadastro validado com sucesso');
                navigation.navigate('NextScreen'); // Substitua 'NextScreen' pela próxima tela
            } else {
                Alert.alert('Erro', data.message || 'Erro ao verificar código');
            }
        } catch (error) {
            console.error('Erro ao verificar código:', error);
            Alert.alert('Erro', 'Erro ao verificar código');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Código de Verificação</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o código"
                value={code}
                onChangeText={setCode}
                keyboardType="default"
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Verificar Código</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        width: '100%',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CodeVerificationRegister;
