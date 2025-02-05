import React, { useEffect } from 'react';

interface KeyboardProps {
  usedLetters: {
    [key: string]: 'correct' | 'present' | 'absent' | undefined;
  };
  onKeyPress: (key: string) => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ usedLetters, onKeyPress }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if ((key >= 'A' && key <= 'Z') || key === 'ENTER' || key === 'BACKSPACE') {
        onKeyPress(key === 'BACKSPACE' ? '⌫' : key === 'ENTER' ? key : key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onKeyPress]);

  return null; // No UI is rendered
};

export default Keyboard;