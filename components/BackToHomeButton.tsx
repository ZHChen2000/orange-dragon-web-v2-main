import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BackToHomeButton() {
  return (
    <motion.div
      className="mt-12"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href="/" 
        className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-600 hover:to-yellow-500"
      >
        <svg 
          className="w-5 h-5 mr-2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
          />
        </svg>
        返回首页
      </Link>
    </motion.div>
  );
} 