import { StyleSheet, Image, Platform, Text, View } from 'react-native';

export default function TabFourScreen() {
    return (
        <View style={styles.container}>
            <Text>Perfil</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
