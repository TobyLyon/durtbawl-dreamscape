import { useState, forwardRef, useImperativeHandle } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface Firework {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export interface FireworksRef {
  createFirework: (x: number, y: number) => void;
}

const Fireworks = forwardRef<FireworksRef>((_, ref) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const { play: playSound } = useAudio('/firework-sound.wav');

  const createFirework = (x: number, y: number) => {
    const emojis = ['✨', '🌟', '💫', '⭐', '🎆', '🎇', '🌠'];
    
    const newFireworks = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 200,
      y: y + (Math.random() - 0.5) * 200,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    }));

    setFireworks(prev => [...prev, ...newFireworks]);
    playSound();
    
    setTimeout(() => {
      setFireworks(prev => prev.filter(fw => !newFireworks.includes(fw)));
    }, 800);
  };

  useImperativeHandle(ref, () => ({
    createFirework
  }));

  return (
    <>
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className="firework"
          style={{
            left: `${firework.x}px`,
            top: `${firework.y}px`,
          }}
        >
          {firework.emoji}
        </div>
      ))}
    </>
  );
});

Fireworks.displayName = 'Fireworks';

export default Fireworks;