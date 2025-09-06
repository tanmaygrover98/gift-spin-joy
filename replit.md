# Overview

This is a React-based "Spin the Wheel" game application built with TypeScript, Vite, and shadcn/ui components. The application allows users to select a purchased item and then spin a wheel to win prizes based on different price ranges. The wheel includes segments for "Under 100", "Under 200", "Under 500", "Under 1000", and "Under 2000", with corresponding physical prizes like pens, diaries, gift cards, headphones, and watches.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component development
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: shadcn/ui components built on top of Radix UI primitives for accessible and customizable interface elements
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **Routing**: React Router for client-side navigation with basic routing structure

## Component Structure
- **Modular Components**: Three main interactive components (WelcomePopup, SpinWheel, CongratulationsPopup) handle the complete user flow
- **UI Components**: Extensive shadcn/ui component library providing buttons, dialogs, selects, and other interface elements
- **State Management**: React hooks (useState, useEffect) for local component state management
- **Custom Hooks**: useIsMobile hook for responsive behavior detection

## Animation and Interactions
- **Wheel Physics**: CSS transforms and transitions create realistic spinning wheel animation with randomized rotation
- **Visual Feedback**: Bounce-in animations, gradient backgrounds, and emoji celebrations enhance user experience
- **Responsive Design**: Mobile-first approach with adaptive layouts and touch-friendly interactions

## Data Flow
- **Prize Logic**: Hardcoded mapping between wheel segments and physical prizes (e.g., "Under 100" → "Pen")
- **Purchase Items**: Predefined list of electronic items with model numbers for user selection
- **Random Selection**: Mathematical calculation determines winning segment based on final wheel rotation

## External Dependencies

- **@radix-ui/***: Accessible UI primitive components for dialogs, selects, buttons, and other interactive elements
- **@tanstack/react-query**: Data fetching and state management (configured but not actively used)
- **lucide-react**: Icon library for consistent iconography
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Type-safe variant API for component styling
- **react-router-dom**: Client-side routing solution
- **next-themes**: Theme management system for light/dark mode support
- **sonner**: Toast notification system for user feedback

The application is designed as a promotional tool where users can spin a wheel to win prizes corresponding to their purchase amount range, with all logic handled client-side and no backend dependencies.