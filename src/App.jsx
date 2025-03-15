import React, { useState, useEffect, useCallback, createContext, useContext, Suspense, lazy } from 'react';
import { ConfigProvider, theme } from 'antd';
import './styles/main.css';
import './styles/App.css';

const MapComponent = lazy(() => import('./components/Map/MapComponent'));

import { lightTheme, darkTheme } from './theme';

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  };

  const [themeMode, setThemeMode] = useState(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('themeMode', newTheme);
  }, [themeMode]);

  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setThemeMode(newTheme);
      localStorage.setItem('themeMode', newTheme);
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  const currentThemeConfig = themeMode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm;
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, currentTheme }}>
      <ConfigProvider theme={{ algorithm: currentThemeConfig }}>
        <Suspense fallback={<div>Loading...</div>}>
          <MapComponent />
        </Suspense>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export default App;
