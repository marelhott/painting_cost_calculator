// src/pages/embeddable-calculator-widget/components/RoomDimensionsInput.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const RoomDimensionsInput = ({ formData, onInputChange, translations }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center mb-3">
        <Icon name="Box" size={18} className="mr-2 text-accent" />
        <h3 className="text-sm font-medium">{translations.dimensions}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {translations.width} ({translations.meterUnit})
          </label>
          <input
            type="number"
            value={formData.roomWidth}
            onChange={(e) => onInputChange('roomWidth', e.target.value)}
            min="0.1"
            step="0.1"
            className="form-input"
            placeholder="3.5"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {translations.length} ({translations.meterUnit})
          </label>
          <input
            type="number"
            value={formData.roomLength}
            onChange={(e) => onInputChange('roomLength', e.target.value)}
            min="0.1"
            step="0.1"
            className="form-input"
            placeholder="4.0"
          />
        </div>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            {translations.height} ({translations.meterUnit})
          </label>
          <input
            type="number"
            value={formData.roomHeight}
            onChange={(e) => onInputChange('roomHeight', e.target.value)}
            min="0.1"
            step="0.1"
            className="form-input"
            placeholder="2.7"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.wallsOnly}
            onChange={(e) => onInputChange('wallsOnly', e.target.checked)}
            className="sr-only"
          />
          <div className={`relative w-10 h-5 rounded-full transition-colors ${formData.wallsOnly ? 'bg-accent' : 'bg-gray-300'}`}>
            <div 
              className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform transform ${formData.wallsOnly ? 'translate-x-5' : ''}`}
            ></div>
          </div>
          <span className="ml-2 text-xs font-medium">
            {formData.wallsOnly ? translations.wallsOnly : translations.includeCeiling}
          </span>
        </label>
      </div>
    </div>
  );
};

export default RoomDimensionsInput;