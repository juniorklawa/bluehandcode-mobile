import React, { useCallback } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { useCode } from './hooks/codeProvider';
import LocationCode from './steps/LocationCode';
import PersonalInfo from './steps/PersonalInfo';
import SkillsList from './steps/SkillsList';
import StudiedManuals from './steps/StudiedManuals';
import ShowCode from './steps/ShowCode';

const Main: React.FC = () => {
  const { step } = useCode();

  const handleCodeStep = useCallback(() => {
    switch (step) {
      case 0:
        return <StudiedManuals />;
      case 1:
        return <LocationCode />;
      case 2:
        return <PersonalInfo />;
      case 3:
        return <SkillsList />;
      case 4:
        return <ShowCode />;
      default:
        return null;
    }
  }, [step]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0d1b2a' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            style={{ height: 80, width: 80 }}
            // eslint-disable-next-line global-require
            source={require('./assets/logo.png')}
          />
        </View>
        <View style={{ flex: 1 }}>{handleCodeStep()}</View>
      </SafeAreaView>
    </>
  );
};

export default Main;
