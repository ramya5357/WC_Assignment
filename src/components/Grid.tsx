import React from 'react';
import { cn } from '../utils/cn';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  targetWord: string;
  gameOver: boolean;
}

export const Grid: React.FC<GridProps> = ({
  guesses,
  currentGuess,
  targetWord,
  gameOver,
}) => {
  // Calculate remaining empty rows, ensuring it's never negative
  const remainingRows = Math.max(0, 6 - guesses.length - (gameOver ? 0 : 1));
  const empties = Array(remainingRows).fill('');
  
  const checkLetter = (word: string, pos: number) => {
    const letter = word[pos]?.toUpperCase();
    if (!letter) return '';
    
    if (targetWord[pos] === letter) {
      return 'bg-green-500';
    }
    if (targetWord.includes(letter)) {
      return 'bg-yellow-500';
    }
    return 'bg-gray-500';
  };

  return (
    <div className="grid grid-rows-6 gap-2 p-4">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {guess.split('').map((letter, j) => (
            <div
              key={j}
              className={cn(
                'w-14 h-14 border-2 flex items-center justify-center',
                'text-white font-bold text-2xl uppercase',
                checkLetter(guess, j),
                'transform transition-all duration-500'
              )}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
      
      {!gameOver && guesses.length < 6 && (
        <div className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-14 h-14 border-2 flex items-center justify-center',
                'text-black font-bold text-2xl uppercase',
                'border-gray-300',
                currentGuess[i] ? 'border-gray-600' : ''
              )}
            >
              {currentGuess[i] || ''}
            </div>
          ))}
        </div>
      )}
      
      {empties.map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {Array(5).fill('').map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-300 flex items-center justify-center"
            />
          ))}
        </div>
      ))}
    </div>
  );
};