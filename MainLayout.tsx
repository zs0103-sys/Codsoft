import React, { useState } from 'react';
import Header from '../Header/Header';
import ChatLayout from './ChatLayout';
import { Sun, Moon } from 'lucide-react';

const MainLayout: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      <main className="flex-1 container mx-auto px-4 py-2 md:py-4 max-w-5xl">
        <ChatLayout />
      </main>
      <button 
        onClick={toggleDarkMode} 
        className="fixed bottom-5 right-5 p-3 rounded-full shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all hover:shadow-xl"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default MainLayout;