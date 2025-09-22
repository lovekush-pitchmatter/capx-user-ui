import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WagmiProvider } from 'wagmi' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from './config/wagmi';
const queryClient = new QueryClient() 
import './i18n';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

createRoot(document.getElementById("root")!).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <I18nextProvider i18n={i18n}>
                <App />
            </I18nextProvider>
        </QueryClientProvider>
    </WagmiProvider>
);
