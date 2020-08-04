import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { useCode } from '../hooks/codeProvider';

const LocationCode: React.FC = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('BR');
  const [, setCountry] = useState<Country | null>(null);
  const [callingCode, setCallingCode] = useState<string>('55');
  const [isModalVisible] = useState<boolean>(false);
  const [cityCode, setCityCode] = useState<string>('');

  const { updateBlueHandCode, blueHandCode, updateStep, step } = useCode();

  const onSelect = (selectedCountry: Country) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setCallingCode(selectedCountry.callingCode[0]);
  };

  const handleLocationCode = useCallback(() => {
    updateBlueHandCode({
      ...blueHandCode,
      cityCode,
      countryCode: callingCode,
    });
    updateStep(step + 1);
  }, [
    updateBlueHandCode,
    blueHandCode,
    callingCode,
    cityCode,
    step,
    updateStep,
  ]);

  const canContinue = useCallback(() => {
    return callingCode && cityCode;
  }, [callingCode, cityCode]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.body}>
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
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleLocationCode()}
        disabled={!canContinue()}
        style={styles.bottomBtn}
      >
        <Text>Próximo</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  body: { margin: 16 },

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
});

export default LocationCode;
