import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const TextInputLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
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

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: -50
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
        height: 15,
    },
    recuperationContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: height * 0.02,
    },
    recuperation: {
        fontSize: width * 0.04,
        fontFamily: 'PoppinsRegular',
    },
});

export default TextInputLogin;
