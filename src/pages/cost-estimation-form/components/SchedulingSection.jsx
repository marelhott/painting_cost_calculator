import React from 'react';
import FormSection from './FormSection';
import Icon from '../../../components/AppIcon';

const SchedulingSection = ({ formData, errors, onInputChange }) => {
  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <FormSection
      title="Termín a dodatečné informace"
      icon="Calendar"
      required
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Preferovaný termín zahájení prací *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Calendar" size={18} color="var(--color-secondary)" />
            </div>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => onInputChange('preferredDate', e.target.value)}
              min={today}
              className="form-input pl-10"
            />
          </div>
          {errors.preferredDate && <p className="text-error text-sm mt-1">{errors.preferredDate}</p>}
          <p className="text-sm text-text-secondary mt-1 flex items-center">
            <Icon name="Info" size={14} className="mr-1" />
            Termín je orientační, přesný termín dohodneme po prohlídce
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Dodatečné informace
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <Icon name="MessageSquare" size={18} color="var(--color-secondary)" />
            </div>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => onInputChange('additionalInfo', e.target.value)}
              placeholder="Zde můžete uvést jakékoliv další informace o projektu, specifické požadavky, přístupnost prostoru, atd."
              rows={4}
              className="form-input resize-none pl-10"
            />
          </div>
          <div className="mt-3 p-3 bg-surface rounded-md border border-border">
            <h4 className="text-sm font-medium text-primary mb-2 flex items-center">
              <Icon name="Lightbulb" size={16} className="mr-2 text-accent" />
              Tipy pro dodatečné informace:
            </h4>
            <ul className="text-sm text-text-secondary space-y-1 ml-6 list-disc">
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