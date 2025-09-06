import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface WelcomePopupProps {
  isOpen: boolean;
  onSubmit: (selectedItem: string) => void;
}

const purchaseItems = [
  'iPhone 16 Pro 256GB: 712345678905',
  'Samsung S25 Ultra 256GB: 754321098768',
  'LG Washing Machine WM3500HWA: 811223344557',
  'Audio-Technica Headphones ATH-M50x: 049613 000546',
  'Sony WH-1000XM6 Headphones: 027242925349',
  'Dyson Hair Straightener: 884622000191',
  'Braun Beard Trimmer 7: 0 69055 88912 4',
  'Philips Trimmer Series 7000: 076352900213'
];

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onSubmit }) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleSubmit = () => {
    if (selectedItem) {
      onSubmit(selectedItem);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md animate-bounce-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-wheel-segment5 bg-clip-text text-transparent">
            Welcome to Spin the Wheel!
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-lg font-medium mb-4">What did you purchase?</p>
            <Select value={selectedItem} onValueChange={setSelectedItem}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                {purchaseItems.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedItem}
            className="w-full bg-gradient-to-r from-primary to-wheel-segment5 hover:from-primary/90 hover:to-wheel-segment5/90 text-white font-bold py-3 text-lg rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};