// src/pages/wix-ready-iframe-calculator-widget/components/PaintTypeSelector.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const PaintTypeSelector = ({ formData, onInputChange, wixTheme }) => {
  const paintTypes = [
    { id: 'standard', name: 'Standardní', description: 'Běžná interiérová barva' },
    { id: 'premium', name: 'Prémiová', description: 'Vyšší kvalita a životnost' },
    { id: 'washable', name: 'Omyvatelná', description: 'Vhodná pro kuchyně a chodby' },
    { id: 'specialized', name: 'Speciální', description: 'Antibakteriální, protiplísňová apod.' }
  ];

  return (
    <div className="wix-panel">
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <Icon 
          name="Palette" 
          size={16} 
          style={{ 
            marginRight: '8px', 
            color: wixTheme.accentColor 
          }} 
        />
        <span style={{ fontWeight: 500, fontSize: '14px' }}>Typ barvy</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {paintTypes.map((type) => (
          <label 
            key={type.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              backgroundColor: formData.paintType === type.id ? `rgba(${parseInt(wixTheme.accentColor.slice(1, 3), 16)}, ${parseInt(wixTheme.accentColor.slice(3, 5), 16)}, ${parseInt(wixTheme.accentColor.slice(5, 7), 16)}, 0.1)` : '#FFFFFF',
              border: `1px solid ${formData.paintType === type.id ? wixTheme.accentColor : wixTheme.borderColor}`
            }}
          >
            <input
              type="radio"
              name="paintType"
              value={type.id}
              checked={formData.paintType === type.id}
              onChange={() => onInputChange('paintType', type.id)}
              style={{ marginRight: '8px' }}
            />
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{type.name}</div>
              <div style={{ fontSize: '11px', color: 'var(--wix-secondary-text)' }}>{type.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaintTypeSelector;