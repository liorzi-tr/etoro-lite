import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Router from "./core/navigation/Router";
import "./core/services/locales/localisation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>
  );
}
