import React, { createContext, useContext, ReactNode } from 'react';

// Define the context
const DisplayedColumnsContext = createContext<string[]>([]);

// Create a provider component
export const DisplayedColumnsProvider = ({ children, columns }: { children: ReactNode, columns: string[] }) => {
  return (
    <DisplayedColumnsContext.Provider value={columns}>
      {children}
    </DisplayedColumnsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useDisplayedColumns = () => {
  return useContext(DisplayedColumnsContext);
};