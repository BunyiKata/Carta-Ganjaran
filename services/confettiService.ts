declare const confetti: any; // Declare confetti from CDN

export const showConfetti = () => {
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFC0CB', '#ADD8E6', '#98FB98', '#FFD700', '#DDA0DD'] // Pastel colors
    });
  } else {
    console.warn('Confetti library not loaded.');
  }
};