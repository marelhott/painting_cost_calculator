// src/pages/framer-cost-estimation-form/components/FormSection.jsx
import React from 'react';
import Icon from './Icon';

const FormSection = ({ title, icon, required = false, children }) => {
  return (
    <div style={{
      backgroundColor: '#F0F8FF',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#FCD34D',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s'
        }}>
          <Icon name={icon} size={22} color="white" />
        </div>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1B4332',
          margin: 0
        }}>
          {title}
          {required && <span style={{ color: '#EF4444', marginLeft: '4px' }}>*</span>}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default FormSection;