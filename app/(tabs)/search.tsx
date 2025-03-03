import { StyleSheet, Image, Platform, Text, View } from 'react-native';

export default function TabThreeScreen() {
    return (
        <View style={styles.container}>
            <Text>Busca</Text>
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
