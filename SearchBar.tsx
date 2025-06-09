import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search for movies...',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div 
      className={`relative flex items-center overflow-hidden transition-all duration-300 ease-in-out rounded-full border ${
        isFocused 
          ? 'border-purple-500 shadow-sm ring-2 ring-purple-100 dark:ring-purple-900/30' 
          : 'border-gray-300 dark:border-gray-700'
      } bg-white dark:bg-gray-800`}
    >
      <div className="flex items-center justify-center pl-4">
        <Search 
          size={18} 
          className="text-gray-400 dark:text-gray-500"
        />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full py-2 px-3 bg-transparent border-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
      />
      
      {value && (
        <button
          onClick={handleClear}
          className="flex items-center justify-center p-2 mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Clear search"
        >
          <X size={18} className="text-gray-400 dark:text-gray-500" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;