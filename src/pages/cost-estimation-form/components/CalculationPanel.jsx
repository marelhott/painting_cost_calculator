// src/pages/cost-estimation-form/components/CalculationPanel.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';
import { motion } from 'framer-motion';

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
    // Modify validation to only require email and phone
    // Remove the check for international prefix on phone
    const isEmailValid = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isPhoneValid = formData.phone && formData.phone.trim() !== '';

    return isEmailValid && isPhoneValid;
  };

  // Calculate the savings based on user selections
  const calculateSavings = () => {
    if (!formData.totalArea) return 0;

    let savings = 0;
    const area = parseFloat(formData.totalArea) || 0;
    const baseRate = 150;

    // Savings from empty space
    if (formData.emptySpace === 'yes') {
      savings += area * baseRate * 0.1; // 10% savings
    }

    // Savings from room count discounts
    const rooms = parseInt(formData.roomCount) || 0;
    if (rooms > 5) {
      savings += area * baseRate * 0.05; // 5% savings
    } else if (rooms > 3) {
      savings += area * baseRate * 0.02; // 2% savings
    }

    // Savings from paint provision
    if (formData.paintProvision === 'yes') {
      savings += area * 50; // Fixed savings per m²
    }

    return Math.round(savings);
  };

  const savings = calculateSavings();

  return (
    <div className="sticky top-24 z-30">
      <div className="bg-surface border border-border rounded-lg shadow-medium overflow-hidden">
        <div className="bg-accent/10 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center">
              <Icon name="Calculator" size={20} color="white" />
            </div>
            <h3 className="text-xl font-semibold text-primary">Kalkulace nákladů</h3>
          </div>
          
          <motion.div
            className="bg-white rounded-lg p-4 shadow-light"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}>

            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium text-primary">Odhadovaná cena:</span>
              <motion.span
                key={calculatedCost}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-primary animation-cost-update">

                {calculatedCost > 0 ? formatCurrency(calculatedCost) : '-'}
              </motion.span>
            </div>
            
            {savings > 0 &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between text-success bg-success/10 p-2 rounded-md">

                <span className="text-sm font-medium flex items-center">
                  <Icon name="TrendingDown" size={16} className="mr-1" /> Ušetříte:
                </span>
                <span className="font-medium">
                  {formatCurrency(savings)}
                </span>
              </motion.div>
            }
            
            <p className="text-xs text-text-secondary mt-2 italic">
              * Konečná cena může být upravena na základě osobní prohlídky
            </p>
          </motion.div>
        </div>

        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Typ povrchu:</span>
              <span className="font-medium text-text-primary">
                {formData.surfaceType === 'floor' ? 'Podlahová plocha' :
                formData.surfaceType === 'wall' ? 'Stěnová plocha' : '-'}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Plocha:</span>
              <span className="font-medium text-text-primary">
                {formData.totalArea ? `${formData.totalArea} m²` : '-'}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-text-secondary">Typ prostoru:</span>
              <span className="font-medium text-text-primary">
                {formData.spaceType === 'room' ? 'Místnost' :
                formData.spaceType === 'apartment' ? 'Byt' :
                formData.spaceType === 'house' ? 'Dům' :
                formData.spaceType === 'common-areas' ? 'Společné prostory' :
                formData.spaceType === 'office' ? 'Kancelář' :
                formData.spaceType === 'pension-hotel' ? 'Penzion/Hotel' :
                formData.spaceType === 'commercial' ? 'Komerční prostor' : '-'}
              </span>
            </div>

            {formData.repairLevel &&
            <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-text-secondary">Opravy:</span>
                <span className="font-medium text-text-primary">
                  {formData.repairLevel === 'none' ? 'Žádné' :
                formData.repairLevel === 'small' ? 'Malé' :
                formData.repairLevel === 'medium' ? 'Střední' :
                formData.repairLevel === 'large' ? 'Velké' : '-'}
                </span>
              </div>
            }
            
            {formData.roomCount &&
            <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-text-secondary">Počet místností:</span>
                <span className="font-medium text-text-primary">
                  {formData.roomCount}
                </span>
              </div>
            }
            
            {formData.ceilingHeight &&
            <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-text-secondary">Výška stropu:</span>
                <span className="font-medium text-text-primary">
                  {`${formData.ceilingHeight} cm`}
                </span>
              </div>
            }
          </div>

          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-150 ${
            isFormValid() && !isSubmitting ?
            'bg-accent text-white hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 shadow-medium hover:shadow-lg transform hover:-translate-y-1' :
            'bg-gray-300 text-gray-500 cursor-not-allowed'}`
            }>

            {isSubmitting ?
            <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Odesílání...</span>
              </div> :

            <div className="flex items-center justify-center space-x-2">
                <Icon name="Send" size={20} color="white" />
                <span>Odeslat poptávku</span>
              </div>
            }
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-text-secondary">
              Poptávka bude uložena do databáze a odeslána na email: 
              <br />
              <span className="font-medium">info@malirivcernem.cz</span>
            </p>
          </div>
          
          {/* Contact Information moved here */}
          <div className="mt-6 border-t border-border pt-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="var(--color-primary)" />
              </div>
              <h4 className="text-lg font-medium text-primary">Kontaktní údaje</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Jméno a příjmení *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="User" size={18} color="var(--color-secondary)" />
                  </div>
                  <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => onInputChange('customerName', e.target.value)}
                    placeholder="Jan Novák"
                    className="form-input pl-10 w-full" />

                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Telefon * <span className="text-xs text-text-secondary">(nutné vyplnit)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Phone" size={18} color="var(--color-secondary)" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => onInputChange('phone', e.target.value)}
                    placeholder="+420 123 456 789"
                    className={`form-input pl-10 w-full ${errors?.phone ? 'border-red-300 focus:border-red-500' : ''}`} />
                  {errors?.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email * <span className="text-xs text-text-secondary">(nutné vyplnit)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Mail" size={18} color="var(--color-secondary)" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    placeholder="jan.novak@email.cz"
                    className={`form-input pl-10 w-full ${errors?.email ? 'border-red-300 focus:border-red-500' : ''}`} />
                  {errors?.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Adresa malování
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Icon name="MapPin" size={18} color="var(--color-secondary)" />
                  </div>
                  <textarea
                    value={formData.address}
                    onChange={(e) => onInputChange('address', e.target.value)}
                    placeholder="Ulice a číslo popisné, město, PSČ"
                    rows={3}
                    className="form-input resize-none pl-10 w-full" />

                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-medium text-primary mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" /> Doplňující informace
            </h4>
            <ul className="text-sm text-text-secondary space-y-2">
              <li className="flex items-start">
                <Icon name="CheckCircle" size={14} className="mr-2 mt-1 text-success" />
                <span>Osobní prohlídka a konzultace zdarma</span>
              </li>
              <li className="flex items-start">
                <Icon name="CheckCircle" size={14} className="mr-2 mt-1 text-success" />
                <span>Detailní kalkulace do 24 hodin</span>
              </li>
              <li className="flex items-start">
                <Icon name="CheckCircle" size={14} className="mr-2 mt-1 text-success" />
                <span>Možnost zahájení prací do 14 dnů</span>
              </li>
              <li className="flex items-start">
                <Icon name="Database" size={14} className="mr-2 mt-1 text-primary" />
                <span>Vaše data jsou bezpečně uložena v databázi</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>);

};

export default CalculationPanel;