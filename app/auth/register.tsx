import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícone de seta de voltar
import { useNavigation } from '@react-navigation/native'; // Hook de navegação

const { width, height } = Dimensions.get('window');

const CadastroScreen: React.FC = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation(); // Usando o hook de navegação

    const handleCadastro = () => {
        // Validações simples
        if (!nome || !sobrenome || !email || !telefone || !endereco || !senha) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Email inválido');
            return;
        }

        const telefoneRegex = /^[0-9]{10,11}$/;
        if (!telefoneRegex.test(telefone)) {
            Alert.alert('Erro', 'Telefone inválido');
            return;
        }

        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#007bff" />
            </TouchableOpacity>

            <Text style={styles.title}>Cadastre-se</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.input}
                placeholder="Sobrenome"
                value={sobrenome}
                onChangeText={setSobrenome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Endereço"
                value={endereco}
                onChangeText={setEndereco}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Confirmar Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: height * 0.05,
        left: 20,
        padding: 10,
        zIndex: 1,
    },
    title: {
        fontSize: 25,
        marginBottom: height * 0.05,
        color: '#000',
        fontFamily: 'PoppinsBold'
    },
    input: {
        width: '100%',
        maxWidth: 400,
        height: 45,
        borderColor: '#000',
        borderBottomWidth: 1,
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        width: '100%',
        maxWidth: 400,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CadastroScreen;
