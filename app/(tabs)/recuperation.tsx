// TabTwoScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RecuperationCount from '../../components/RecuperationCount';


export default function TabTwoScreen() {
  return (
      <View style={styles.container}>
        <RecuperationCount />
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
