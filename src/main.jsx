import { StrictMode } from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from './App.jsx'

import { system } from './theme.js'; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
    },
  },
});


createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
  </QueryClientProvider>
);