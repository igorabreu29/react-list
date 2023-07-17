import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';

import App from './App';
import { ListContextProvider } from './context/ListContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ListContextProvider>
      <App />
    </ListContextProvider>
  </StrictMode>
);
