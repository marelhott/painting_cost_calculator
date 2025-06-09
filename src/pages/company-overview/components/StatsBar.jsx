// src/pages/company-overview/components/StatsBar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StatsBar = () => {
  const stats = [
    {
      number: '+500',
      label: 'úspěšných zakázek'
    },
    {
      number: '+300',
      label: 'bytů a domů'
    },
    {
      number: '+200',
      label: 'firemních a obchodních prostor'
    },
    {
      number: '30',
      label: 'let zkušeností'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-accent py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-2 relative ${
                index < stats.length - 1 ? 'lg:border-r lg:border-white' : ''
              }`}
            >
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-3xl md:text-4xl font-bold text-white"
              >
                {stat.number}
              </motion.h3>
              <p className="text-white font-medium text-sm md:text-base px-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsBar;