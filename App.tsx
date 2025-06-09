import React from 'react';
import MainLayout from './components/Layout/MainLayout';
import ChatProvider from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <MainLayout />
    </ChatProvider>
  );
}

export default App;