import React, { createContext, useCallback, useContext, useState } from 'react';

interface CodeContextData {
  step: number;
  updateStep(s: number): void;
  blueHandCode: BlueHandCode;
  updateBlueHandCode(b: BlueHandCode): void;
  generateCode(): string;
  code: string;
}

export interface BlueHandCode {
  manuals: string;
  countryCode: string;
  cityCode: string;
  groupPosition: string;
  protectedPerson?: string;
  skills: string;
}

const CodeContext = createContext<CodeContextData>({} as CodeContextData);

const CodeProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [blueHandCode, setBlueHandCode] = useState<BlueHandCode>(
    {} as BlueHandCode,
  );

  const updateStep = useCallback((c) => {
    setStep(c);
  }, []);

  const generateCode = useCallback((): string => {
    const {
      manuals,
      countryCode,
      cityCode,
      groupPosition,
      protectedPerson,
      skills,
    } = blueHandCode;
    const formattedCode = `PBH${manuals}+${countryCode}${cityCode}${groupPosition}${protectedPerson}${skills}`;

    return formattedCode;
  }, [blueHandCode]);

  const updateBlueHandCode = useCallback((b) => {
    setBlueHandCode(b);
  }, []);

  return (
    <CodeContext.Provider
      value={{
        blueHandCode,
        updateBlueHandCode,
        updateStep,
        step,
        generateCode,
        code,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

function useCode() {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error('useCode must be used within an CodeProvider');
  }

  return context;
}

export { CodeProvider, useCode };
