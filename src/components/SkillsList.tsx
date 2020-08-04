import CheckBox from '@react-native-community/checkbox';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import skills from '../data/skills';
import { useCode } from '../hooks/codeProvider';

interface Skill {
  name: string;
  isChecked: boolean;
  code: string;
}

const SkillsList: React.FC = () => {
  const [skillArr, setSkillsArr] = useState<Skill[]>([]);
  const {
    step,
    updateStep,
    blueHandCode,
    updateBlueHandCode,
    generateCode,
  } = useCode();

  useEffect(() => {
    const newSkillArr = skills.map((skill, i) => {
      return {
        name: skill.name,
        isChecked: false,
        code: skill.code,
      } as Skill;
    });

    setSkillsArr(newSkillArr);
  }, []);

  const handleSkillsArray = useCallback(
    (skillName) => {
      const updatedSkillArr = skillArr.map((skill: Skill) => {
        if (skill.name === skillName) {
          return { ...skill, isChecked: !skill.isChecked };
        }
        return skill;
      });

      setSkillsArr(updatedSkillArr);
    },
    [skillArr],
  );

  const handleSkills = useCallback(() => {
    const formattedSkills = skillArr
      .filter((skill) => skill.isChecked)
      .map((skill) => skill.code)
      .join('');

    updateBlueHandCode({
      ...blueHandCode,
      skills: formattedSkills,
    });
    updateStep(step + 1);
  }, [updateBlueHandCode, blueHandCode, skillArr, step, updateStep]);

  const canContinue = useCallback(() => {
    return skillArr.some((skill) => skill.isChecked);
  }, [skillArr]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.body}>
        <Text style={styles.sectionTitle}>Aptidões</Text>

        {skillArr.map((skill) => (
          <TouchableOpacity
            key={skill.code}
            onPress={() => handleSkillsArray(skill.name)}
            style={skill.isChecked ? styles.button : styles.disabledButton}
          >
            <Text>{skill.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleSkills()}
        disabled={!canContinue()}
        style={styles.bottomBtn}
      >
        <Text>Gerar código</Text>
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SkillsList;
