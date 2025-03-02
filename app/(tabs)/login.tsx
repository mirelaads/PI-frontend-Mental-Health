import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import TextInputLogin from '@/components/TextInput';
import { ThemedText } from '@/components/ThemedText';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Título */}
            <ThemedText type="title" style={styles.title}>MENTAL HEALTH</ThemedText>

            {/* Imagem */}
            <Image
                source={require('../../assets/images/brain.png')}
                style={styles.reactLogo}
            />

            {/* Formulário, Botão e Registro */}
            <Text style={styles.subtitle}>Entrar</Text>
            <TextInputLogin />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E7EB',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        textAlign: 'center',
    },
    reactLogo: {
        width: width * 0.5,
        height: width * 0.5,
        resizeMode: 'contain',
        marginBottom: height * 0.05,
    },
    subtitle: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        fontFamily: 'PoppinsRegular',
        marginBottom: height * 0.02,
    },
});
