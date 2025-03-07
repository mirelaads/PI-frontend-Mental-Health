import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PasswordRecovery = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(
        'Informe abaixo o seu e-mail de login e em seguida acesse o e-mail para prosseguir com o passo a passo de recuperação de acesso.'
    );
    const [isCodeVerified, setIsCodeVerified] = useState(false);
    const [code, setCode] = useState(Array(6).fill(''));
    const codeInputsRef = useRef([]);

    const handleSendLink = () => {
        if (email.trim() === '') {
            setMessage('Por favor, insira um e-mail válido.');
        } else {
            setMessage('Enviamos um código de verificação para o seu e-mail.');
            setStep(2);
        }
    };

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
    };

    const handleGoBack = () => {
        setStep(1);
        setEmail('');
        setCode(Array(6).fill(''));
        setIsCodeVerified(false);
        setMessage('Informe abaixo o seu e-mail de login e em seguida acesse o e-mail para prosseguir com o passo a passo de recuperação de acesso.');
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back" size={35} color="#007bff" />
                </TouchableOpacity>
            </View>

            {!isCodeVerified && (
                <View style={styles.yellowRectangle}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            )}

            {step === 1 && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSendLink}>
                        <Text style={styles.buttonText}>Enviar link de redefinição</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 2 && !isCodeVerified && (
                <>
                    <View style={styles.codeContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(input) => (codeInputsRef.current[index] = input)}
                                style={styles.codeInput}
                                keyboardType="numeric"
                                maxLength={1}
                                value={digit}
                                onChangeText={(value) => handleCodeChange(value, index)}
                            />
                        ))}
                    </View>

                    <View style={styles.resendLinkContainer}>
                        <TouchableOpacity>
                            <Text style={styles.resendLink}>Reenviar código</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.buttonCentered} onPress={handleVerifyCode}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </>
            )}

            {isCodeVerified && (
                <View style={styles.successLabel}>
                    <Text style={styles.successText}>Código verificado com sucesso</Text>
                    <MaterialIcons name="check-circle" size={20} color="white" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -150,
        marginBottom: 40,
        width: '100%',
        justifyContent: 'flex-start',
    },
    yellowRectangle: {
        backgroundColor: '#FCF172',
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 80,
    },
    text: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
        color: '#000',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#666',
        fontSize: 16,
        paddingVertical: 8,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#FFF',
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
        width: 276,
        height: 102,
    },
    successText: {
        color: '#FFF',
        marginLeft: 10,
        fontSize: 16,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    codeInput: {
        width: 40,
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#007bff',
        fontSize: 18,
        textAlign: 'center',
    },
    resendLinkContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    resendLink: {
        color: '#007bff',
        fontSize: 14,
    },
    buttonCentered: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
});

export default PasswordRecovery;