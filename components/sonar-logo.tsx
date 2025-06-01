"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'

type SizeKey = 'small' | 'medium' | 'large';
type SizeConfig = { width: number; height: number; logoSize: number };

type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  opacitySpeed: number;
};

interface SonarLogoProps {
  size?: SizeKey;
}

export function SonarLogo({ size = 'medium' }: SonarLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Sizes based on variant
  const sizes: Record<SizeKey, SizeConfig> = {
    small: { width: 120, height: 40, logoSize: 24 },
    medium: { width: 160, height: 50, logoSize: 32 },
    large: { width: 200, height: 60, logoSize: 40 }
  };
  
  const { width, height, logoSize } = sizes[size];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Now we have a valid context, we can define our animation logic
    const renderParticles = () => {
      const particles: Particle[] = [];
      const particleCount = 30;
      
      // Configure canvas dimensions with device pixel ratio for sharper rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      context.scale(dpr, dpr);
      
      // Create particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 1,
          color: `rgba(244, 117, 96, ${Math.random() * 0.5 + 0.3})`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacitySpeed: Math.random() * 0.01
        });
      }
      
      // Animation
      function animate() {
        context.clearRect(0, 0, width, height);
        
        // Draw and update particles
        particles.forEach(particle => {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fillStyle = particle.color;
          context.fill();
          
          // Move particle
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > width) {
            particle.speedX = -particle.speedX;
          }
          
          if (particle.y < 0 || particle.y > height) {
            particle.speedY = -particle.speedY;
          }
        });
        
        requestAnimationFrame(animate);
      }
      
      return requestAnimationFrame(animate);
    };
    
    // Start the animation
    const animationId = renderParticles();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [width, height]);
  
  return (
    <div className="relative flex items-center" style={{ width, height }}>
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ width, height }}
      />
      <div className="flex items-center z-10 relative">
        <div className="rounded-md overflow-hidden flex items-center justify-center mr-2" 
             style={{ width: logoSize, height: logoSize }}>
          <Image 
            src="/sonar-icon.png" 
            alt="SONAR Logo" 
            width={logoSize}
            height={logoSize}
            className="object-contain"
          />
        </div>
        <span className="sonar-logo-text" style={{ fontSize: `${logoSize/2}px` }}>
          SONAR
        </span>
      </div>
    </div>
  );
} 