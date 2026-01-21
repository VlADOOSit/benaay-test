import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { languageStorageKey } from './utils/i18n';
import HomePage from './pages/HomePage/HomePage.jsx';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem(languageStorageKey, language);
  }, [i18n.language]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
