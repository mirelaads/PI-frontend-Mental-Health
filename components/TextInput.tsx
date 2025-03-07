import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const TextInputLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
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


                    <View style={styles.spaceBetweenInputs} />


                    <View style={styles.inputContainer}>
                        <Image
                            source={require('../assets/images/lock.png')}
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Digite sua senha"
                            secureTextEntry
                            placeholderTextColor="#888"
                        />
                    </View>


                    <View style={styles.recuperationContainer}>
                        <TouchableOpacity>
                            <Text style={styles.recuperation}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.btnLogin}>
                            <Text style={styles.textLogin}>Login</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>Ainda não possui uma conta?</Text>
                        <TouchableOpacity>
                            <Text style={styles.register}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    container: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
        paddingLeft: 5,
        paddingBottom: 2,
        fontFamily: 'PoppinsRegular',
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    spaceBetweenInputs: {
        height: 15, // Aumentando o espaço entre os campos
    },
    recuperationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: height * 0.02, // Ajustando a posição do "Esqueceu a senha?"
    },
    recuperation: {
        fontSize: width * 0.04,
        fontFamily: 'PoppinsRegular',
    },
    buttonContainer: {
        marginTop: height * 0.02, // Ajustando a distância do botão de login
    },
    btnLogin: {
        backgroundColor: '#007bff',
        width: Math.min(width * 0.8, 300), // Máximo de 300px para telas maiores
        height: Math.min(height * 0.07, 50), // Ajuste dinâmico com limite
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
        fontSize: Math.min(width * 0.05, 18), // Ajuste com limite máximo
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerContainer: {
        marginTop: height * 0.015, // Ajustando a distância entre o botão e o texto de cadastro
        flexDirection: 'row',
        justifyContent: 'center',
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

export default TextInputLogin;
