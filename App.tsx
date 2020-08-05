import React from 'react';
import { StatusBar } from 'react-native';
import Main from './src/Main';
import { CodeProvider } from './src/hooks/codeProvider';

const App: React.FC = () => {
  return (
    <>
      <CodeProvider>
        <StatusBar backgroundColor="#0d1b2a" barStyle="dark-content" />
        <Main />
      </CodeProvider>
    </>
  );
};

export default App;
