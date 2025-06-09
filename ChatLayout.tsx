import React from 'react';
import ChatInterface from '../ChatInterface/ChatInterface';
import SubjectSelector from '../Header/SubjectSelector';
import { useChat } from '../../context/ChatContext';

const ChatLayout: React.FC = () => {
  const { selectedSubject } = useChat();

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-140px)]">
      <div className="mb-4">
        <SubjectSelector />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md flex-1 flex flex-col overflow-hidden transition-colors duration-200">
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
            {selectedSubject.name} Tutor
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask questions about {selectedSubject.name.toLowerCase()} concepts, problems, or examples
          </p>
        </div>
        
        <ChatInterface />
      </div>
    </div>
  );
};

export default ChatLayout;