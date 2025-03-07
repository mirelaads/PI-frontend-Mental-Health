import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
    const userName = AsyncStorage.getItem('userName'); // Aqui eu pego o nome que eu salve no storage
    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        try {

        } catch (error) {

        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="user-circle" size={50} color="white" />
                <Text style={styles.userName}>{userName || "Carregando..."}</Text>
            </View>

            <Text style={styles.sectionTitle}>Agendamentos</Text>

            <ScrollView style={styles.agendaContainer}>
                {appointments.length > 0 ? (
                    appointments.map((appointment, index) => (
                        <Card
                            key={index}
                            name={appointment.name}
                            specialty={appointment.specialty}
                        />
                    ))
                ) : (
                    <Text style={styles.loadingText}>Carregando agendamentos...</Text>
                )}
            </ScrollView>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>

            <Text style={styles.warningText}>
                Não é permitido agendamentos múltiplos para a mesma especialidade
            </Text>

        </View>
    );
}


const Card = ({ name, specialty }) => {
    return (
        <View style={styles.card}>
            <FontAwesome name="user-circle" size={40} color="gray" />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.cardTitle}>{name}</Text>
                <Text style={styles.cardSubtitle}>{specialty} 🧠</Text>
                <Text style={styles.cardSubtitle}>
                    Agenda <MaterialIcons name="event" size={16} color="black" />
                </Text>
            </View>
            <FontAwesome name="info-circle" size={20} color="gray" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E5E5E5",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#0047AB",
        width: "100%",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    userName: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
    },
    sectionTitle: {
        color: "gray",
        fontSize: 16,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        width: "90%",
        textAlign: "center",
    },
    agendaContainer: {
        width: "90%",
    },
    card: {
        backgroundColor: "#D0D9FF",
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444",
    },
    cardSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    button: {
        backgroundColor: "#007AFF",
        width: "80%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 15,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    warningText: {
        color: "gray",
        fontSize: 12,
        marginBottom: 10,
        textAlign: "center",
    },
    loadingText: {
        color: "gray",
        fontSize: 14,
        textAlign: "center",
        marginVertical: 20,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingVertical: 15,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "gray",
    },
});
