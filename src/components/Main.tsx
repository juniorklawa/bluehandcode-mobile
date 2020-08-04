import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { useCode } from '../hooks/codeProvider';
import LocationCode from './LocationCode';
import PersonalInfo from './PersonalInfo';
import SkillsList from './SkillsList';
import StudiedManuals from './StudiedManuals';
import ShowCode from './ShowCode';

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
      <SafeAreaView style={{ flex: 1 }}>{handleCodeStep()}</SafeAreaView>
    </>
  );
};

export default Main;
