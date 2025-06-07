// src/pages/embeddable-calculator-widget/components/ColorSelection.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const ColorSelection = ({ formData, onInputChange, translations }) => {
  const colorTypes = [
    { id: 'standard', name: translations.standard, icon: 'Circle', description: '' },
    { id: 'premium', name: translations.premium, icon: 'Circle', description: '' },
    { id: 'specialized', name: translations.specialized, icon: 'Circle', description: '' }
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center mb-3">
        <Icon name="Palette" size={18} className="mr-2 text-accent" />
        <h3 className="text-sm font-medium">{translations.colorType}</h3>
      </div>
      
      <div className="space-y-2">
        {colorTypes.map((type) => (
          <label 
            key={type.id} 
            className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${formData.colorType === type.id ? 'bg-accent bg-opacity-10 border border-accent' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
          >
            <input
              type="radio"
              name="colorType"
              value={type.id}
              checked={formData.colorType === type.id}
              onChange={() => onInputChange('colorType', type.id)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full mr-2 flex items-center justify-center ${formData.colorType === type.id ? 'bg-accent' : 'border border-gray-300'}`}>
              {formData.colorType === type.id && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-xs font-medium">{type.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;