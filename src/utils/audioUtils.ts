export const initializeAudio = async () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    await audioContext.resume();
    return audioContext;
  } catch (error) {
    console.error('Audio initialization failed:', error);
    return null;
  }
};

export const createAudioElement = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.loop = true;
  return audio;
};