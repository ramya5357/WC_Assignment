// List of 5-letter words
export const WORDS = [
  'REACT', 'BUILD', 'WORLD', 'HOUSE', 'PLANT', 'MUSIC', 'DANCE', 'LIGHT',
  'PHONE', 'WATER', 'EARTH', 'SPACE', 'BRAIN', 'CLOCK', 'DREAM'
];

export const getRandomWord = () => {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
};

export const isValidWord = (word: string) => {
  return WORDS.includes(word.toUpperCase());
};