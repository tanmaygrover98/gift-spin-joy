import React, { useState, useEffect } from 'react';
import { SpinWheel } from '@/components/SpinWheel';
import { WelcomePopup } from '@/components/WelcomePopup';
import { CongratulationsPopup } from '@/components/CongratulationsPopup';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prize, setPrize] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleWelcomeSubmit = (selectedItem: string) => {
    setHasSubmitted(true);
    setShowWelcome(false);
  };

  const handleSpinStart = () => {
    setIsSpinning(true);
  };

  const handleSpinComplete = (result: string) => {
    setIsSpinning(false);
    setPrize(result);
    setShowCongratulations(true);
  };

  const handleTryAgain = () => {
    setShowCongratulations(false);
    setPrize('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wheel-segment2/10 to-wheel-segment5/10 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-wheel-segment4 to-wheel-segment5 bg-clip-text text-transparent mb-4">
          Spin & Win
        </h1>
        <p className="text-xl text-muted-foreground">
          Test your luck and win amazing prizes!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        {hasSubmitted ? (
          <SpinWheel
            onSpinComplete={handleSpinComplete}
            isSpinning={isSpinning}
            onSpinStart={handleSpinStart}
          />
        ) : (
          <div className="text-center">
            <div className="w-80 h-80 rounded-full bg-gradient-to-r from-muted to-accent/50 flex items-center justify-center shadow-2xl border-8 border-border">
              <div className="text-2xl font-bold text-muted-foreground">
                Complete the form to start spinning!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Popups */}
      <WelcomePopup 
        isOpen={showWelcome} 
        onSubmit={handleWelcomeSubmit} 
      />
      <CongratulationsPopup
        isOpen={showCongratulations}
        prize={prize}
        onTryAgain={handleTryAgain}
      />
    </div>
  );
};

export default Index;
