// src/pages/framer-cost-estimation-form/index.jsx
import React, { useState, useEffect } from 'react';
import FormSection from './components/FormSection';
import CalculationPanel from './components/CalculationPanel';
import SchedulingSection from './components/SchedulingSection';
import Icon from './components/Icon';
import Image from './components/Image';

const FramerCostEstimationForm = () => {
  const [formData, setFormData] = useState({
    surfaceType: '',
    repairLevel: '',
    paintProvision: '',
    furnitureHandling: '',
    emptySpace: '',
    carpetPresence: '',
    spaceType: '',
    totalArea: '',
    roomCount: '',
    ceilingHeight: '',
    customerName: '',
    address: '',
    phone: '',
    email: '',
    preferredDate: '',
    additionalInfo: ''
  });

  const [calculatedCost, setCalculatedCost] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Cost calculation logic
  useEffect(() => {
    calculateCost();
  }, [formData]);

  const calculateCost = () => {
    let baseCost = 0;
    const area = parseFloat(formData.totalArea) || 0;
    const rooms = parseInt(formData.roomCount) || 0;
    const height = parseFloat(formData.ceilingHeight) || 0;

    if (area === 0) {
      setCalculatedCost(0);
      return;
    }

    // Base cost per square meter
    let costPerSqm = 150; // Base rate in CZK

    // Surface type multiplier
    if (formData.surfaceType === 'wall') {
      costPerSqm *= 1.2;
    }

    // Repair level multiplier
    switch (formData.repairLevel) {
      case 'small':
        costPerSqm *= 1.1;
        break;
      case 'medium':
        costPerSqm *= 1.3;
        break;
      case 'large':
        costPerSqm *= 1.6;
        break;
      default:
        break;
    }

    // Additional services
    if (formData.paintProvision === 'yes') {
      costPerSqm += 50;
    }
    if (formData.furnitureHandling === 'yes') {
      costPerSqm += 30;
    }
    if (formData.carpetPresence === 'yes') {
      costPerSqm += 20;
    }

    // Space type multiplier
    switch (formData.spaceType) {
      case 'apartment':
        costPerSqm *= 1.1;
        break;
      case 'house':
        costPerSqm *= 1.2;
        break;
      case 'office':
        costPerSqm *= 1.3;
        break;
      case 'commercial':
        costPerSqm *= 1.4;
        break;
      case 'pension-hotel':
        costPerSqm *= 1.5;
        break;
      default:
        break;
    }

    // Ceiling height adjustment
    if (height > 300) {
      costPerSqm *= 1.2;
    } else if (height > 250) {
      costPerSqm *= 1.1;
    }

    // Room count adjustment
    if (rooms > 5) {
      costPerSqm *= 0.95; // 5% discount for larger projects
    } else if (rooms > 3) {
      costPerSqm *= 0.98; // 2% discount for medium projects
    }

    // Empty space adjustment
    if (formData.emptySpace === 'yes') {
      costPerSqm *= 0.9; // 10% discount if space is empty
    }

    baseCost = area * costPerSqm;
    setCalculatedCost(Math.round(baseCost));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success message if user starts editing after successful submission
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Toto pole je povinné';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Neplatný formát emailu';
    }

    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Toto pole je povinné';
    }

    // Area validation for data quality
    if (formData.totalArea && (parseFloat(formData.totalArea) <= 0 || parseFloat(formData.totalArea) > 10000)) {
      newErrors.totalArea = 'Plocha musí být mezi 1 a 10000 m²';
    }

    // Room count validation for data quality
    if (formData.roomCount && (parseInt(formData.roomCount) <= 0 || parseInt(formData.roomCount) > 50)) {
      newErrors.roomCount = 'Počet místností musí být mezi 1 a 50';
    }

    // Ceiling height validation for data quality
    if (formData.ceilingHeight && (parseFloat(formData.ceilingHeight) < 200 || parseFloat(formData.ceilingHeight) > 500)) {
      newErrors.ceilingHeight = 'Výška stropu musí být mezi 200 a 500 cm';
    }

    setErrors(newErrors);
    
    // Return true if email and phone are valid (for form submission)
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send email using a simple mailto link or external service
      const emailBody = `
Nová poptávka malířských prací:

Kontaktní údaje:
Jméno: ${formData.customerName}
Telefon: ${formData.phone}
Email: ${formData.email}
Adresa: ${formData.address}

Detaily projektu:
Typ povrchu: ${formData.surfaceType === 'floor' ? 'Podlahová plocha' : formData.surfaceType === 'wall' ? 'Stěnová plocha' : 'Nezadáno'}
Typ prostoru: ${formData.spaceType}
Celková plocha: ${formData.totalArea} m²
Počet místností: ${formData.roomCount}
Výška stropu: ${formData.ceilingHeight} cm
Úroveň oprav: ${formData.repairLevel}
Dodávka barvy: ${formData.paintProvision}
Posouvání nábytku: ${formData.furnitureHandling}
Prázdný prostor: ${formData.emptySpace}
Koberec v prostoru: ${formData.carpetPresence}
Preferovaný termín: ${formData.preferredDate}

Odhadovaná cena: ${new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(calculatedCost)}

Dodatečné informace:
${formData.additionalInfo}
      `;
      
      // For Framer, we'll use a simple form submission or external service
      // You can replace this with your preferred form handling method
      const mailtoLink = `mailto:info@malirivcernem.cz?subject=Nová poptávka malířských prací&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoLink);
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        surfaceType: '',
        repairLevel: '',
        paintProvision: '',
        furnitureHandling: '',
        emptySpace: '',
        carpetPresence: '',
        spaceType: '',
        totalArea: '',
        roomCount: '',
        ceilingHeight: '',
        customerName: '',
        address: '',
        phone: '',
        email: '',
        preferredDate: '',
        additionalInfo: ''
      });
      
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError('Došlo k neočekávané chybě při odesílání.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', fontFamily: 'Poppins, Inter, system-ui, sans-serif' }}>
      <main style={{ padding: '32px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px' }}>
          {/* Title Section */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#1B4332',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              Malíři v černém
            </h1>
            <div style={{
              height: '4px',
              backgroundColor: '#FCD34D',
              width: '192px',
              margin: '0 auto 24px'
            }}></div>
            <p style={{
              fontSize: '20px',
              color: '#6B7280',
              maxWidth: '768px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Získejte okamžitou cenovou nabídku pro vaše malířské práce. Vyplňte formulář a my vám pošleme detailní kalkulaci.
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <div style={{
              marginBottom: '32px',
              padding: '16px',
              backgroundColor: '#f0f9ff',
              border: '1px solid #10B981',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Icon name="CheckCircle" size={20} color="#10B981" style={{ marginRight: '12px' }} />
              <div>
                <h3 style={{ color: '#065f46', fontWeight: '500', margin: 0 }}>Poptávka byla úspěšně odeslána!</h3>
                <p style={{ color: '#059669', fontSize: '14px', margin: '4px 0 0' }}>
                  Brzy se vám ozveme s detailní nabídkou na email: <strong>{formData.email}</strong>
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <div style={{
              marginBottom: '32px',
              padding: '16px',
              backgroundColor: '#fef2f2',
              border: '1px solid #EF4444',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Icon name="AlertCircle" size={20} color="#EF4444" style={{ marginRight: '12px' }} />
              <div>
                <h3 style={{ color: '#991b1b', fontWeight: '500', margin: 0 }}>Chyba při odesílání</h3>
                <p style={{ color: '#dc2626', fontSize: '14px', margin: '4px 0 0' }}>{submitError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {/* Form Sections */}
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Surface Type Section */}
              <FormSection
                title="Typ povrchu"
                icon="Layers"
                required
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                  {[
                    { value: 'floor', label: 'Podlahová plocha', icon: 'Square', image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg' },
                    { value: 'wall', label: 'Stěnová plocha', icon: 'RectangleVertical', image: 'https://images.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        border: formData.surfaceType === option.value ? '2px solid #FCD34D' : '1px solid #E5E7EB',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <input
                        type="radio"
                        name="surfaceType"
                        value={option.value}
                        checked={formData.surfaceType === option.value}
                        onChange={(e) => handleInputChange('surfaceType', e.target.value)}
                        style={{ position: 'absolute', opacity: 0 }}
                      />
                      <div style={{ height: '144px', overflow: 'hidden' }}>
                        <Image src={option.image} alt={option.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        backgroundColor: formData.surfaceType === option.value ? '#fffbeb' : '#F0F8FF'
                      }}>
                        <Icon name={option.icon} size={24} color={formData.surfaceType === option.value ? '#FCD34D' : '#6B7280'} />
                        <span style={{
                          fontWeight: '500',
                          color: formData.surfaceType === option.value ? '#1B4332' : '#6B7280'
                        }}>
                          {option.label}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </FormSection>

              {/* Property Details Section */}
              <FormSection title="Detaily nemovitosti" icon="Building" required>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                      Typ prostoru *
                    </label>
                    <select
                      value={formData.spaceType}
                      onChange={(e) => handleInputChange('spaceType', e.target.value)}
                      style={{
                        display: 'block',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        padding: '8px 12px',
                        color: '#111827',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Vyberte typ prostoru</option>
                      <option value="room">Místnost</option>
                      <option value="apartment">Byt</option>
                      <option value="house">Dům</option>
                      <option value="common-areas">Společné prostory</option>
                      <option value="office">Kancelář</option>
                      <option value="pension-hotel">Penzion/Hotel</option>
                      <option value="commercial">Komerční prostor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                      Celková plocha (m²) *
                    </label>
                    <input
                      type="number"
                      value={formData.totalArea}
                      onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      placeholder="např. 50"
                      min="1"
                      max="10000"
                      style={{
                        display: 'block',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        padding: '8px 12px',
                        color: '#111827',
                        fontSize: '14px'
                      }}
                    />
                    {errors.totalArea && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.totalArea}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                      Počet místností
                    </label>
                    <input
                      type="number"
                      value={formData.roomCount}
                      onChange={(e) => handleInputChange('roomCount', e.target.value)}
                      placeholder="např. 3"
                      min="1"
                      max="50"
                      style={{
                        display: 'block',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        padding: '8px 12px',
                        color: '#111827',
                        fontSize: '14px'
                      }}
                    />
                    {errors.roomCount && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.roomCount}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>
                      Výška stropu (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.ceilingHeight}
                      onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
                      placeholder="např. 270"
                      min="200"
                      max="500"
                      style={{
                        display: 'block',
                        width: '100%',
                        borderRadius: '6px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        padding: '8px 12px',
                        color: '#111827',
                        fontSize: '14px'
                      }}
                    />
                    {errors.ceilingHeight && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '4px' }}>{errors.ceilingHeight}</p>}
                  </div>
                </div>
              </FormSection>

              {/* Repair Level Section */}
              <FormSection title="Úroveň oprav" icon="Wrench">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {[
                    { value: 'none', label: 'Žádné opravy', icon: 'Check', desc: 'Pouze malování' },
                    { value: 'small', label: 'Malé opravy', icon: 'Minus', desc: 'Drobné trhliny a praskliny' },
                    { value: 'medium', label: 'Střední opravy', icon: 'Equal', desc: 'Větší trhliny, opravy omítky' },
                    { value: 'large', label: 'Velké opravy', icon: 'Plus', desc: 'Rozsáhlé opravy povrchu' }
                  ].map((option) => (
                    <label
                      key={option.value}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '16px',
                        border: formData.repairLevel === option.value ? '1px solid #FCD34D' : '1px solid #E5E7EB',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        backgroundColor: formData.repairLevel === option.value ? '#fffbeb' : 'white'
                      }}
                    >
                      <input
                        type="radio"
                        name="repairLevel"
                        value={option.value}
                        checked={formData.repairLevel === option.value}
                        onChange={(e) => handleInputChange('repairLevel', e.target.value)}
                        style={{ position: 'absolute', opacity: 0 }}
                      />
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        backgroundColor: formData.repairLevel === option.value ? '#FCD34D' : '#F0F8FF',
                        border: formData.repairLevel === option.value ? 'none' : '1px solid #E5E7EB'
                      }}>
                        <Icon 
                          name={option.icon} 
                          size={24} 
                          color={formData.repairLevel === option.value ? 'white' : '#6B7280'} 
                        />
                      </div>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        textAlign: 'center',
                        color: formData.repairLevel === option.value ? '#1B4332' : '#6B7280'
                      }}>
                        {option.label}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', marginTop: '4px' }}>{option.desc}</span>
                    </label>
                  ))}
                </div>
              </FormSection>

              {/* Service Preferences */}
              <FormSection title="Preference služeb" icon="Settings">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { key: 'paintProvision', label: 'Dodáváme barvu?', icon: 'Palette', desc: 'Máte-li vlastní barvu, ušetříte na nákladech' },
                    { key: 'furnitureHandling', label: 'Potřebujete posouvání nábytku?', icon: 'Package', desc: 'Zahrnuje opatrnou manipulaci s vašim nábytkem' },
                    { key: 'emptySpace', label: 'Je prostor prázdný?', icon: 'Home', desc: 'Prázdné prostory umožňují rychlejší práci' },
                    { key: 'carpetPresence', label: 'Je v prostoru koberec?', icon: 'Square', desc: 'Koberce vyžadují zvláštní ochranu' }
                  ].map((item) => (
                    <div key={item.key} style={{
                      backgroundColor: '#F0F8FF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      transition: 'all 0.15s'
                    }}>
                      <div style={{
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(27, 67, 50, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Icon name={item.icon} size={20} color="#1B4332" />
                          </div>
                          <div>
                            <span style={{ fontWeight: '500', color: '#111827' }}>{item.label}</span>
                            <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0' }}>{item.desc}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {['yes', 'no'].map((value) => (
                            <label
                              key={value}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                                backgroundColor: formData[item.key] === value ? '#FCD34D' : '#FFFFFF',
                                color: formData[item.key] === value ? 'white' : '#6B7280',
                                border: '1px solid #E5E7EB'
                              }}
                            >
                              <input
                                type="radio"
                                name={item.key}
                                value={value}
                                checked={formData[item.key] === value}
                                onChange={(e) => handleInputChange(item.key, e.target.value)}
                                style={{ position: 'absolute', opacity: 0 }}
                              />
                              {value === 'yes' ? 'Ano' : 'Ne'}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FormSection>

              {/* Scheduling */}
              <SchedulingSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />
            </div>

            {/* Calculation Panel */}
            <div style={{ gridColumn: 'span 1' }}>
              <CalculationPanel
                calculatedCost={calculatedCost}
                formData={formData}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                errors={errors}
              />
            </div>
          </form>

          {/* Trust Indicators */}
          <div style={{ marginTop: '64px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', textAlign: 'center', marginBottom: '32px' }}>Proč zvolit naše služby</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {[
                { icon: 'Award', title: 'Kvalitní provedení', desc: 'Garantujeme profesionální výsledek a spokojenost s každou prací' },
                { icon: 'Clock', title: 'Rychlé dokončení', desc: 'Dodržujeme dohodnuté termíny a pracujeme efektivně' },
                { icon: 'Shield', title: 'Záruka 24 měsíců', desc: 'Na všechny naše práce poskytujeme plnou záruku kvality' }
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#F0F8FF',
                    padding: '24px',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(252, 211, 77, 0.1)',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    <Icon name={item.icon} size={32} color="#FCD34D" />
                  </div>
                  <h4 style={{ fontSize: '18px', fontWeight: '500', color: '#1B4332', marginBottom: '8px' }}>{item.title}</h4>
                  <p style={{ color: '#6B7280' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1B4332', color: 'white', padding: '32px 0', marginTop: '64px' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#FCD34D',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name="Paintbrush" size={20} color="white" />
                </div>
                <span style={{ fontSize: '18px', fontWeight: '600' }}>Malíři v černém</span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '8px', fontSize: '14px' }}>Profesionální malířské služby</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <a href="tel:+420732333550" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none' }}>
                <Icon name="Phone" size={16} />
                <span>+420 732 333 550</span>
              </a>
              <a href="mailto:info@malirivcernem.cz" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', textDecoration: 'none' }}>
                <Icon name="Mail" size={16} />
                <span>info@malirivcernem.cz</span>
              </a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '24px', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '14px' }}>© 2023 Malíři v černém. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FramerCostEstimationForm;