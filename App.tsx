import React from 'react';
import { Provider} from 'react-redux';
import { store } from './store/store';
import Router from './core/navigation/Router';
import  './core/services/locales/localisation';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
import  './core/services/locales/localisation';
import { WebViewProvider } from './core/webview/WebViewContext';
import FullScreenWebView from './core/components/webview/FullScreenWebView';

export default function App() {
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <WebViewProvider>
                <Router />
                <FullScreenWebView />
        </WebViewProvider>
      </QueryClientProvider>
    </Provider>
  );
}
