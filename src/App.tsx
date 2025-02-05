import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from './components/Grid';
import { Keyboard } from './components/Keyboard';
import { getRandomWord, isValidWord } from './utils/words';
import { Moon, Sun } from 'lucide-react';

export const WORDS = [
  'REACT', 'BUILD', 'WORLD', 'HOUSE', 'PLANT', 'MUSIC', 'DANCE', 'LIGHT',
  'PHONE', 'WATER', 'EARTH', 'SPACE', 'BRAIN', 'CLOCK', 'DREAM'
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [targetWord, setTargetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState<{
    [key: string]: 'correct' | 'present' | 'absent';
  }>({});

  const updateUsedLetters = useCallback((guess: string) => {
    const newUsedLetters = { ...usedLetters };
    
    guess.split('').forEach((letter, i) => {
      if (targetWord[i] === letter) {
        newUsedLetters[letter] = 'correct';
      } else if (targetWord.includes(letter)) {
        if (newUsedLetters[letter] !== 'correct') {
          newUsedLetters[letter] = 'present';
        }
      } else {
        newUsedLetters[letter] = 'absent';
      }
    });
    
    setUsedLetters(newUsedLetters);
  }, [targetWord, usedLetters]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameOver) return;

    if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 letters');
        return;
      }

      if (!isValidWord(currentGuess)) {
        setMessage('Not in word list');
        return;
      }

      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      updateUsedLetters(currentGuess.toUpperCase());
      setCurrentGuess('');

      if (currentGuess.toUpperCase() === targetWord) {
        setGameOver(true);
        setMessage('Congratulations! 🎉');
      } else if (newGuesses.length === 6) {
        setGameOver(true);
        setMessage(`Game Over! The word was ${targetWord}`);
      }

      return;
    }

    if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, gameOver, guesses, targetWord, updateUsedLetters]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (/^[A-Za-z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  const startNewGame = () => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
    setMessage('');
    setUsedLetters({});
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-start items-center mb-1"> {/* Reduced bottom margin */}
          <h1 className="text-3xl font-bold">Wordle Clone</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 ml-auto rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {message && (
          <div className={`text-left p-2 mb-1 rounded ${  // Reduced bottom margin
            message.includes('Congratulations') 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {message}
          </div>
        )}

        <div className="flex items-start justify-between">
          <div className="flex flex-col w-full max-w-lg mr-1"> {/* Reduced right margin */}
            <Grid
              guesses={guesses}
              currentGuess={currentGuess}
              targetWord={targetWord}
              gameOver={gameOver}
            />
            <Keyboard
              usedLetters={usedLetters}
              onKeyPress={handleKeyPress}
            />
            {gameOver && (
              <div className="text-left mt-1"> {/* Reduced top margin */}
                <button
                  onClick={startNewGame}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  New Game
                </button>
              </div>
            )}
          </div>

          <div className="w-48 ">
            <div className="sticky top-0">
              <h2 className="text-xl font-bold pl-4 mb-2">Word List:</h2>
              <ul className="list-disc pl-6">
                {WORDS.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
