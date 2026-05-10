import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

// Helper to generate complex particle systems using math formulas
const generateParticles = (
  count: number,
  pattern: 'spiral' | 'vortex' | 'ring' | 'scatter' | 'comet' | 'aurora',
  options: any = {}
) => {
  return Array.from({ length: count }).map((_, i) => {
    const t = i / count;
    let x = 50, y = 50, size = 1, opacity = 1;

    if (pattern === 'vortex') {
      const turns = options.turns || 3;
      const theta = t * turns * Math.PI * 2;
      const r = 45 * Math.pow(t, options.power || 0.6);
      const noiseR = (Math.random() - 0.5) * (options.noise || 6);
      const noiseTheta = (Math.random() - 0.5) * 0.4;
      x = 50 + (r + noiseR) * Math.cos(theta + noiseTheta);
      y = 50 + (r + noiseR) * Math.sin(theta + noiseTheta);
      size = Math.random() * 1.5 + 0.5;
      opacity = (1 - t) * 0.8 + 0.2; // Brighter at center
    }

    if (pattern === 'spiral') { // Like a rose
      const theta = i * 2.39996; // Golden angle approx
      const r = Math.sqrt(i) * (45 / Math.sqrt(count));
      x = 50 + r * Math.cos(theta);
      y = 50 + r * Math.sin(theta);
      size = Math.random() * 2 + 0.5;
      opacity = Math.random() * 0.6 + 0.4;
    }

    if (pattern === 'ring') {
      const radius = options.radius || 40;
      const thickness = options.thickness || 5;
      const theta = Math.random() * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * thickness;
      x = 50 + r * Math.cos(theta);
      y = 50 + r * Math.sin(theta);
      size = Math.random() * 1.5 + 0.5;
      opacity = Math.random() * 0.7 + 0.3;
    }
    
    if (pattern === 'comet') {
      // Sweeping arc
      const theta = (t * Math.PI * 1.5) - Math.PI; // -PI to PI/2
      const r = 35 + Math.random() * 10;
      // Tail diffuses
      const diffusion = t * 15;
      x = 50 + (r + (Math.random()-0.5)*diffusion) * Math.cos(theta);
      y = 50 + (r + (Math.random()-0.5)*diffusion) * Math.sin(theta);
      size = Math.random() * 2 + 0.5;
      opacity = (1 - t) * 0.8 + 0.2; // Brighter at head
    }

    if (pattern === 'scatter') {
      const r = Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      x = 50 + r * Math.cos(theta);
      y = 50 + r * Math.sin(theta);
      size = Math.random() * 2 + 0.5;
      opacity = Math.random() * 0.6 + 0.2;
    }

    if (pattern === 'aurora') {
      const xPos = t * 100;
      // sin wave height
      const hBase = 50 + Math.sin(t * Math.PI * 4) * 15;
      const yNoise = (Math.random() - 0.5) * 30;
      x = xPos;
      y = hBase + yNoise;
      size = Math.random() * 1.5 + 0.5;
      opacity = Math.random() * 0.8 + 0.2;
    }

    return { x, y, size, opacity };
  });
};

const ParticleSVG = ({ particles, color, className, style }: any) => (
  <motion.svg viewBox="0 0 100 100" className={cn("absolute inset-0 w-full h-full", className)} style={style}>
    {particles.map((p: any, i: number) => (
      <circle key={i} cx={p.x} cy={p.y} r={p.size} fill={color} opacity={p.opacity} />
    ))}
  </motion.svg>
);

