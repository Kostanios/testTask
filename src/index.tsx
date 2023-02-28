import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from 'react-query'

import './index.css';
import App from './components/App/App';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
          <StyledEngineProvider injectFirst>
             <App />
          </StyledEngineProvider>
      </QueryClientProvider>
  </React.StrictMode>
);

