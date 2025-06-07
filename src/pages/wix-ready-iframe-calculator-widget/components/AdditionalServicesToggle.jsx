// src/pages/wix-ready-iframe-calculator-widget/components/AdditionalServicesToggle.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const AdditionalServicesToggle = ({ formData, onInputChange, wixTheme }) => {
  const services = [
    { 
      id: 'surfacePreparation', 
      name: 'Příprava povrchu', 
      description: 'Vyspravení děr, škrábání, broušení apod.',
      icon: 'Wrench' 
    },
    { 
      id: 'furnitureMoving', 
      name: 'Přesun nábytku', 
      description: 'Manipulace s nábytkem před a po malování',
      icon: 'Move' 
    },
    { 
      id: 'cleanup', 
      name: 'Úklid po malování', 
      description: 'Odstranění ochranných materiálů a úklid prachu',
      icon: 'Broom' 
    }
  ];

  return (
    <div className="wix-panel">
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <Icon 
          name="Settings" 
          size={16} 
          style={{ 
            marginRight: '8px', 
            color: wixTheme.accentColor 
          }} 
        />
        <span style={{ fontWeight: 500, fontSize: '14px' }}>Doplňkové služby</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {services.map((service) => (
          <div 
            key={service.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              border: `1px solid ${wixTheme.borderColor}`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Icon 
                name={service.icon} 
                size={14} 
                style={{ marginRight: '8px', color: 'var(--wix-secondary-text)' }} 
              />
              <div>
                <div style={{ fontSize: '13px' }}>{service.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--wix-secondary-text)' }}>{service.description}</div>
              </div>
            </div>
            
            <label className="wix-switch">
              <input
                type="checkbox"
                checked={formData[service.id]}
                onChange={(e) => onInputChange(service.id, e.target.checked)}
              />
              <span className="wix-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalServicesToggle;