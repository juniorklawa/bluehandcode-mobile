import { Picker } from '@react-native-community/picker';
import React, { useCallback, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import NextButton from '../components/NextButton';
import OptionButton from '../components/OptionButton';
import { useCode } from '../hooks/codeProvider';

const PersonalInfo: React.FC = () => {
  const [toggleProtected, setToggleProtected] = useState(false);
  const [groupPosition, setGroupPosition] = useState<string>('!');
  const { step, updateStep, blueHandCode, updateBlueHandCode } = useCode();

  const handlePersonalInfo = useCallback(() => {
    updateBlueHandCode({
      ...blueHandCode,
      groupPosition,
      protectedPerson: toggleProtected ? '*' : '',
    });
    updateStep(step + 1);
  }, [
    updateBlueHandCode,
    blueHandCode,
    step,
    updateStep,
    groupPosition,
    toggleProtected,
  ]);

  const canContinue = useCallback(() => {
    return groupPosition;
  }, [groupPosition]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.body}>
        <Text style={styles.sectionTitle}>Posição no grupo</Text>
        <View
          style={{
            backgroundColor: '#16425b',
            paddingHorizontal: 8,
            borderRadius: 5,
            justifyContent: 'center',
            borderColor: '#0582ca',
            borderWidth: 2,
          }}
        >
          <Picker
            selectedValue={groupPosition}
            style={{
              height: 50,
              color: 'white',
              fontFamily: 'OpenSans-Bold',
            }}
            onValueChange={(value) => setGroupPosition(value as string)}
          >
            <Picker.Item label="Líder" value="!" />
            <Picker.Item label="Integrante" value=":" />
            <Picker.Item label="Solitário" value="?" />
          </Picker>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 48 }]}>
          Indivíduo Protegido
        </Text>

        <OptionButton
          title="Sou protegido"
          isActive={toggleProtected}
          toggleState={() => setToggleProtected((prevState) => !prevState)}
        />
      </ScrollView>

      <NextButton
        onPress={() => handlePersonalInfo()}
        canContinue={() => !!canContinue()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: { margin: 16, flex: 1 },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 28,
    letterSpacing: 2,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },
});

export default PersonalInfo;
