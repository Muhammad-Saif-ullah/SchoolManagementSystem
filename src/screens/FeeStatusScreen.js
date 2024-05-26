import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const FeeStatusScreen = ({ route, navigation }) => {
  const handlePress = screen => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          title="View Student Fee Status"
          onPress={() => handlePress('ViewFeeStatusScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Add New Fee Status"
          onPress={() => handlePress('AddNewFeeStatusScreen')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  button: {
    borderRadius: 15,
  },
});

export default FeeStatusScreen;
