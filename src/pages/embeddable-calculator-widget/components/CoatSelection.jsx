// src/pages/embeddable-calculator-widget/components/CoatSelection.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const CoatSelection = ({ formData, onInputChange, translations }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center mb-3">
        <Icon name="Layers" size={18} className="mr-2 text-accent" />
        <h3 className="text-sm font-medium">{translations.coats}</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onInputChange('coatCount', Math.max(1, formData.coatCount - 1))}
          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
          aria-label="Decrease"
        >
          <Icon name="Minus" size={16} />
        </button>
        
        <div className="px-4 py-2 bg-white border border-gray-200 rounded-md text-center min-w-[3rem]">
          <span className="text-lg font-medium">{formData.coatCount}</span>
        </div>
        
        <button 
          onClick={() => onInputChange('coatCount', formData.coatCount + 1)}
          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
          aria-label="Increase"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
    </div>
  );
};

export default CoatSelection;