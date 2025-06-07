// src/pages/wix-ready-iframe-calculator-widget/components/ResultsSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ResultsSummary = ({ calculation, wixTheme, onRequestQuote }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div 
      style={{
        padding: '16px',
        borderRadius: '8px',
        border: `1px solid ${wixTheme.accentColor}`,
        backgroundColor: `rgba(${parseInt(wixTheme.accentColor.slice(1, 3), 16)}, ${parseInt(wixTheme.accentColor.slice(3, 5), 16)}, ${parseInt(wixTheme.accentColor.slice(5, 7), 16)}, 0.1)`
      }}
    >
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon 
            name="Calculator" 
            size={16} 
            style={{ 
              marginRight: '8px', 
              color: wixTheme.accentColor 
            }} 
          />
          <span style={{ fontWeight: 500, fontSize: '14px' }}>Výsledek kalkulace</span>
        </div>
        
        <button 
          onClick={onRequestQuote}
          className="wix-btn wix-btn-secondary"
          style={{ fontSize: '12px', padding: '4px 12px' }}
        >
          Nezávazná poptávka
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '6px',
            padding: '12px',
            border: `1px solid ${wixTheme.borderColor}`
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--wix-secondary-text)', marginBottom: '4px' }}>Celková plocha</div>
          <motion.div 
            key={calculation.totalArea}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{ display: 'flex', alignItems: 'baseline' }}
          >
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{calculation.totalArea}</span>
            <span style={{ fontSize: '12px', color: 'var(--wix-secondary-text)', marginLeft: '4px' }}>m²</span>
          </motion.div>
        </div>
        
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '6px',
            padding: '12px',
            border: `1px solid ${wixTheme.borderColor}`
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--wix-secondary-text)', marginBottom: '4px' }}>Množství barvy</div>
          <motion.div 
            key={calculation.paintAmount}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{ display: 'flex', alignItems: 'baseline' }}
          >
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{calculation.paintAmount}</span>
            <span style={{ fontSize: '12px', color: 'var(--wix-secondary-text)', marginLeft: '4px' }}>litrů</span>
          </motion.div>
        </div>
        
        <div 
          style={{
            backgroundColor: wixTheme.accentColor,
            color: '#FFFFFF',
            borderRadius: '6px',
            padding: '12px',
            border: `1px solid ${wixTheme.accentColor}`
          }}
        >
          <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px' }}>Odhadovaná cena</div>
          <motion.div 
            key={calculation.totalCost}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <span style={{ fontSize: '18px', fontWeight: 700 }}>
              {calculation.totalCost > 0 ? formatCurrency(calculation.totalCost) : '-'}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummary;