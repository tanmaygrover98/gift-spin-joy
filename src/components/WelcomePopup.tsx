import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface WelcomePopupProps {
  isOpen: boolean;
  onSubmit: (selectedItem: string) => void;
}

export const purchaseItems = [
  "iPhone 16 Pro 256GB: 712345678905",
  "Samsung S25 Ultra 256GB: 754321098768",
  "LG Washing Machine WM3500HWA: 811223344557",
  "Audio-Technica Headphones ATH-M50x: 049613 000546",
  "Sony WH-1000XM6 Headphones: 027242925349",
  "Dyson Hair Straightener: 884622000191",
  "Braun Beard Trimmer 7: 0 69055 88912 4",
  "Philips Trimmer Series 7000: 076352900213",
];

// Prize pools for each purchase item
export const itemPrizeMap: Record<string, Array<{label: string, prize: string, color: string}>> = {
  "iPhone 16 Pro 256GB: 712345678905": [
    { label: "Premium Gift", prize: "Wireless Charger", color: "#ff6b6b" },
    { label: "Tech Bundle", prize: "Phone Case + Screen Protector", color: "#4ecdc4" },
    { label: "Audio Set", prize: "AirPods Pro", color: "#45b7d1" },
    { label: "Power Pack", prize: "Power Bank 20000mAh", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "iPad Mini", color: "#feca57" },
  ],
  "Samsung S25 Ultra 256GB: 754321098768": [
    { label: "Galaxy Bundle", prize: "Galaxy Buds Pro", color: "#ff6b6b" },
    { label: "Mobile Kit", prize: "S Pen Case", color: "#4ecdc4" },
    { label: "Power Bundle", prize: "Wireless Charging Stand", color: "#45b7d1" },
    { label: "Premium Set", prize: "Galaxy Watch SE", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Galaxy Tab A9+", color: "#feca57" },
  ],
  "LG Washing Machine WM3500HWA: 811223344557": [
    { label: "Home Care", prize: "Laundry Detergent Set", color: "#ff6b6b" },
    { label: "Clean Bundle", prize: "Fabric Softener Pack", color: "#4ecdc4" },
    { label: "Care Package", prize: "Stain Remover Kit", color: "#45b7d1" },
    { label: "Premium Clean", prize: "Steam Iron", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Robot Vacuum", color: "#feca57" },
  ],
  "Audio-Technica Headphones ATH-M50x: 049613 000546": [
    { label: "Audio Basic", prize: "Cable Set", color: "#ff6b6b" },
    { label: "Sound Kit", prize: "Headphone Stand", color: "#4ecdc4" },
    { label: "Pro Audio", prize: "Audio Interface", color: "#45b7d1" },
    { label: "Studio Set", prize: "Condenser Microphone", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Studio Monitors", color: "#feca57" },
  ],
  "Sony WH-1000XM6 Headphones: 027242925349": [
    { label: "Sony Bundle", prize: "Carrying Case", color: "#ff6b6b" },
    { label: "Travel Kit", prize: "Airplane Adapter", color: "#4ecdc4" },
    { label: "Sound Pack", prize: "Audio Cable", color: "#45b7d1" },
    { label: "Premium Set", prize: "Sony Earbuds", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Sony Speaker", color: "#feca57" },
  ],
  "Dyson Hair Straightener: 884622000191": [
    { label: "Hair Care", prize: "Heat Protectant Spray", color: "#ff6b6b" },
    { label: "Style Kit", prize: "Hair Brush Set", color: "#4ecdc4" },
    { label: "Beauty Pack", prize: "Hair Serum Collection", color: "#45b7d1" },
    { label: "Premium Style", prize: "Hair Dryer", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Dyson Airwrap", color: "#feca57" },
  ],
  "Braun Beard Trimmer 7: 0 69055 88912 4": [
    { label: "Grooming Basic", prize: "Beard Oil", color: "#ff6b6b" },
    { label: "Care Kit", prize: "Beard Comb Set", color: "#4ecdc4" },
    { label: "Style Pack", prize: "Grooming Scissors", color: "#45b7d1" },
    { label: "Premium Care", prize: "Electric Shaver", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Complete Grooming Kit", color: "#feca57" },
  ],
  "Philips Trimmer Series 7000: 076352900213": [
    { label: "Trimmer Basic", prize: "Replacement Blades", color: "#ff6b6b" },
    { label: "Grooming Set", prize: "Cleaning Brush", color: "#4ecdc4" },
    { label: "Care Bundle", prize: "Trimmer Oil", color: "#45b7d1" },
    { label: "Premium Kit", prize: "Multi-Groomer", color: "#96ceb4" },
    { label: "Ultimate Prize", prize: "Philips OneBlade Pro", color: "#feca57" },
  ],
};

export const WelcomePopup: React.FC<WelcomePopupProps> = ({
  isOpen,
  onSubmit,
}) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleSubmit = () => {
    if (selectedItem) {
      onSubmit(selectedItem);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md animate-bounce-in">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#023183] to-[#023183] bg-clip-text text-transparent">
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
            className="w-full bg-gradient-to-r from-[#023183] to-[#023183] hover:from-[#d42f14] hover:to-[#d42f14] text-white font-bold py-3 text-lg rounded-lg shadow-lg transition-all ease-out duration-300 hover:scale-105"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
