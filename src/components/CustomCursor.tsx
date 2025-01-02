import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface Trail extends CursorPosition {
  id: number;
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      setTrails(prev => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 5),
      ]);
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x - 15}px`,
          top: `${cursorPosition.y - 15}px`,
        }}
      />
      
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x - 5}px`,
            top: `${trail.y - 5}px`,
            opacity: 1 - (index * 0.15),
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;