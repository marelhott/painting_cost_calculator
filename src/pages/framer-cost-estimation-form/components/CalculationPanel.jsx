// src/pages/framer-cost-estimation-form/components/CalculationPanel.jsx
import React from 'react';
import Icon from './Icon';

const CalculationPanel = ({ calculatedCost, formData, isSubmitting, onInputChange, errors }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const isFormValid = () => {
    const isEmailValid = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhoneValid = formData.phone && formData.phone.trim() !== '';
    return isEmailValid && isPhoneValid;
  };

  const calculateSavings = () => {
    if (!formData.totalArea) return 0;

    let savings = 0;
    const area = parseFloat(formData.totalArea) || 0;
    const baseRate = 150;

    if (formData.emptySpace === 'yes') {
      savings += area * baseRate * 0.1;
    }

    const rooms = parseInt(formData.roomCount) || 0;
    if (rooms > 5) {
      savings += area * baseRate * 0.05;
    } else if (rooms > 3) {
      savings += area * baseRate * 0.02;
    }

    if (formData.paintProvision === 'yes') {
      savings += area * 50;
    }

    return Math.round(savings);
  };

  const savings = calculateSavings();

  return (
    <div style={{ position: 'sticky', top: '96px', zIndex: 30 }}>
      <div style={{
        backgroundColor: '#F0F8FF',
        border: '1px solid #E5E7EB',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ backgroundColor: 'rgba(252, 211, 77, 0.1)', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#FCD34D',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon name="Calculator" size={20} color="white" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1B4332', margin: 0 }}>Kalkulace nákladů</h3>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: '500', color: '#1B4332' }}>Odhadovaná cena:</span>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1B4332'
              }}>
                {calculatedCost > 0 ? formatCurrency(calculatedCost) : '-'}
              </span>
            </div>
            
            {savings > 0 && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                padding: '8px',
                borderRadius: '6px'
              }}>
                <span style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center' }}>
                  <Icon name="TrendingDown" size={16} style={{ marginRight: '4px' }} /> Ušetříte:
                </span>
                <span style={{ fontWeight: '500' }}>
                  {formatCurrency(savings)}
                </span>
              </div>
            )}
            
            <p style={{
              fontSize: '12px',
              color: '#6B7280',
              marginTop: '8px',
              fontStyle: 'italic',
              margin: '8px 0 0'
            }}>
              * Konečná cena může být upravena na základě osobní prohlídky
            </p>
          </div>
        </div>

        <div style={{ padding: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            {[
              {
                label: 'Typ povrchu:',
                value: formData.surfaceType === 'floor' ? 'Podlahová plocha' :
                       formData.surfaceType === 'wall' ? 'Stěnová plocha' : '-'
              },
              {
                label: 'Plocha:',
                value: formData.totalArea ? `${formData.totalArea} m²` : '-'
              },
              {
                label: 'Typ prostoru:',
                value: formData.spaceType === 'room' ? 'Místnost' :
                       formData.spaceType === 'apartment' ? 'Byt' :
                       formData.spaceType === 'house' ? 'Dům' :
                       formData.spaceType === 'common-areas' ? 'Společné prostory' :
                       formData.spaceType === 'office' ? 'Kancelář' :
                       formData.spaceType === 'pension-hotel' ? 'Penzion/Hotel' :
                       formData.spaceType === 'commercial' ? 'Komerční prostor' : '-'
              },
              ...(formData.repairLevel ? [{
                label: 'Opravy:',
                value: formData.repairLevel === 'none' ? 'Žádné' :
                       formData.repairLevel === 'small' ? 'Malé' :
                       formData.repairLevel === 'medium' ? 'Střední' :
                       formData.repairLevel === 'large' ? 'Velké' : '-'
              }] : []),
              ...(formData.roomCount ? [{
                label: 'Počet místností:',
                value: formData.roomCount
              }] : []),
              ...(formData.ceilingHeight ? [{
                label: 'Výška stropu:',
                value: `${formData.ceilingHeight} cm`
              }] : [])
            ].map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #E5E7EB'
              }}>
                <span style={{ color: '#6B7280' }}>{item.label}</span>
                <span style={{ fontWeight: '500', color: '#111827' }}>{item.value}</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '18px',
              transition: 'all 0.15s',
              border: 'none',
              cursor: isFormValid() && !isSubmitting ? 'pointer' : 'not-allowed',
              backgroundColor: isFormValid() && !isSubmitting ? '#FCD34D' : '#d1d5db',
              color: isFormValid() && !isSubmitting ? 'white' : '#6b7280',
              boxShadow: isFormValid() && !isSubmitting ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
              transform: isFormValid() && !isSubmitting ? 'translateY(0)' : 'none'
            }}
          >
            {isSubmitting ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid white',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span>Odesílání...</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Icon name="Send" size={20} color="white" />
                <span>Odeslat poptávku</span>
              </div>
            )}
          </button>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Poptávka bude uložena do databáze a odeslána na email: 
              <br />
              <span style={{ fontWeight: '500' }}>info@malirivcernem.cz</span>
            </p>
          </div>
          
          {/* Contact Information */}
          <div style={{ marginTop: '24px', borderTop: '1px solid #E5E7EB', paddingTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(27, 67, 50, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="User" size={16} color="#1B4332" />
              </div>
              <h4 style={{ fontSize: '18px', fontWeight: '500', color: '#1B4332', margin: 0 }}>Kontaktní údaje</h4>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                  Jméno a příjmení *
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '12px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <Icon name="User" size={18} color="#6B7280" />
                  </div>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => onInputChange('customerName', e.target.value)}
                    placeholder="Jan Novák"
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
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                  Telefon * <span style={{ fontSize: '12px', color: '#6B7280' }}>(nutné vyplnit)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '12px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <Icon name="Phone" size={18} color="#6B7280" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onInputChange('phone', e.target.value)}
                    placeholder="+420 123 456 789"
                    style={{
                      display: 'block',
                      width: '100%',
                      borderRadius: '6px',
                      border: errors?.phone ? '1px solid #EF4444' : '1px solid #E5E7EB',
                      backgroundColor: 'white',
                      paddingLeft: '40px',
                      paddingRight: '12px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      color: '#111827',
                      fontSize: '14px'
                    }}
                  />
                  {errors?.phone && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                  Email * <span style={{ fontSize: '12px', color: '#6B7280' }}>(nutné vyplnit)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '12px',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none'
                  }}>
                    <Icon name="Mail" size={18} color="#6B7280" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    placeholder="jan.novak@email.cz"
                    style={{
                      display: 'block',
                      width: '100%',
                      borderRadius: '6px',
                      border: errors?.email ? '1px solid #EF4444' : '1px solid #E5E7EB',
                      backgroundColor: 'white',
                      paddingLeft: '40px',
                      paddingRight: '12px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      color: '#111827',
                      fontSize: '14px'
                    }}
                  />
                  {errors?.email && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                  Adresa malování
                </label>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    pointerEvents: 'none'
                  }}>
                    <Icon name="MapPin" size={18} color="#6B7280" />
                  </div>
                  <textarea
                    value={formData.address}
                    onChange={(e) => onInputChange('address', e.target.value)}
                    placeholder="Ulice a číslo popisné, město, PSČ"
                    rows={3}
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
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '16px',
            backgroundColor: 'rgba(27, 67, 50, 0.05)',
            borderRadius: '8px'
          }}>
            <h4 style={{
              fontWeight: '500',
              color: '#1B4332',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              margin: '0 0 8px'
            }}>
              <Icon name="Info" size={16} style={{ marginRight: '8px' }} /> Doplňující informace
            </h4>
            <ul style={{ fontSize: '14px', color: '#6B7280', margin: 0, paddingLeft: 0, listStyle: 'none' }}>
              {[
                { icon: 'CheckCircle', text: 'Osobní prohlídka a konzultace zdarma', color: '#10B981' },
                { icon: 'CheckCircle', text: 'Detailní kalkulace do 24 hodin', color: '#10B981' },
                { icon: 'CheckCircle', text: 'Možnost zahájení prací do 14 dnů', color: '#10B981' },
                { icon: 'Database', text: 'Vaše data jsou bezpečně uložena v databázi', color: '#1B4332' }
              ].map((item, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <Icon name={item.icon} size={14} color={item.color} style={{ marginRight: '8px', marginTop: '4px' }} />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CalculationPanel;