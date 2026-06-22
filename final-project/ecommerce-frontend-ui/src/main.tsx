import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/providers/query-client.ts";
import AuthProvider from "./app/providers/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render!(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>,
);
