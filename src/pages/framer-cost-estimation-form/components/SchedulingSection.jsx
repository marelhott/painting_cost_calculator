// src/pages/framer-cost-estimation-form/components/SchedulingSection.jsx
import React from 'react';
import FormSection from './FormSection';
import Icon from './Icon';

const SchedulingSection = ({ formData, errors, onInputChange }) => {
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <FormSection
      title="Termín a dodatečné informace"
      icon="Calendar"
      required
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
            Preferovaný termín zahájení prací *
          </label>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '12px',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <Icon name="Calendar" size={18} color="#6B7280" />
            </div>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => onInputChange('preferredDate', e.target.value)}
              min={today}
              style={{
                display: 'block',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                paddingLeft: '40px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                color: '#111827',
                fontSize: '14px'
              }}
            />
          </div>
          {errors.preferredDate && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.preferredDate}</p>}
          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            margin: '4px 0 0'
          }}>
            <Icon name="Info" size={14} style={{ marginRight: '4px' }} />
            Termín je orientační, přesný termín dohodneme po prohlídce
          </p>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
            Dodatečné informace
          </label>
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              pointerEvents: 'none'
            }}>
              <Icon name="MessageSquare" size={18} color="#6B7280" />
            </div>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => onInputChange('additionalInfo', e.target.value)}
              placeholder="Zde můžete uvést jakékoliv další informace o projektu, specifické požadavky, přístupnost prostoru, atd."
              rows={4}
              style={{
                display: 'block',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #E5E7EB',
                backgroundColor: 'white',
                paddingLeft: '40px',
                paddingRight: '12px',
                paddingTop: '8px',
                paddingBottom: '8px',
                color: '#111827',
                fontSize: '14px',
                resize: 'none'
              }}
            />
          </div>
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#F0F8FF',
            borderRadius: '6px',
            border: '1px solid #E5E7EB'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1B4332',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              margin: '0 0 8px'
            }}>
              <Icon name="Lightbulb" size={16} color="#FCD34D" style={{ marginRight: '8px' }} />
              Tipy pro dodatečné informace:
            </h4>
            <ul style={{
              fontSize: '14px',
              color: '#6B7280',
              marginLeft: '24px',
              margin: '0 0 0 24px',
              paddingLeft: 0
            }}>
              <li>Barvy, které preferujete</li>
              <li>Časové omezení během dne</li>
              <li>Přístupnost prostoru</li>
              <li>Speciální požadavky na dokončení</li>
              <li>Potřeba speciálních technik nebo materiálů</li>
            </ul>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default SchedulingSection;