// src/pages/wix-ready-iframe-calculator-widget/components/RoomDimensionsInput.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const RoomDimensionsInput = ({ formData, onInputChange, wixTheme }) => {
  return (
    <div className="wix-panel">
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
        <Icon 
          name="Box" 
          size={16} 
          style={{ 
            marginRight: '8px', 
            color: wixTheme.accentColor 
          }} 
        />
        <span style={{ fontWeight: 500, fontSize: '14px' }}>Rozměry místnosti</span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
            Šířka (m)
          </label>
          <input
            type="number"
            value={formData.width}
            onChange={(e) => onInputChange('width', e.target.value)}
            min="0.1"
            step="0.1"
            className="wix-input"
            placeholder="3.5"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
            Délka (m)
          </label>
          <input
            type="number"
            value={formData.length}
            onChange={(e) => onInputChange('length', e.target.value)}
            min="0.1"
            step="0.1"
            className="wix-input"
            placeholder="4.0"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
            Výška (m)
          </label>
          <input
            type="number"
            value={formData.height}
            onChange={(e) => onInputChange('height', e.target.value)}
            min="0.1"
            step="0.1"
            className="wix-input"
            placeholder="2.7"
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label className="wix-switch">
          <input
            type="checkbox"
            checked={formData.wallsOnly}
            onChange={(e) => onInputChange('wallsOnly', e.target.checked)}
          />
          <span className="wix-slider"></span>
        </label>
        <span style={{ marginLeft: '8px', fontSize: '13px' }}>
          {formData.wallsOnly ? 'Pouze stěny' : 'Včetně stropu'}
        </span>
      </div>
    </div>
  );
};

export default RoomDimensionsInput;