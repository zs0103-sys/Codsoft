import React, { createContext, useContext, useState } from 'react';
import { MessageType, SubjectType } from '../types/chat';
import { subjects } from '../data/subjects';
import { getKnowledgeBaseAnswer } from '../services/knowledgeBase';

interface ChatContextType {
  messages: MessageType[];
  sendMessage: (text: string) => void;
  isLoading: boolean;
  subjects: SubjectType[];
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>(subjects[0]);

  const formatTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (text: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: formatTime(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Simulate network delay
      const response = await getKnowledgeBaseAnswer(text, selectedSubject.id);
      
      // Add bot response
      setTimeout(() => {
        const botMessage: MessageType = {
          id: (Date.now() + 1).toString(),
          text: response.answer,
          sender: 'bot',
          timestamp: formatTime(),
          source: response.source,
        };
        
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      console.error('Error getting answer:', error);
      
      // Add error message
      const errorMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: formatTime(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSubjectChange = (subject: SubjectType) => {
    setSelectedSubject(subject);
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        isLoading,
        subjects,
        selectedSubject,
        setSelectedSubject: handleSubjectChange,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;