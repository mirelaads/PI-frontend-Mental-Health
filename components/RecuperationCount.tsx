import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Para o ícone de check

const PasswordRecovery = () => {
    const [step, setStep] = useState(1); // Passo 1: Email | Passo 2: Código
    const [email, setEmail] = useState('');
    const [code, setCode] = useState(Array(6).fill(''));
    const [message, setMessage] = useState(
        'Informe abaixo o seu e-mail de login e em seguida acesse o e-mail para prosseguir com o passo a passo de recuperação de acesso.'
    );
    const [isCodeVerified, setIsCodeVerified] = useState(false);  // Novo estado

    // Criamos referências para os campos do código
    const codeInputsRef = useRef([]);

    // Função para enviar o e-mail
    const handleSendLink = () => {
        if (email.trim() === '') {
            setMessage('Por favor, insira um e-mail válido.');
        } else {
            setMessage('Enviamos um código de verificação para o seu e-mail.');
            setStep(2);  // Alterar para a etapa 2
        }
    };

    // Atualizar código de recuperação e mover o foco automaticamente
    const handleCodeChange = (value, index) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Mover o foco para o próximo input, se houver
        if (value && index < 5) {
            codeInputsRef.current[index + 1].focus();
        }
    };

    // Função para verificar o código
    const handleVerifyCode = () => {
        // Simula a verificação do código (pode adicionar lógica real aqui)
        setIsCodeVerified(true);
    };

    // Função para voltar para o estado anterior (etapa anterior)
    const handleGoBack = () => {
        setStep(1);  // Retorna para o passo 1
        setEmail(''); // Limpa o campo de e-mail
        setCode(Array(6).fill('')); // Limpa o código
        setIsCodeVerified(false); // Reseta a verificação do código
        setMessage('Informe abaixo o seu e-mail de login e em seguida acesse o e-mail para prosseguir com o passo a passo de recuperação de acesso.');
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho com a seta azul */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back" size={35} color="#007bff" />
                </TouchableOpacity>
            </View>

            {/* Caixa Amarela com Mensagem, somente exibe se não for verificado */}
            {!isCodeVerified && (
                <View style={styles.yellowRectangle}>
                    <Text style={styles.text}>{message}</Text>
                </View>
            )}

            {/* Etapa 1: Input de E-mail */}
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

            {/* Etapa 2: Digitação do Código de Verificação */}
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

                    {/* Link para reenviar código com estilo flex-end */}
                    <View style={styles.resendLinkContainer}>
                        <TouchableOpacity>
                            <Text style={styles.resendLink}>Reenviar código</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Botão para enviar código */}
                    <TouchableOpacity style={styles.buttonCentered} onPress={handleVerifyCode}>
                        <Text style={styles.buttonText}>Enviar</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Label de código verificado com sucesso */}
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
        marginTop: -150,  // Maior espaço no topo
        marginBottom: 40,
        width: '100%',
        justifyContent: 'flex-start', // Alinha a seta à esquerda
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
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 15,
    },
    codeInput: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: '#007bff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff',
        marginRight: 12
    },
    resendLinkContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Flex-end para alinhar o botão à direita
        marginBottom: 50,
        marginLeft: -35
    },
    resendLink: {
        fontSize: 16,
        fontFamily: 'PoppinsRegular',
    },
    buttonCentered: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
        alignSelf: 'center',
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
        textAlign: 'center'
    },
});

export default PasswordRecovery;
