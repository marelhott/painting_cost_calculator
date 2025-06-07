import React from 'react';
import FormSection from './FormSection';
import Icon from '../../../components/AppIcon';

const CustomerInfoSection = ({ formData, errors, onInputChange }) => {
  return (
    <FormSection
      title="Kontaktní údaje"
      icon="User"
      required
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="form-input pl-10"
            />
          </div>
          {errors.customerName && <p className="text-error text-sm mt-1">{errors.customerName}</p>}
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
              className="form-input pl-10"
            />
          </div>
          {errors.phone && <p className="text-error text-sm mt-1">{errors.phone}</p>}
        </div>

        <div className="md:col-span-2">
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
              className="form-input pl-10"
            />
          </div>
          {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="md:col-span-2">
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
              className="form-input resize-none pl-10"
            />
          </div>
          {errors.address && <p className="text-error text-sm mt-1">{errors.address}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default CustomerInfoSection;