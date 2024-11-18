// HeadingContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface HeadingContextType {
  heading: string;
  setHeading: (heading: string) => void;
}

const HeadingContext = createContext<HeadingContextType | undefined>(undefined);

export const HeadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heading, setHeading] = useState<string>('');

  return (
    <HeadingContext.Provider value={{ heading, setHeading }}>
      {children}
    </HeadingContext.Provider>
  );
};

export const useHeading = () => {
  const context = useContext(HeadingContext);
  if (!context) {
    throw new Error('useHeading must be used within a HeadingProvider');
  }
  return context;
};
