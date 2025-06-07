// src/pages/embeddable-calculator-widget/index.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import RoomDimensionsInput from './components/RoomDimensionsInput';
import ColorSelection from './components/ColorSelection';
import CoatSelection from './components/CoatSelection';
import AdditionalServices from './components/AdditionalServices';
import CostSummary from './components/CostSummary';

const EmbeddableCalculatorWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [language, setLanguage] = useState('cs');
  const [accentColor, setAccentColor] = useState('#F59E0B'); // Default accent color
  const widgetRef = useRef(null);
  
  const [formData, setFormData] = useState({
    roomWidth: '',
    roomLength: '',
    roomHeight: '',
    wallsOnly: true,
    colorType: 'standard',
    coatCount: 2,
    needsSurfacePrep: false,
    needsFurnitureMove: false,
    needsCleanup: true
  });

  const [calculatedCost, setCalculatedCost] = useState(0);
  const [calculatedArea, setCalculatedArea] = useState(0);
  const [paintLiters, setPaintLiters] = useState(0);

  // Check for URL parameters to customize the widget
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accentColorParam = params.get('accentColor');
    const langParam = params.get('lang');
    const expandedParam = params.get('expanded');
    
    // Set accent color if provided
    if (accentColorParam && /^#[0-9A-F]{6}$/i.test(accentColorParam)) {
      setAccentColor(accentColorParam);
      document.documentElement.style.setProperty('--color-accent', accentColorParam);
    }
    
    // Set language if provided
    if (langParam && ['cs', 'en'].includes(langParam)) {
      setLanguage(langParam);
    } else {
      // Auto-detect language from browser
      const browserLang = navigator.language.split('-')[0];
      setLanguage(browserLang === 'cs' ? 'cs' : 'en');
    }
    
    // Set expanded state if provided
    if (expandedParam === 'true') {
      setIsExpanded(true);
    }
    
    // Setup postMessage listener for parent frame communication
    window.addEventListener('message', handlePostMessage);
    
    // Send ready message to parent
    window.parent.postMessage({ type: 'CALCULATOR_READY' }, '*');
    
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

  // Handle messages from parent frame
  const handlePostMessage = (event) => {
    try {
      const { type, data } = event.data;
      
      switch (type) {
        case 'SET_ACCENT_COLOR':
          if (data && /^#[0-9A-F]{6}$/i.test(data)) {
            setAccentColor(data);
            document.documentElement.style.setProperty('--color-accent', data);
          }
          break;
          
        case 'SET_LANGUAGE':
          if (data && ['cs', 'en'].includes(data)) {
            setLanguage(data);
          }
          break;
          
        case 'TOGGLE_EXPAND':
          setIsExpanded(prev => !prev);
          break;
          
        case 'GET_CALCULATION':
          // Send current calculation back to parent
          window.parent.postMessage({
            type: 'CALCULATION_RESULT',
            data: {
              cost: calculatedCost,
              area: calculatedArea,
              paintLiters: paintLiters,
              formData: formData
            }
          }, '*');
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };

  // Calculate cost whenever form data changes
  useEffect(() => {
    calculateCost();
  }, [formData]);

  const calculateCost = () => {
    const width = parseFloat(formData.roomWidth) || 0;
    const length = parseFloat(formData.roomLength) || 0;
    const height = parseFloat(formData.roomHeight) || 0;
    
    if (width === 0 || length === 0 || height === 0) {
      setCalculatedCost(0);
      setCalculatedArea(0);
      setPaintLiters(0);
      return;
    }
    
    // Calculate wall area
    const wallArea = 2 * (width + length) * height;
    
    // Calculate ceiling area if needed
    const ceilingArea = formData.wallsOnly ? 0 : (width * length);
    
    // Total area to be painted
    const totalArea = wallArea + ceilingArea;
    setCalculatedArea(totalArea);
    
    // Base price per square meter
    let pricePerSqm = 150; // Base rate in CZK
    
    // Adjust price based on color type
    switch (formData.colorType) {
      case 'premium':
        pricePerSqm *= 1.5;
        break;
      case 'specialized':
        pricePerSqm *= 1.8;
        break;
      default: // standard
        break;
    }
    
    // Adjust price based on coat count
    pricePerSqm *= (formData.coatCount / 2); // Base price is for 2 coats
    
    // Additional services
    let additionalCost = 0;
    
    if (formData.needsSurfacePrep) {
      additionalCost += totalArea * 50; // 50 CZK per square meter for surface preparation
    }
    
    if (formData.needsFurnitureMove) {
      additionalCost += 500; // Flat fee for furniture moving
    }
    
    if (formData.needsCleanup) {
      additionalCost += totalArea * 20; // 20 CZK per square meter for cleanup
    }
    
    // Calculate paint amount (1 liter covers approximately 10 square meters per coat)
    const litersNeeded = (totalArea * formData.coatCount) / 10;
    setPaintLiters(Math.ceil(litersNeeded));
    
    // Total cost
    const totalCost = (totalArea * pricePerSqm) + additionalCost;
    setCalculatedCost(Math.round(totalCost));
    
    // Notify parent frame of the new calculation
    window.parent.postMessage({
      type: 'CALCULATION_UPDATED',
      data: {
        cost: Math.round(totalCost),
        area: totalArea,
        paintLiters: Math.ceil(litersNeeded),
        formData: formData
      }
    }, '*');
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
    
    // Notify parent frame of size change
    window.parent.postMessage({
      type: 'WIDGET_RESIZE',
      data: { expanded: !isExpanded }
    }, '*');
  };

  // Translation object
  const translations = {
    cs: {
      title: 'Kalkulačka nákladů na malování',
      dimensions: 'Rozměry místnosti',
      width: 'Šířka',
      length: 'Délka',
      height: 'Výška',
      wallsOnly: 'Pouze stěny',
      includeCeiling: 'Včetně stropu',
      colorType: 'Typ barvy',
      standard: 'Standardní',
      premium: 'Prémiová',
      specialized: 'Speciální',
      coats: 'Počet vrstev',
      additionalServices: 'Doplňkové služby',
      surfacePrep: 'Příprava povrchu',
      furnitureMove: 'Přesun nábytku',
      cleanup: 'Úklid po malování',
      results: 'Výsledky',
      totalArea: 'Celková plocha',
      paintNeeded: 'Potřebné množství barvy',
      estimatedCost: 'Odhadovaná cena',
      squareMeters: 'm²',
      liters: 'litrů',
      expand: 'Rozbalit',
      collapse: 'Sbalit',
      embedCode: 'Kód pro vložení',
      copyCode: 'Kopírovat kód',
      copied: 'Zkopírováno!',
      meterUnit: 'm',
      currencySymbol: 'Kč'
    },
    en: {
      title: 'Painting Cost Calculator',
      dimensions: 'Room Dimensions',
      width: 'Width',
      length: 'Length',
      height: 'Height',
      wallsOnly: 'Walls only',
      includeCeiling: 'Include ceiling',
      colorType: 'Paint Type',
      standard: 'Standard',
      premium: 'Premium',
      specialized: 'Specialized',
      coats: 'Number of Coats',
      additionalServices: 'Additional Services',
      surfacePrep: 'Surface Preparation',
      furnitureMove: 'Furniture Moving',
      cleanup: 'Post-painting Cleanup',
      results: 'Results',
      totalArea: 'Total Area',
      paintNeeded: 'Paint Needed',
      estimatedCost: 'Estimated Cost',
      squareMeters: 'sq.m',
      liters: 'liters',
      expand: 'Expand',
      collapse: 'Collapse',
      embedCode: 'Embed Code',
      copyCode: 'Copy Code',
      copied: 'Copied!',
      meterUnit: 'm',
      currencySymbol: 'CZK'
    }
  };

  // Get translation based on current language
  const t = translations[language];
  
  // Generate embed code for users to copy
  const getEmbedCode = () => {
    return `<iframe 
  src="${window.location.origin}/embeddable-calculator-widget${language === 'en' ? '?lang=en' : ''}"
  width="100%" 
  height="${isExpanded ? '600' : '350'}"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="${t.title}"
></iframe>`;
  };
  
  // Function to copy embed code to clipboard
  const copyEmbedCode = () => {
    navigator.clipboard.writeText(getEmbedCode())
      .then(() => {
        alert(t.copied);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div 
      ref={widgetRef}
      className="widget-container bg-white font-sans"
      style={{ 
        maxWidth: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        transition: 'all 0.3s ease',
        height: isExpanded ? 'auto' : '350px'
      }}
    >
      <Helmet>
        <style>{`
          :root {
            --color-accent: ${accentColor};
            --color-primary: #1F2937;
            --color-background: white;
            --color-surface: #F9FAFB;
            --color-text-primary: #1F2937;
            --color-text-secondary: #6B7280;
            --color-border: #E5E7EB;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
          }
          
          .form-input {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border-radius: 0.375rem;
            border: 1px solid var(--color-border);
            background-color: white;
            font-size: 0.875rem;
            color: var(--color-text-primary);
          }
          
          .form-input:focus {
            outline: none;
            border-color: var(--color-accent);
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
          }
          
          .form-input:disabled {
            background-color: #F3F4F6;
            cursor: not-allowed;
          }
          
          .widget-container * {
            box-sizing: border-box;
          }
        `}</style>
      </Helmet>
      
      {/* Header */}
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center"
        style={{ backgroundColor: accentColor, color: 'white' }}
      >
        <h2 className="text-lg font-semibold flex items-center">
          <Icon name="Paintbrush" size={20} className="mr-2" />
          {t.title}
        </h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setLanguage(language === 'cs' ? 'en' : 'cs')}
            className="p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            aria-label="Switch language"
          >
            {language === 'cs' ? 'EN' : 'CS'}
          </button>
          <button 
            onClick={toggleExpand}
            className="p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            aria-label={isExpanded ? t.collapse : t.expand}
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Room Dimensions */}
            <RoomDimensionsInput
              formData={formData}
              onInputChange={handleInputChange}
              translations={t}
            />
            
            {/* Paint Type */}
            <ColorSelection
              formData={formData}
              onInputChange={handleInputChange}
              translations={t}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Number of Coats */}
            <CoatSelection
              formData={formData}
              onInputChange={handleInputChange}
              translations={t}
            />
            
            {/* Additional Services */}
            <AdditionalServices
              formData={formData}
              onInputChange={handleInputChange}
              translations={t}
            />
          </div>
          
          {/* Cost Summary */}
          <CostSummary
            calculatedCost={calculatedCost}
            calculatedArea={calculatedArea}
            paintLiters={paintLiters}
            translations={t}
          />
        </motion.div>
        
        {/* Embed Code Section - Only visible when expanded */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-700">{t.embedCode}</h3>
            </div>
            <div className="flex">
              <div className="flex-grow bg-gray-50 p-2 text-xs font-mono overflow-x-auto rounded-l-md border border-gray-200">
                <code>{getEmbedCode()}</code>
              </div>
              <button
                onClick={copyEmbedCode}
                className="flex items-center justify-center px-3 rounded-r-md"
                style={{ backgroundColor: accentColor, color: 'white' }}
              >
                <Icon name="Copy" size={16} className="mr-1" />
                <span className="text-xs">{t.copyCode}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Footer - Small signature */}
      <div className="px-4 py-2 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-200">
        powered by <a href="/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Malíři v černém</a>
      </div>
    </div>
  );
};

export default EmbeddableCalculatorWidget;