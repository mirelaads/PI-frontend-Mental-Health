import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    return (
        <View style={styles.container}>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/brain.png')}
                    style={styles.profileImage}
                />
            </View>

            <Text style={styles.title}>Olá, João</Text>

            <View style={styles.motivationalBox}>
                <Text style={styles.motivationalText}>Você está mais perto de alcançar seus objetivos!</Text>
            </View>

            <View style={styles.consultationBox}>
                <Text style={styles.consultationText}>Próxima consulta: 20/03/2025</Text>
                <FontAwesome name="check-circle" size={24} color="white" style={styles.icon} />
            </View>

            <TouchableOpacity style={styles.btnAgendar}>
                <Text style={styles.btnText}>Agendar Consulta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4E7EB',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginBottom: height * 0.05,
        borderWidth: 4,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        marginBottom: height * 0.04,
        textAlign: 'center',
    },
    motivationalBox: {
        width: '100%',
        backgroundColor: '#2994E2',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        marginBottom: height * 0.05,
        alignItems: 'center',
    },
    motivationalText: {
        fontSize: width * 0.04,
        color: '#fff',
        fontFamily: 'PoppinsBold'
    },
    consultationBox: {
        width: '100%',
        backgroundColor: '#2994E2',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        marginBottom: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    consultationText: {
        fontSize: width * 0.04,
        color: '#fff',
        fontFamily: 'PoppinsBold'
    },
    icon: {
        marginLeft: width * 0.02,
    },
    btnAgendar: {
        backgroundColor: '#007bff',
        width: Math.min(width * 0.8, 350),
        height: Math.min(height * 0.07, 60),
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        marginTop: height * 0.05,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: Math.min(width * 0.05, 22),
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;
