import React from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import { useCode } from '../hooks/codeProvider';

interface Skill {
  name: string;
  isChecked: boolean;
  code: string;
}

const ShowCode: React.FC = () => {
  const { generateCode } = useCode();

  const formattedCode = generateCode();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>{formattedCode}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    margin: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -80,
  },
  bottomBtn: {
    height: 60,
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 36,
    letterSpacing: 2,
    fontFamily: 'OpenSans-ExtraBold',
    color: 'white',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ShowCode;
