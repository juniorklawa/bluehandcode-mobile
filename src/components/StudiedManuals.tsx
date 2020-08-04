import React, { useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
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

  const canContinue = useCallback(() => {
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

          <TouchableOpacity
            onPress={() => setZombie((prevState) => !prevState)}
            style={zombie ? styles.button : styles.disabledButton}
          >
            <Text>Protocolo Bluehand: Zumbis</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setAlien((prevState) => !prevState)}
            style={alien ? styles.button : styles.disabledButton}
          >
            <Text>Protocolo Bluehand: Alienígenas</Text>
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          onPress={() => handleManuals()}
          disabled={!canContinue()}
          style={styles.bottomBtn}
        >
          <Text>Próximo</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(180, 52, 52, 0.5)',
    marginVertical: 8,
    padding: 16,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});

export default StudiedManuals;
