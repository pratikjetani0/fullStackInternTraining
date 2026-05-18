
// MISTAKES
export const calculateMistakes = (
  typedText: string,
  paragraph: string,
): number => {
  return typedText.split("").reduce((count, char, index) => {
    return char !== paragraph[index] ? count + 1 : count;
  }, 0);
};

// CPM = characters per minute
export const calculateCPM = (
  correctChars: number,
  elapsedTime: number,
): number => {
  return Math.round((correctChars / elapsedTime) * 60);
};

// WPM = word per minute
export const calculateWPM = (cpm: number): number => {
  return Math.round(cpm / 5);
};

// ACCURACY
export const calculateAccuracy = (
  typedLength: number,
  correctChars: number,
): number => {
  if (typedLength === 0) return 100;

  return Math.round((correctChars / typedLength) * 100);
};
