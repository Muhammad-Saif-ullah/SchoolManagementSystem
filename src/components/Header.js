import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  useEffect(() => {
    StatusBar.setBackgroundColor(colors.primary);
  }, []);

  return (
    <View style={styles.headerContainer}>
      {canGoBack && (
        // <Icon
        //   name="leftcircleo"
        //   size={25}
        //   color={colors.secondary}
        //   onPress={() => navigation.goBack()}
        //   style={styles.backButton}
        // />
        <Text onPress={() => navigation.goBack()} style={styles.backButton}>◀️</Text>

      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.primary,
  },
  backButton: {
    position: 'absolute',
    left: 18,
    top: 7,
    color: colors.secondary,
    fontSize: 23,
  },
  headerText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
