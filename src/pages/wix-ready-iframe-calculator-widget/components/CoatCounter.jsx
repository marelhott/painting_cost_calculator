// src/pages/wix-ready-iframe-calculator-widget/components/CoatCounter.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const CoatCounter = ({ formData, onInputChange, wixTheme }) => {
  return (
    <div className="wix-panel">
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <Icon 
          name="Layers" 
          size={16} 
          style={{ 
            marginRight: '8px', 
            color: wixTheme.accentColor 
          }} 
        />
        <span style={{ fontWeight: 500, fontSize: '14px' }}>Počet vrstev</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={() => onInputChange('coatCount', Math.max(1, formData.coatCount - 1))}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: `1px solid ${wixTheme.borderColor}`,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Snížit počet vrstev"
        >
          <Icon name="Minus" size={16} />
        </button>
        
        <div 
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: '#FFFFFF',
            border: `1px solid ${wixTheme.borderColor}`,
            fontWeight: 500,
            fontSize: '16px',
            minWidth: '40px',
            textAlign: 'center'
          }}
        >
          {formData.coatCount}
        </div>
        
        <button 
          onClick={() => onInputChange('coatCount', formData.coatCount + 1)}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: `1px solid ${wixTheme.borderColor}`,
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Zvýšit počet vrstev"
        >
          <Icon name="Plus" size={16} />
        </button>
      </div>
      
      <div style={{ marginTop: '8px', fontSize: '11px', color: 'var(--wix-secondary-text)', textAlign: 'center' }}>
        {formData.coatCount === 1 ? 'Jedna vrstva může být nedostatečná pro plné krytí' : 
         formData.coatCount === 2 ? 'Dvě vrstvy jsou standardem pro běžné malování': 'Více vrstev zajišťuje lepší krytí a odolnost'}
      </div>
    </div>
  );
};

export default CoatCounter;