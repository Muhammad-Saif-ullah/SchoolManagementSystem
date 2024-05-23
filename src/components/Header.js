import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

const Header = ({title}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  useEffect(() => {
    StatusBar.setBackgroundColor(colors.primary);
  }, []);

  return (
    <View style={styles.headerContainer}>
      {canGoBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          {/* <Icon
            name="chevron-back-outline"
            size={24}
            color={colors.secondary}
          /> */}
          <Icon name="chevron-back" size={24} color={colors.secondary} />
        </TouchableOpacity>
      )}
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 80,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -12}],
  },
  headerText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Header;
