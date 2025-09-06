import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SpinWheelProps {
  onSpinComplete: (result: string) => void;
  isSpinning: boolean;
  onSpinStart: () => void;
}

const segments = [
  { label: "Under 100", color: "#ff6b6b" }, // Red-orange
  { label: "Under 200", color: "#4ecdc4" }, // Teal
  { label: "Under 500", color: "#45b7d1" }, // Blue
  { label: "Under 1000", color: "#96ceb4" }, // Green
  { label: "Under 2000", color: "#feca57" }, // Yellow
];

export const SpinWheel: React.FC<SpinWheelProps> = ({
  onSpinComplete,
  isSpinning,
  onSpinStart,
}) => {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;

    onSpinStart();

    // Random rotation between 1800 and 3600 degrees (5-10 full rotations)
    const randomRotation = 1800 + Math.random() * 1800;
    const finalRotation = rotation + randomRotation;

    setRotation(finalRotation);

    // Calculate which segment we landed on
    const normalizedRotation = finalRotation % 360;
    const segmentAngle = 360 / segments.length; // 72 degrees per segment

    // Determine winning segment (accounting for the pointer at the top)
    let winningSegmentIndex =
      Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) %
      segments.length;

    // Delay to match animation duration
    setTimeout(() => {
      onSpinComplete(segments[winningSegmentIndex].label);
    }, 3000);
  };

  const createSegmentPath = (index: number) => {
    const segmentAngle = 360 / segments.length;
    const startAngle = index * segmentAngle;
    const endAngle = (index + 1) * segmentAngle;

    const startAngleRad = ((startAngle - 90) * Math.PI) / 180;
    const endAngleRad = ((endAngle - 90) * Math.PI) / 180;

    const radius = 150; // Half of wheel width (300px / 2)
    const centerX = 150;
    const centerY = 150;

    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);

    const largeArcFlag = segmentAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index: number) => {
    const segmentAngle = 360 / segments.length;
    const midAngle =
      ((index * segmentAngle + segmentAngle / 2 - 90) * Math.PI) / 180;
    const textRadius = 100; // Distance from center for text

    const x = 150 + textRadius * Math.cos(midAngle);
    const y = 150 + textRadius * Math.sin(midAngle);

    return { x, y, rotation: index * segmentAngle + segmentAngle / 2 };
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gray-800 drop-shadow-lg"></div>
        </div>

        {/* Wheel */}
        <div className="relative">
          <svg
            width="320"
            height="320"
            className={cn(
              "drop-shadow-2xl",
              isSpinning && "animate-wheel-spin",
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? "transform 3s cubic-bezier(0.23, 1, 0.320, 1)"
                : "none",
            }}
          >
            {/* Outer border circle */}
            <circle
              cx="160"
              cy="160"
              r="158"
              fill="none"
              stroke="#1f2937"
              strokeWidth="4"
            />

            {/* Segments */}
            {segments.map((segment, index) => (
              <g key={index}>
                <path
                  d={createSegmentPath(index)}
                  fill={segment.color}
                  stroke="#fff"
                  strokeWidth="2"
                  transform="translate(10, 10)"
                />
                <text
                  x={getTextPosition(index).x + 10}
                  y={getTextPosition(index).y + 15}
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="drop-shadow-lg select-none"
                  transform={`rotate(${getTextPosition(index).rotation > 90 && getTextPosition(index).rotation < 270 ? getTextPosition(index).rotation + 180 : getTextPosition(index).rotation}, ${getTextPosition(index).x + 10}, ${getTextPosition(index).y + 15})`}
                >
                  {segment.label}
                </text>
              </g>
            ))}

            {/* Center Circle */}
            <circle
              cx="160"
              cy="160"
              r="25"
              fill="#1f2937"
              stroke="#fff"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={cn(
          "px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-full shadow-lg transition-all duration-200",
          "hover:scale-105 hover:shadow-xl hover:bg-blue-700 active:scale-95",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-blue-600",
          "border-2 border-blue-200",
        )}
      >
        {isSpinning ? "Spinning..." : "Spin Now!"}
      </button>
    </div>
  );
};
