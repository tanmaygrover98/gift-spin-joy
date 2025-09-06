import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CongratulationsPopupProps {
  isOpen: boolean;
  prize: string;
  onTryAgain: () => void;
}

const prizeMap: Record<string, string> = {
  'Under 100': 'Pen',
  'Under 200': 'Diary',
  'Under 500': 'Gift Card',
  'Under 1000': 'Headphones',
  'Under 2000': 'Watch'
};

export const CongratulationsPopup: React.FC<CongratulationsPopupProps> = ({ 
  isOpen, 
  prize, 
  onTryAgain 
}) => {
  const giftItem = prizeMap[prize];

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md animate-bounce-in">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            🎉 Congratulations! 🎉
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-6 text-center">
          <div className="animate-celebrate">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-xl font-semibold mb-2">You won:</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-primary to-wheel-segment5 bg-clip-text text-transparent">
              {giftItem}
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Category: {prize}
            </p>
            <Button 
              onClick={onTryAgain}
              className="w-full bg-gradient-to-r from-wheel-segment3 to-wheel-segment4 hover:from-wheel-segment3/90 hover:to-wheel-segment4/90 text-white font-bold py-3 text-lg rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
            >
              Try Again
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};