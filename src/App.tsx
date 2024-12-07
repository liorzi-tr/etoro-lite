import React from "react";
import { Provider } from "react-redux";
import "./core/services/locales/localisation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./navigation/navigators/RootNavigator";
import { store } from "./store/store";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RootNavigator />
      </QueryClientProvider>
    </Provider>
  );
}
