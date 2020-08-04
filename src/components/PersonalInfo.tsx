import { Picker } from '@react-native-community/picker';
import React, { useState, useCallback } from 'react';
import CheckBox from '@react-native-community/checkbox';
import {
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
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

        <Picker
          selectedValue={groupPosition}
          style={{ height: 50, width: 150 }}
          onValueChange={(value) => setGroupPosition(value as string)}
        >
          <Picker.Item label="Líder" value="!" />
          <Picker.Item label="Integrante" value=":" />
          <Picker.Item label="Solitário" value="?" />
        </Picker>

        <Text style={styles.sectionTitle}>Indivíduo Protegido</Text>
        <View style={styles.checkBoxContainer}>
          <Text>Protegido?</Text>
          <CheckBox
            disabled={false}
            value={toggleProtected}
            onValueChange={(newValue: boolean) => {
              setToggleProtected(newValue);
            }}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => handlePersonalInfo()}
        disabled={!canContinue()}
        style={styles.bottomBtn}
      >
        <Text>Próximo</Text>
      </TouchableOpacity>
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

export default PersonalInfo;
