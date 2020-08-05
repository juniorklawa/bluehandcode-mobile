import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import { useCode } from '../hooks/codeProvider';
import NextButton from '../components/NextButton';

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
        <View
          style={{
            backgroundColor: '#16425b',
            paddingVertical: 16,
            paddingHorizontal: 8,
            borderRadius: 5,
            borderColor: '#0582ca',
            borderWidth: 2,
          }}
        >
          <CountryPicker
            theme={{
              fontFamily: 'OpenSans-Regular',
              onBackgroundTextColor: 'white',
              backgroundColor: '#1b263b',
            }}
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
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 48 }]}>
          Cidade (DDD)
        </Text>
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
          <TextInput
            style={{
              color: 'white',
              fontFamily: 'OpenSans-Regular',
              fontSize: 18,
            }}
            placeholder="Ex: 41"
            placeholderTextColor="#999"
            onChangeText={(text) => setCityCode(text)}
            keyboardType="numeric"
            value={cityCode}
          />
        </View>
      </ScrollView>

      <NextButton
        onPress={() => handleLocationCode()}
        canContinue={() => !!canContinue()}
      />
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
    marginVertical: 12,
    fontSize: 28,
    letterSpacing: 2,
    fontFamily: 'OpenSans-Bold',
    color: 'white',
  },
});

export default LocationCode;
