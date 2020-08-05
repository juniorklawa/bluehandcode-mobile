import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import NextButton from '../components/NextButton';
import OptionButton from '../components/OptionButton';
import { useCode } from '../hooks/codeProvider';

export interface BluehandCode {
  manuals: string;
  countryCode: string;
  cityCode: string;
  groupPosition: string;
  protectedPerson?: string;
  skills: string;
}

const StudiedManuals: React.FC = () => {
  const [zombie, setZombie] = useState<boolean>(false);
  const [alien, setAlien] = useState<boolean>(false);
  const { updateBlueHandCode, blueHandCode, step, updateStep } = useCode();

  const handleManuals = useCallback(() => {
    if (alien && zombie) {
      updateBlueHandCode({
        ...blueHandCode,
        manuals: 'za',
      });
      updateStep(step + 1);
      return;
    }
    if (alien) {
      updateBlueHandCode({
        ...blueHandCode,
        manuals: 'a',
      });
      updateStep(step + 1);
      return;
    }
    if (zombie) {
      updateBlueHandCode({
        ...blueHandCode,
        manuals: 'z',
      });
      updateStep(step + 1);
    }
  }, [blueHandCode, updateBlueHandCode, alien, zombie, step, updateStep]);

  const canContinue = useCallback((): boolean => {
    return alien || zombie;
  }, [alien, zombie]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.body}
        >
          <Text style={styles.sectionTitle}>Manuais estudados</Text>

          <OptionButton
            isActive={alien}
            title="Protocolo Bluehand: Alienígenas"
            toggleState={() => setAlien((prevState) => !prevState)}
          />

          <OptionButton
            isActive={zombie}
            title="Protocolo Bluehand: Zumbis"
            toggleState={() => setZombie((prevState) => !prevState)}
          />
        </ScrollView>

        <NextButton
          onPress={() => handleManuals()}
          canContinue={() => canContinue()}
        />
      </SafeAreaView>
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
  button: {
    backgroundColor: 'rgba(0, 200, 0, 1)',
    marginVertical: 8,
    padding: 16,
  },
  disabledButton: {
    backgroundColor: 'rgba(27, 38, 44, 0.5)',
    marginVertical: 8,
    padding: 16,
  },
  sectionTitle: {
    marginVertical: 12,
    fontSize: 28,
    letterSpacing: 2,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },
});

export default StudiedManuals;
