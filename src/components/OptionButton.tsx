import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionButtonProps {
  isActive: boolean;
  title: string;
  toggleState: any;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  toggleState,
  isActive,
  title,
}) => {
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#0582ca',
      borderRadius: 5,
      marginVertical: 8,
      padding: 16,
    },
    buttonText: {
      color: isActive ? 'white' : '#666',
      fontFamily: 'OpenSans-Regular',
    },
    disabledButton: {
      backgroundColor: '#1b263b',
      borderRadius: 5,
      marginVertical: 8,
      padding: 16,
    },
  });

  return (
    <TouchableOpacity
      onPress={toggleState}
      style={isActive ? styles.button : styles.disabledButton}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default OptionButton;
