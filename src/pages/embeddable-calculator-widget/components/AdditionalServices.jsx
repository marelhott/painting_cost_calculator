// src/pages/embeddable-calculator-widget/components/AdditionalServices.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const AdditionalServices = ({ formData, onInputChange, translations }) => {
  const services = [
    { id: 'needsSurfacePrep', name: translations.surfacePrep, icon: 'Wrench' },
    { id: 'needsFurnitureMove', name: translations.furnitureMove, icon: 'MoveHorizontal' },
    { id: 'needsCleanup', name: translations.cleanup, icon: 'Trash2' }
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex items-center mb-3">
        <Icon name="Settings" size={18} className="mr-2 text-accent" />
        <h3 className="text-sm font-medium">{translations.additionalServices}</h3>
      </div>
      
      <div className="space-y-2">
        {services.map((service) => (
          <label key={service.id} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
            <div className="flex items-center">
              <Icon name={service.icon} size={14} className="mr-2 text-gray-500" />
              <span className="text-xs">{service.name}</span>
            </div>
            
            <div className="relative">
              <input
                type="checkbox"
                checked={formData[service.id]}
                onChange={(e) => onInputChange(service.id, e.target.checked)}
                className="sr-only"
              />
              <div className={`w-8 h-4 rounded-full transition-colors ${formData[service.id] ? 'bg-accent' : 'bg-gray-300'}`}>
                <div 
                  className={`absolute w-3 h-3 bg-white rounded-full top-0.5 transition-transform transform ${formData[service.id] ? 'right-0.5' : 'left-0.5'}`}
                ></div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServices;