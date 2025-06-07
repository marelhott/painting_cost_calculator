// src/pages/embeddable-calculator-widget/components/CostSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CostSummary = ({ calculatedCost, calculatedArea, paintLiters, translations }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mt-4 bg-accent bg-opacity-10 p-4 rounded-lg border border-accent border-opacity-20">
      <div className="flex items-center mb-3">
        <Icon name="Calculator" size={18} className="mr-2 text-accent" />
        <h3 className="text-sm font-medium">{translations.results}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">{translations.totalArea}</div>
          <div className="flex items-baseline">
            <motion.span 
              key={calculatedArea}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-lg font-medium"
            >
              {calculatedArea.toFixed(1)}
            </motion.span>
            <span className="text-xs text-gray-500 ml-1">{translations.squareMeters}</span>
          </div>
        </div>
        
        <div className="bg-white p-3 rounded border border-gray-200">
          <div className="text-xs text-gray-500 mb-1">{translations.paintNeeded}</div>
          <div className="flex items-baseline">
            <motion.span 
              key={paintLiters}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-lg font-medium"
            >
              {paintLiters}
            </motion.span>
            <span className="text-xs text-gray-500 ml-1">{translations.liters}</span>
          </div>
        </div>
        
        <div className="bg-accent bg-opacity-20 p-3 rounded border border-accent border-opacity-30">
          <div className="text-xs text-gray-700 mb-1">{translations.estimatedCost}</div>
          <motion.div 
            key={calculatedCost}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold text-accent"
          >
            {calculatedCost > 0 ? formatCurrency(calculatedCost) : '-'}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;