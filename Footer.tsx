import React from 'react';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} FilmFinder - A movie recommendation system
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="View source code on GitHub"
            >
              <Github size={20} />
            </a>
            <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
              Made with <Heart size={16} className="mx-1 text-red-500" /> in 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;