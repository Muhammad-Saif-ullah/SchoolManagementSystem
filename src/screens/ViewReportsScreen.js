import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

const ViewReportScreen = ({route, navigation}) => {
  const handlePress = screen => {
    navigation.navigate(screen, {email: route.params?.email});
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button
          title="Student Age Record Report"
          onPress={() => handlePress('ViewStudentAgeRecordScreen')}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Results Report"
          onPress={() => handlePress('ResultSheetScreen')}
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

export default ViewReportScreen;
