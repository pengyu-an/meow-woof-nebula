import React, { useMemo } from 'react';

interface StarfieldProps {
  count?: number;
}

export function Starfield({ count = 40 }: StarfieldProps) {
  const stars = useMemo(() => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {stars.map((star) => (
        <div 
          key={star.id}
          className="absolute bg-white rounded-full opacity-60"
          style={{ 
            width: star.size, 
            height: star.size, 
            left: star.left, 
            top: star.top,
            animation: `twinkle 3s infinite ease-in-out ${star.delay}`
          }}
        />
      ))}
    </div>
  );
}
