import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/fredoka/latin-400.css';
import '@fontsource/fredoka/latin-500.css';
import '@fontsource/nunito/latin-400.css';
import '@fontsource/nunito/latin-600.css';
import '@fontsource/nunito/latin-700.css';
import '@fontsource/nunito/latin-800.css';
import '@fontsource/nunito/vietnamese-400.css';
import '@fontsource/nunito/vietnamese-600.css';
import '@fontsource/nunito/vietnamese-700.css';
import '@fontsource/nunito/vietnamese-800.css';
import './styles/globals.css';
import './styles/ocean-mode.css';
import App from './App';
import { LanguageProvider } from './hooks/useLanguage';
import './styles/language.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
