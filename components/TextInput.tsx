import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const TextInputLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

                <View />

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
});

export default TextInputLogin;
