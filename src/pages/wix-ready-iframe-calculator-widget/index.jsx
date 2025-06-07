// src/pages/wix-ready-iframe-calculator-widget/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import RoomDimensionsInput from './components/RoomDimensionsInput';
import PaintTypeSelector from './components/PaintTypeSelector';
import CoatCounter from './components/CoatCounter';
import AdditionalServicesToggle from './components/AdditionalServicesToggle';
import ResultsSummary from './components/ResultsSummary';
import ContactForm from './components/ContactForm';

const WixReadyIframeCalculatorWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [wixTheme, setWixTheme] = useState({
    accentColor: '#3899EC', // Default Wix accent color
    textColor: '#333333',
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E6E6'
  });
  const widgetRef = useRef(null);
  
  const [formData, setFormData] = useState({
    // Room dimensions
    width: '',
    length: '',
    height: '',
    wallsOnly: true,
    
    // Paint options
    paintType: 'standard',
    coatCount: 2,
    
    // Additional services
    surfacePreparation: false,
    furnitureMoving: false,
    cleanup: true,
    
    // Contact form
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [calculation, setCalculation] = useState({
    totalArea: 0,
    paintAmount: 0,
    totalCost: 0
  });

  // Initialize and handle communication with Wix parent page
  useEffect(() => {
    const handleWixMessage = (event) => {
      // Only accept messages from Wix domains
      if (!event.origin.includes('.wix.com') && !event.origin.includes('editor.wix.com')) {
        return;
      }
      
      try {
        const { type, data } = event.data;
        
        switch (type) {
          case 'WIX_THEME':
            if (data && typeof data === 'object') {
              setWixTheme({
                accentColor: data.accentColor || wixTheme.accentColor,
                textColor: data.textColor || wixTheme.textColor,
                backgroundColor: data.backgroundColor || wixTheme.backgroundColor,
                borderColor: data.borderColor || wixTheme.borderColor
              });
            }
            break;
            
          case 'WIX_EXPAND':
            setIsExpanded(!!data.expanded);
            break;
            
          case 'WIX_GET_CALCULATION':
            // Send calculation data back to Wix
            window.parent.postMessage({
              type: 'WIX_CALCULATION_RESULT',
              data: {
                ...calculation,
                formData: formData
              }
            }, '*');
            break;
            
          default:
            break;
        }
      } catch (error) {
        console.error('Error handling Wix message:', error);
      }
    };
    
    // Listen for messages from Wix
    window.addEventListener('message', handleWixMessage);
    
    // Notify Wix that the calculator is ready
    setTimeout(() => {
      window.parent.postMessage({ type: 'WIX_CALCULATOR_READY' }, '*');
      setIsIframeReady(true);
    }, 500);
    
    return () => {
      window.removeEventListener('message', handleWixMessage);
    };
  }, []);

  // Calculate cost whenever form data changes
  useEffect(() => {
    calculateCost();
  }, [formData]);

  // Calculate painting costs based on inputs
  const calculateCost = () => {
    const width = parseFloat(formData.width) || 0;
    const length = parseFloat(formData.length) || 0;
    const height = parseFloat(formData.height) || 0;
    
    if (width <= 0 || length <= 0 || height <= 0) {
      setCalculation({
        totalArea: 0,
        paintAmount: 0,
        totalCost: 0
      });
      return;
    }
    
    // Calculate wall area
    const wallArea = 2 * (width + length) * height;
    
    // Calculate ceiling area if needed
    const ceilingArea = formData.wallsOnly ? 0 : (width * length);
    
    // Total area to be painted
    const totalArea = wallArea + ceilingArea;
    
    // Base price per square meter
    let pricePerSqm = 150; // Base rate in CZK
    
    // Adjust price based on paint type
    switch (formData.paintType) {
      case 'premium':
        pricePerSqm *= 1.5; // 50% more expensive
        break;
      case 'washable':
        pricePerSqm *= 1.7; // 70% more expensive
        break;
      case 'specialized':
        pricePerSqm *= 2.0; // Twice as expensive
        break;
      default: // standard
        break;
    }
    
    // Adjust for number of coats
    pricePerSqm *= (formData.coatCount / 2); // Base price is for 2 coats
    
    // Additional services
    let additionalCosts = 0;
    
    if (formData.surfacePreparation) {
      additionalCosts += totalArea * 45; // 45 CZK per square meter
    }
    
    if (formData.furnitureMoving) {
      additionalCosts += 800; // Flat fee
    }
    
    if (formData.cleanup) {
      additionalCosts += totalArea * 20; // 20 CZK per square meter
    }
    
    // Calculate paint amount (1 liter covers approximately 8 square meters per coat)
    const paintAmount = (totalArea * formData.coatCount) / 8;
    
    // Total cost calculation
    const totalCost = (totalArea * pricePerSqm) + additionalCosts;
    
    // Update calculation state
    setCalculation({
      totalArea: parseFloat(totalArea.toFixed(2)),
      paintAmount: Math.ceil(paintAmount),
      totalCost: Math.round(totalCost)
    });
    
    // Notify Wix about the updated calculation
    if (isIframeReady) {
      window.parent.postMessage({
        type: 'WIX_CALCULATION_UPDATED',
        data: {
          totalArea: parseFloat(totalArea.toFixed(2)),
          paintAmount: Math.ceil(paintAmount),
          totalCost: Math.round(totalCost),
          formData: formData
        }
      }, '*');
    }
  };

  // Handle input changes
  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Toggle expanded view
  const toggleExpand = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Notify Wix about the resize
    window.parent.postMessage({
      type: 'WIX_RESIZE',
      data: { expanded: newExpandedState }
    }, '*');
  };

  // Handle contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for required fields
    if (!formData.email || !formData.phone) {
      alert('Email a telefon jsou povinné položky');
      return;
    }
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      calculatedArea: calculation.totalArea,
      calculatedPaint: calculation.paintAmount,
      calculatedCost: calculation.totalCost,
      submittedAt: new Date().toISOString()
    };
    
    // Send data to Wix
    window.parent.postMessage({
      type: 'WIX_FORM_SUBMITTED',
      data: submissionData
    }, '*');
    
    // Show success message and reset form
    alert('Děkujeme za vaši poptávku! Brzy vás budeme kontaktovat.');
    setShowContactForm(false);
    
    // Reset contact form fields but keep calculation inputs
    setFormData(prev => ({
      ...prev,
      name: '',
      email: '',
      phone: '',
      message: ''
    }));
  };

  // Toggle contact form visibility
  const toggleContactForm = () => {
    setShowContactForm(prev => !prev);
    
    // If showing contact form, ensure widget is expanded
    if (!showContactForm && !isExpanded) {
      toggleExpand();
    }
  };

  return (
    <div 
      ref={widgetRef}
      className="wix-calculator-widget"
      style={{
        fontFamily: 'Madefor, Helvetica Neue, Helvetica, Arial, sans-serif',
        maxWidth: '100%',
        color: wixTheme.textColor,
        backgroundColor: wixTheme.backgroundColor,
        border: `1px solid ${wixTheme.borderColor}`,
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        height: isExpanded ? 'auto' : '350px'
      }}
    >
      <Helmet>
        <style>{`
          /* Custom CSS for Wix integration */
          :root {
            --wix-accent: ${wixTheme.accentColor};
            --wix-text: ${wixTheme.textColor};
            --wix-background: ${wixTheme.backgroundColor};
            --wix-border: ${wixTheme.borderColor};
            --wix-secondary-text: rgba(${parseInt(wixTheme.textColor.slice(1, 3), 16)}, 
                                     ${parseInt(wixTheme.textColor.slice(3, 5), 16)}, 
                                     ${parseInt(wixTheme.textColor.slice(5, 7), 16)}, 0.6);
          }
          
          body {
            margin: 0;
            padding: 0;
            color: var(--wix-text);
            background-color: transparent;
          }
          
          .wix-calculator-widget {
            font-family: 'Madefor', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }
          
          .wix-input {
            width: 100%;
            padding: 8px 12px;
            font-size: 14px;
            border: 1px solid var(--wix-border);
            border-radius: 6px;
            background-color: #FFFFFF;
            transition: border-color 0.2s;
          }
          
          .wix-input:focus {
            outline: none;
            border-color: var(--wix-accent);
            box-shadow: 0 0 0 2px rgba(${parseInt(wixTheme.accentColor.slice(1, 3), 16)}, 
                                     ${parseInt(wixTheme.accentColor.slice(3, 5), 16)}, 
                                     ${parseInt(wixTheme.accentColor.slice(5, 7), 16)}, 0.2);
          }
          
          .wix-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 999px;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .wix-btn-primary {
            background-color: var(--wix-accent);
            color: white;
            border: none;
          }
          
          .wix-btn-primary:hover {
            filter: brightness(1.1);
          }
          
          .wix-btn-secondary {
            background-color: transparent;
            color: var(--wix-accent);
            border: 1px solid var(--wix-accent);
          }
          
          .wix-btn-secondary:hover {
            background-color: rgba(${parseInt(wixTheme.accentColor.slice(1, 3), 16)}, 
                              ${parseInt(wixTheme.accentColor.slice(3, 5), 16)}, 
                              ${parseInt(wixTheme.accentColor.slice(5, 7), 16)}, 0.1);
          }
          
          .wix-panel {
            background-color: rgba(${parseInt(wixTheme.textColor.slice(1, 3), 16)}, 
                               ${parseInt(wixTheme.textColor.slice(3, 5), 16)}, 
                               ${parseInt(wixTheme.textColor.slice(5, 7), 16)}, 0.05);
            border-radius: 8px;
            padding: 16px;
          }
          
          .wix-switch {
            position: relative;
            display: inline-block;
            width: 36px;
            height: 20px;
          }
          
          .wix-switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .wix-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
          }
          
          .wix-slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }
          
          input:checked + .wix-slider {
            background-color: var(--wix-accent);
          }
          
          input:checked + .wix-slider:before {
            transform: translateX(16px);
          }
        `}</style>
      </Helmet>
      
      {/* Header */}
      <div 
        style={{ 
          backgroundColor: wixTheme.accentColor,
          color: '#FFFFFF',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: `1px solid ${wixTheme.borderColor}`
        }}
      >
        <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
          <Icon name="Paintbrush" size={18} style={{ marginRight: '8px' }} />
          Kalkulačka nákladů na malování
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={toggleExpand}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
            aria-label={isExpanded ? 'Sbalit' : 'Rozbalit'}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>
      
      <div style={{ padding: '16px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Calculator Main Content */}
          <div style={{ display: 'grid', gridTemplateColumns: isExpanded ? '1fr 1fr' : '1fr', gap: '16px' }}>
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Room Dimensions */}
              <RoomDimensionsInput
                formData={formData}
                onInputChange={handleInputChange}
                wixTheme={wixTheme}
              />
              
              {/* Paint Type Selector */}
              <PaintTypeSelector
                formData={formData}
                onInputChange={handleInputChange}
                wixTheme={wixTheme}
              />
            </div>
            
            {/* Right Column - only visible when expanded */}
            {isExpanded && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Coat Counter */}
                <CoatCounter
                  formData={formData}
                  onInputChange={handleInputChange}
                  wixTheme={wixTheme}
                />
                
                {/* Additional Services */}
                <AdditionalServicesToggle
                  formData={formData}
                  onInputChange={handleInputChange}
                  wixTheme={wixTheme}
                />
              </div>
            )}
          </div>
          
          {/* Results Summary */}
          <div style={{ marginTop: '16px' }}>
            <ResultsSummary
              calculation={calculation}
              wixTheme={wixTheme}
              onRequestQuote={toggleContactForm}
            />
          </div>
          
          {/* Contact Form - only visible when requested */}
          {showContactForm && isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              style={{ marginTop: '16px', borderTop: `1px solid ${wixTheme.borderColor}`, paddingTop: '16px' }}
            >
              <ContactForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                wixTheme={wixTheme}
                onCancel={() => setShowContactForm(false)}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Footer */}
      <div 
        style={{ 
          borderTop: `1px solid ${wixTheme.borderColor}`,
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--wix-secondary-text)',
          backgroundColor: 'rgba(0,0,0,0.03)'
        }}
      >
        powered by <a 
          href="/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: wixTheme.accentColor, textDecoration: 'none' }}
        >
          Malíři v černém
        </a>
      </div>
    </div>
  );
};

export default WixReadyIframeCalculatorWidget;