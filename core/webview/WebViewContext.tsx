import React, { createContext, useState, useContext, ReactNode } from 'react';

type WebViewContextType = {
  url: string | null;
  isVisible: boolean;
  openWebView: (url: string) => void;
  closeWebView: () => void;
};

const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export const WebViewProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const openWebView = (newUrl: string) => {
    setUrl(newUrl);
    setIsVisible(true);
  };

  const closeWebView = () => {
    setUrl(null);
    setIsVisible(false);
  };

  return (
    <WebViewContext.Provider value={{ url, isVisible, openWebView, closeWebView }}>
      {children}
    </WebViewContext.Provider>
  );
};

export const useWebView = () => {
  const context = useContext(WebViewContext);
  if (!context) {
    throw new Error('useWebView must be used within a WebViewProvider');
  }
  return context;
};
