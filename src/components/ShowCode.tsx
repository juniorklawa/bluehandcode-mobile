import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
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
      <ScrollView style={styles.body}>
        <Text style={styles.sectionTitle}>Código bluehand</Text>
        <Text style={styles.sectionTitle}>{formattedCode}</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  body: { margin: 16, flex: 1 },
  bottomBtn: {
    height: 60,
    backgroundColor: 'green',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ShowCode;
