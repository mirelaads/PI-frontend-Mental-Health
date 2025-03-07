import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const requestPermission = async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
            } else {
                console.log('Permissão concedida');
            }
        };

        requestPermission();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('userEmail');

            if (!storedEmail) {
                Alert.alert('Aviso', 'Você precisa estar logado para acessar essa página.');
                setLoading(false);
                return;
            }

            const token = await AsyncStorage.getItem('accessToken');

            if (!token) {
                Alert.alert('Erro', 'Token não fornecido. Faça login novamente.');
                setLoading(false);
                return;
            }

            const response = await fetch(`http://localhost:3000/users/email/${storedEmail}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            await AsyncStorage.setItem('userName', data.nome);

            if (!response.ok) {
                Alert.alert('Erro', data.message || 'Erro ao carregar os dados do usuário');
            } else {
                setUser(data);
                setUserId(data.id);
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar carregar os dados do usuário.');
        } finally {
            setLoading(false);
        }
    };

    const handleImagePick = async () => {
        console.log('Abrindo a galeria...');
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.log('Permissão negada');
            Alert.alert('Permissão necessária', 'Você precisa conceder acesso à galeria para selecionar uma imagem.');
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            console.log('Resultado da seleção da imagem:', result);

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
                console.log('Imagem selecionada:', result.assets[0].uri);
            }
        } catch (error) {
            console.log('Erro ao abrir a galeria:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir a galeria.');
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage || !userId) {
            Alert.alert('Erro', 'Por favor, selecione uma imagem para enviar.');
            return;
        }

        const fileExtension = selectedImage.split('.').pop();  // Captura a extensão do arquivo
        const mimeType = `image/${fileExtension}`;

        try {
            const formData = new FormData();
            formData.append('avatar', {
                uri: selectedImage,
                type: mimeType,  // Tipo correto de acordo com a extensão
                name: `avatar_${userId}.${fileExtension}`,
            });

            const response = await fetch(`http://localhost:3000/users/${userId}/avatar`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Sucesso', 'Imagem alterada com sucesso!');
                fetchUserData();  // Atualiza os dados do usuário após o upload da imagem
            } else {
                Alert.alert('Erro', data.message || 'Erro ao alterar a imagem.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer o upload da imagem.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={{ color: '#007bff', marginTop: 10 }}>Carregando dados do usuário...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={user?.avatar ? { uri: user.avatar } : require('../../assets/images/brain.png')}
                    style={styles.profileImage}
                />
            </View>

            <TouchableOpacity onPress={handleImagePick}>
                <Text style={styles.btnAlterarImagem}>Alterar Imagem</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Olá, {user?.nome || 'Usuário'}</Text>

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

            {selectedImage && (
                <TouchableOpacity style={styles.btnUpload} onPress={handleImageUpload}>
                    <Text style={styles.btnText}>Enviar Imagem</Text>
                </TouchableOpacity>
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
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
    },
    consultationBox: {
        width: '100%',
        backgroundColor: '#2994E2',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    consultationText: {
        fontSize: width * 0.04,
        color: '#fff',
    },
    icon: {
        marginLeft: width * 0.05,
    },
    btnAgendar: {
        backgroundColor: '#007bff',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 10,
        marginBottom: height * 0.03,
    },
    btnUpload: {
        backgroundColor: '#2994E2',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 10,
        marginBottom: height * 0.03,
    },
    btnText: {
        fontSize: width * 0.04,
        color: '#fff',
        textAlign: 'center',
    },
    btnAlterarImagem: {
        fontSize: width * 0.04,
        marginTop: height * 0.02,
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: '#007bff',
    },
});

export default HomeScreen;
