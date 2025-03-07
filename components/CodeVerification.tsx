import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CodeVerification = ({ onVerifyCode, onResendCode }) => {
    const { width } = useWindowDimensions();
    const [code, setCode] = useState(Array(6).fill(''));
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const codeInputsRef = useRef([]);

    const handleCodeChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            codeInputsRef.current[index + 1].focus();
        }
    };

    const handleVerifyCode = () => {
        setIsCodeVerified(true);
        onVerifyCode();
    };

    return (
        <View style={styles.container}>
            {/* Digitação do Código de Verificação */}
            <View style={styles.codeContainer}>
                {code.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(input) => (codeInputsRef.current[index] = input)}
                        style={[styles.codeInput, { width: width * 0.12 }]}
                        keyboardType="numeric"
                        maxLength={1}
                        value={digit}
                        onChangeText={(value) => handleCodeChange(value, index)}
                    />
                ))}
            </View>

            <View style={styles.resendLinkContainer}>
                <TouchableOpacity onPress={onResendCode}>
                    <Text style={styles.resendLink}>Reenviar código</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.buttonCentered, { width: width * 0.8 }]} onPress={handleVerifyCode}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            {isCodeVerified && (
                <View style={[styles.successLabel, { width: width * 0.8 }]}>
                    <Text style={styles.successText}>Código verificado com sucesso</Text>
                    <MaterialIcons name="check-circle" size={20} color="white" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '5%',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 15,
    },
    codeInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#007bff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    resendLinkContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 50,
    },
    resendLink: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
    },
    buttonCentered: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    successLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
    },
    successText: {
        color: '#FFF',
        marginRight: 10,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
    },
});

export default CodeVerification;