import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NextButtonProps {
  onPress(): void;
  title?: string;
  canContinue(): boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  canContinue,
  title = 'Próximo',
}) => {
  const styles = StyleSheet.create({
    button: {
      height: 60,
      backgroundColor: canContinue() ? '#0582ca' : '#1b263b',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: canContinue() ? 'white' : '#666',
      fontFamily: 'OpenSans-Bold',
      letterSpacing: 2,
      fontSize: 16,
    },
  });

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      disabled={!canContinue()}
      style={styles.button}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NextButton;
