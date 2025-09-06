import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SpinWheelProps {
  onSpinComplete: (result: string) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

const segments = [
  { label: 'Under 100', color: 'hsl(var(--wheel-segment-1))' },
  { label: 'Under 200', color: 'hsl(var(--wheel-segment-2))' },
  { label: 'Under 500', color: 'hsl(var(--wheel-segment-3))' },
  { label: 'Under 1000', color: 'hsl(var(--wheel-segment-4))' },
  { label: 'Under 2000', color: 'hsl(var(--wheel-segment-5))' },
];

export const SpinWheel: React.FC<SpinWheelProps> = ({ onSpinComplete, isSpinning, onSpinStart }) => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    
    onSpinStart();
    
    // Random rotation between 1800 and 3600 degrees (5-10 full rotations)
    const randomRotation = 1800 + Math.random() * 1800;
    const finalRotation = rotation + randomRotation;
    
    setRotation(finalRotation);
    
    // Calculate which segment we landed on
    const normalizedRotation = (finalRotation % 360);
    const segmentAngle = 360 / segments.length; // 72 degrees per segment
    
    // Determine winning segment (accounting for the pointer at the top)
    let winningSegmentIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % segments.length;
    
    // Delay to match animation duration
    setTimeout(() => {
      onSpinComplete(segments[winningSegmentIndex].label);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[30px] border-l-transparent border-r-transparent border-b-foreground drop-shadow-lg"></div>
        </div>
        
        {/* Wheel */}
        <div 
          className={cn(
            "w-80 h-80 rounded-full relative overflow-hidden shadow-2xl border-8 border-foreground",
            isSpinning && "animate-wheel-spin"
          )}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 3s cubic-bezier(0.23, 1, 0.320, 1)' : 'none'
          }}
        >
          {segments.map((segment, index) => {
            const angle = (360 / segments.length) * index;
            const nextAngle = (360 / segments.length) * (index + 1);
            
            return (
              <div
                key={index}
                className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg"
                style={{
                  background: `conic-gradient(from ${angle}deg, ${segment.color} 0deg, ${segment.color} ${360 / segments.length}deg, transparent ${360 / segments.length}deg)`,
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                }}
              >
                <span 
                  className="absolute transform -translate-y-20 text-center px-2 drop-shadow-lg"
                  style={{
                    transform: `rotate(${angle + 36}deg) translateY(-100px)`,
                    transformOrigin: '50% 100px'
                  }}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
          
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-foreground rounded-full shadow-lg border-4 border-background"></div>
        </div>
      </div>
      
      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={cn(
          "px-8 py-4 bg-primary text-primary-foreground font-bold text-xl rounded-full shadow-lg transition-all duration-200",
          "hover:scale-105 hover:shadow-xl active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          "border-2 border-primary-foreground/20"
        )}
      >
        {isSpinning ? 'Spinning...' : 'Spin Now!'}
      </button>
    </div>
  );
};