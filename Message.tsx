import React, { useState } from 'react';
import { Bookmark, ThumbsUp, Copy, Check } from 'lucide-react';
import { MessageType } from '../../types/chat';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const isBot = message.sender === 'bot';
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleBookmark = () => setIsBookmarked(!isBookmarked);
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className={`flex items-start space-x-3 group ${isBot ? '' : 'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-white">
          AI
        </div>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isBot ? '' : 'items-end'}`}>
        <div 
          className={`px-4 py-3 rounded-lg ${
            isBot 
              ? 'bg-gray-100 dark:bg-gray-700 rounded-tl-none text-gray-800 dark:text-gray-200' 
              : 'bg-indigo-600 text-white rounded-tr-none'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.text}</p>
          
          {message.source && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Source: {message.source}
              </p>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-1 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 dark:text-gray-400">
          <span className="text-xs">{message.timestamp}</span>
          
          {isBot && (
            <>
              <button 
                onClick={toggleLike} 
                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${isLiked ? 'text-green-500' : ''}`}
                aria-label="Like message"
              >
                <ThumbsUp size={14} />
              </button>
              
              <button 
                onClick={toggleBookmark} 
                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${isBookmarked ? 'text-amber-500' : ''}`}
                aria-label="Bookmark message"
              >
                <Bookmark size={14} />
              </button>
              
              <button 
                onClick={copyToClipboard} 
                className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${isCopied ? 'text-blue-500' : ''}`}
                aria-label="Copy message"
              >
                {isCopied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </>
          )}
        </div>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center text-gray-700 dark:text-gray-300">
          You
        </div>
      )}
    </div>
  );
};

export default Message;