export const SciFiLandmarkVisual = ({ id, active }: { id: string, active?: boolean }) => {
  const containerClass = `w-16 h-16 rounded-full flex items-center justify-center relative transition-all duration-300 ${active ? 'scale-125 z-10' : 'scale-100 opacity-90 group-hover:scale-110 z-0'}`;

  // Pre-compute particles to avoid re-calculating on every tick
  const [particlesA, particlesB, particlesC] = useMemo(() => {
    switch (id) {
      case '1': // Rose Nebula - overlapping golden angle spirals
        return [
          generateParticles(150, 'spiral'),
          generateParticles(80, 'ring', { radius: 35, thickness: 15 }),
          generateParticles(40, 'scatter')
        ];
      case '2': // Comet Tail - sweeping arcs
        return [
          generateParticles(120, 'comet'),
          generateParticles(60, 'ring', { radius: 25, thickness: 5 }),
          generateParticles(50, 'scatter')
        ];
      case '3': // Stardust Bathhouse - layered vortexes/rings
        return [
          generateParticles(100, 'vortex', { turns: 2, power: 0.8, noise: 4 }),
          generateParticles(80, 'scatter'),
          generateParticles(120, 'ring', { radius: 40, thickness: 10 })
        ];
      case '4': // Gravity Nest - Intense tight vortex converging to center
        return [
          generateParticles(200, 'vortex', { turns: 4, power: 0.4, noise: 2 }),
          generateParticles(120, 'vortex', { turns: -3, power: 0.5, noise: 5 }),
          generateParticles(80, 'ring', { radius: 20, thickness: 8 })
        ];
      case '5': // Binary Star Canteen - Two distinct dense clusters plus orbit
        return [
          // Simulated by moving origin in rendering, so just generate dense scatters
          generateParticles(80, 'spiral'), 
          generateParticles(80, 'spiral'),
          generateParticles(100, 'ring', { radius: 45, thickness: 2 })
        ];
      case '6': // Stardust Theater - planetary rings and hollow center
        return [
          generateParticles(150, 'ring', { radius: 35, thickness: 12 }),
          generateParticles(100, 'ring', { radius: 20, thickness: 4 }),
          generateParticles(50, 'scatter')
        ];
      case '7': // Aurora - vertical waveforms
        return [
          generateParticles(150, 'aurora'),
          generateParticles(100, 'aurora'),
          generateParticles(60, 'scatter')
        ];
      default:
        return [
          generateParticles(100, 'ring', { radius: 30, thickness: 5 }),
          [], []
        ];
    }
  }, [id]);

  // 1: 玫瑰星云公园 Rose Nebula Park
  if (id === '1') {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 rounded-full bg-pink-600/20 blur-xl" />
        <div className="absolute inset-2 rounded-full border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.3)]" />
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesA} color="#f472b6" /> {/* pink-400 */}
        </motion.div>
        
        <motion.div animate={{ rotate: -360, scale: [0.9, 1.1, 0.9] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0">
          <ParticleSVG particles={particlesB} color="#c084fc" /> {/* purple-400 */}
        </motion.div>

        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0">
          <ParticleSVG particles={particlesC} color="#fff1f2" className="blur-[1px]" /> {/* rose-50 */}
        </motion.div>
      </div>
    );
  }

  // 2: 彗尾跑道 Comet Tail Track
  if (id === '2') {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-xl" />
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesA} color="#22d3ee" className="drop-shadow-[0_0_5px_#06b6d4]" />
        </motion.div>

        <motion.div animate={{ rotate: -180 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesB} color="#60a5fa" />
        </motion.div>
        
        {/* Core star moving around */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute top-1/2 left-[85%] w-3 h-3 bg-white rounded-full shadow-[0_0_15px_#fff,0_0_30px_#06b6d4] -translate-y-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    );
  }

  // 3: 星尘澡堂 Stardust Bathhouse
  if (id === '3') {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-xl" />
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
           <ParticleSVG particles={particlesA} color="#fcd34d" />
        </motion.div>
        
        <motion.div animate={{ rotate: 180, scale: [0.9, 1.1, 0.9] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 mix-blend-screen">
           <ParticleSVG particles={particlesB} color="#fef08a" className="blur-[1px]"/>
        </motion.div>

        <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
           <ParticleSVG particles={particlesC} color="#fbbf24" />
        </motion.div>
      </div>
    );
  }

  // 4: 重力窝 Gravity Nest (Highly Granular Particle Vortex)
  if (id === '4') {
    return (
      <div className={containerClass}>
        {/* Intense core glow */}
        <div className="absolute inset-0 rounded-full bg-orange-600/20 blur-xl" />
        <motion.div 
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }} 
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-4 rounded-full bg-orange-400/30 blur-md"
        />

        {/* Dense inward rotating vortex */}
        <motion.div animate={{ rotate: -360, scale: [1, 0.9, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesA} color="#fb923c" className="drop-shadow-[0_0_3px_#ea580c]" />
        </motion.div>
        
        {/* Counter-rotating disruption layer */}
        <motion.div animate={{ rotate: 360, scale: [0.9, 1.1, 0.9] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesB} color="#fbbf24" className="drop-shadow-[0_0_2px_#d97706]" />
        </motion.div>

        {/* Central tight ring */}
        <motion.div animate={{ rotate: 180, scale: [0.95, 1.05, 0.95] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0">
          <ParticleSVG particles={particlesC} color="#fff" className="blur-[0.5px]" />
        </motion.div>
      </div>
    );
  }

  // 5: 双星食堂 Binary Star Canteen
  if (id === '5') {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl" />
        
        {/* Orbit track */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 opacity-40">
           <ParticleSVG particles={particlesC} color="#818cf8" />
        </motion.div>

        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          {/* Red Star Cluster */}
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute w-[40%] h-[40%] top-[10%] left-[50%] -translate-x-1/2 rounded-full overflow-visible">
            <div className="absolute inset-0 bg-rose-500/30 blur-md rounded-full" />
            <ParticleSVG particles={particlesA} color="#f43f5e" />
          </motion.div>
          
          {/* Blue Star Cluster */}
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute w-[40%] h-[40%] bottom-[10%] left-[50%] -translate-x-1/2 rounded-full overflow-visible">
            <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-full" />
            <ParticleSVG particles={particlesB} color="#3b82f6" />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // 6: 星屑剧场 Stardust Theater (Planetary rings angled 3D)
  if (id === '6') {
    return (
      <div className={containerClass} style={{ perspective: '200px' }}>
        <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-xl" />
        
        {/* Core stage */}
        <div className="absolute inset-[30%] rounded-full shadow-[0_0_20px_#9333ea] bg-purple-800/80 backdrop-blur-md border border-purple-400/50 z-10 flex items-center justify-center overflow-hidden">
           <motion.div 
             animate={{ opacity: [0.3, 0.7, 0.3] }}
             transition={{ duration: 3, repeat: Infinity }}
             className="w-1/2 h-1/2 rounded-full bg-white blur-xl"
           />
        </div>

        {/* 3D angled rings composed of particles */}
        <div className="absolute inset-0 z-0" style={{ transform: 'rotateX(65deg) rotateY(10deg)' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
             <ParticleSVG particles={particlesA} color="#d8b4fe" />
          </motion.div>
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
             <ParticleSVG particles={particlesB} color="#c084fc" className="blur-[1px]" />
          </motion.div>
        </div>
        
        {/* Floating holograms */}
        <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-0 z-20">
           <ParticleSVG particles={particlesC} color="#fff" />
        </motion.div>
      </div>
    );
  }

  // 7: 极光眺望台 Aurora Observatory
  if (id === '7') {
    return (
      <div className={containerClass}>
        <div className="absolute inset-0 rounded-full bg-teal-500/20 blur-xl" />
        <div className="absolute bottom-2 w-10 h-1 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf] z-10" />
        
        {/* Vertical waving particle curtains */}
        <motion.div 
          animate={{ x: [-10, 10, -10], scaleY: [1, 1.1, 1] }} 
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pb-6 origin-bottom"
        >
          <ParticleSVG particles={particlesA} color="#2dd4bf" /> {/* teal-400 */}
        </motion.div>

        <motion.div 
          animate={{ x: [10, -10, 10], scaleY: [0.9, 1.2, 0.9] }} 
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 pb-6 origin-bottom mix-blend-screen"
        >
          <ParticleSVG particles={particlesB} color="#34d399" className="blur-[1px]" /> {/* emerald-400 */}
        </motion.div>
        
        {/* Rising glowing snow/sparks */}
        <div className="absolute inset-0 overflow-hidden rounded-full mask-image:radial-gradient(circle,white,transparent)]">
          <motion.div animate={{ y: [0, -50] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
             <ParticleSVG particles={particlesC} color="#fff" />
          </motion.div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className={containerClass}>
       <div className="absolute inset-0 rounded-full bg-slate-500/20 blur-xl" />
       <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute inset-0">
          <ParticleSVG particles={particlesA} color="#cbd5e1" />
       </motion.div>
    </div>
  );
};

