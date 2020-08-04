import React from 'react';
import { StatusBar } from 'react-native';
import Main from './src/components/Main';
import { CodeProvider } from './src/hooks/codeProvider';

const App: React.FC = () => {
  return (
    <>
      <CodeProvider>
        <StatusBar barStyle="dark-content" />
        <Main />
      </CodeProvider>
    </>
  );
};

export default App;
