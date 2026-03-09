import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Keyboard } from 'react-native';

interface KeyboardContextType {
  isKeyboardVisible: boolean;
  keyboardHeight: number;
}

const KeyboardContext = createContext<KeyboardContextType>({ isKeyboardVisible: false, keyboardHeight: 0 });

export const KeyboardProvider = ({ children }: { children: ReactNode }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardContext.Provider value={{ isKeyboardVisible, keyboardHeight }}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboard = () => useContext(KeyboardContext);
