export const createAudioElement = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 0.5;
  audio.loop = true;
  return audio;
};