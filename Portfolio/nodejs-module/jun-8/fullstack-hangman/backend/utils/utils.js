export function getRandomWord() {
  const words = [
    'sorgente',
    'arcobaleno',
    'palpito',
    'camicia',
    'elettrico',
    'amuleto',
    'trapezio',
    'scintilla',
    'deserto',
    'magnetizzato',
  ];
  const wordIndex = Math.floor(Math.random() * (words.length - 0) + 0);
  return words[wordIndex];
}
