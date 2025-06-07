// src/pages/wix-ready-iframe-calculator-widget/components/ContactForm.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactForm = ({ formData, onInputChange, onSubmit, wixTheme, onCancel }) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon 
            name="Mail" 
            size={16} 
            style={{ 
              marginRight: '8px', 
              color: wixTheme.accentColor 
            }} 
          />
          <span style={{ fontWeight: 500, fontSize: '14px' }}>Nezávazná poptávka</span>
        </div>
        <button 
          type="button" 
          onClick={onCancel}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}
        >
          <Icon name="X" size={16} />
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
            Jméno a příjmení
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            className="wix-input"
            placeholder="Jan Novák"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
            Telefon *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            className="wix-input"
            placeholder="+420 123 456 789"
            required
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
          Email *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="wix-input"
          placeholder="jan.novak@example.cz"
          required
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
          Poznámky k poptávce
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => onInputChange('message', e.target.value)}
          className="wix-input"
          placeholder="Další informace k zakázce, adresa, preferované termíny..."
          rows="3"
          style={{ resize: 'vertical' }}
        />
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
        <button 
          type="button" 
          onClick={onCancel} 
          className="wix-btn wix-btn-secondary"
          style={{ flex: 1 }}
        >
          Zrušit
        </button>
        <button 
          type="submit" 
          className="wix-btn wix-btn-primary"
          style={{ flex: 2 }}
        >
          Odeslat poptávku
        </button>
      </div>
      
      <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--wix-secondary-text)', textAlign: 'center' }}>
        Odesláním formuláře souhlasíte se zpracováním vašich osobních údajů.
      </div>
    </form>
  );
};

export default ContactForm;