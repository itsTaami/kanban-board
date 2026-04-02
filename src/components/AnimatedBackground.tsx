'use client';

import { useEffect, useState } from 'react';

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 8}s`,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Animated gradient background */}
      <div className="animated-bg" />

      {/* Grid pattern overlay */}
      <div className="grid-pattern" />

      {/* Floating orbs */}
      <div className="floating-orb orb-1" />
      <div className="floating-orb orb-2" />
      <div className="floating-orb orb-3" />
      <div className="floating-orb orb-4" />

      {/* Rising particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>
    </>
  );
}
