import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
} from 'react-native';
import CountryPicker, {
  CountryCode,
  Country,
} from 'react-native-country-picker-modal';
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import skills from './src/data/skills';

interface Code {
  manuals: string;
  countryCode: string;
  cityCode: string;
  groupPosition: string;
  protected?: string;
  skills: string;
}

interface Skill {
  name: string;
  isChecked: boolean;
  code: string;
}

export default function App() {
  const [zombie, setZombie] = useState<boolean>(false);
  const [alien, setAlien] = useState<boolean>(false);
  const [manual, setManual] = useState<string>('');
  const [toggleProtected, setToggleProtected] = useState(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('BR');
  const [country, setCountry] = useState<Country | null>(null);
  const [callingCode, setCallingCode] = useState<string>('');
  const [groupPosition, setGroupPosition] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [cityCode, setCityCode] = useState<string>('');
  const [skillArr, setSkillsArr] = useState<Skill[]>([]);

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setCallingCode(selectedCountry.callingCode[0]);
  };

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

  const handleSkills = useCallback(
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

  const generateCode = useCallback(() => {
    if (alien && zombie) {
      setManual('za');
    } else if (zombie) {
      setManual('z');
    } else if (alien) {
      setManual('a');
    }

    const isProtected = toggleProtected ? '*' : '';

    const formattedSkills = skillArr
      .filter((skill) => skill.isChecked)
      .map((skill) => skill.code)
      .join('');

    const bhCode = `PBH${manual}+${callingCode}${cityCode}${groupPosition}${isProtected}${formattedSkills}`;

    return Alert.alert('Código', bhCode);
  }, [
    alien,
    manual,
    zombie,
    callingCode,
    cityCode,
    groupPosition,
    toggleProtected,
    skillArr,
  ]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.body}>
            <Text style={styles.sectionTitle}>Manuais estudados</Text>

            <TouchableOpacity
              onPress={() => setZombie((prevState) => !prevState)}
              style={[styles.button, { opacity: zombie ? 1 : 0.5 }]}
            >
              <Text>Protocolo Bluehand: Zumbis</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAlien((prevState) => !prevState)}
              style={[styles.button, { opacity: alien ? 1 : 0.5 }]}
            >
              <Text>Protocolo Bluehand: Alienígenas</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>País</Text>

            <CountryPicker
              countryCode={countryCode}
              onSelect={onSelect}
              withFilter
              withFlag
              withCallingCode
              withEmoji
              withCountryNameButton
              withCallingCodeButton
              visible={isModalVisible}
            />

            <Text style={styles.sectionTitle}>Cidade (DDD)</Text>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text) => setCityCode(text)}
              keyboardType="numeric"
              value={cityCode}
            />

            <Text style={styles.sectionTitle}>Posição no grupo</Text>

            <RNPickerSelect
              style={{ viewContainer: { backgroundColor: 'red', flex: 1 } }}
              value={groupPosition}
              onValueChange={(value) => setGroupPosition(value)}
              useNativeAndroidPickerStyle={false}
              items={[
                { label: 'Líder', value: '!' },
                { label: 'Integrante', value: ':' },
                { label: 'Solitário', value: '?' },
              ]}
            />
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

            <Text style={styles.sectionTitle}>Aptidões</Text>

            {skillArr.map((skill) => (
              <View key={skill.code} style={styles.checkBoxContainer}>
                <Text>{skill.name}</Text>
                <CheckBox
                  disabled={false}
                  value={skill.isChecked}
                  onValueChange={() => {
                    handleSkills(skill.name);
                  }}
                />
              </View>
            ))}

            <TouchableOpacity onPress={generateCode} style={styles.button}>
              <Text>Gerar código</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {},
  body: { margin: 16 },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  button: {
    backgroundColor: 'blue',
    marginVertical: 8,
    padding: 16,
    opacity: 0.5,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
});
