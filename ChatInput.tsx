import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { Send } from 'lucide-react';

const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isLoading } = useChat();

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newRows = Math.min(5, Math.max(1, Math.ceil(textarea.scrollHeight / 24)));
      setRows(newRows);
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput('');
      setRows(1);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="Ask a question..."
            className="w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 pr-12 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            style={{ minHeight: '48px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute bottom-2 right-2 p-2 rounded-full transition-colors ${
              !input.trim() || isLoading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-indigo-600 hover:bg-indigo-100 dark:text-indigo-400 dark:hover:bg-gray-600'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        Questions are processed using AI and may not always be accurate. Verify important information.
      </div>
    </div>
  );
};

export default ChatInput;