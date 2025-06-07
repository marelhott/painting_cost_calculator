import React from 'react';
import Icon from '../../../components/AppIcon';

const FormSection = ({ title, icon, required = false, children }) => {
  return (
    <div className="form-section group transition-all duration-200 hover:shadow-medium">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
          <Icon name={icon} size={22} color="white" />
        </div>
        <h2 className="text-xl font-semibold text-primary">
          {title}
          {required && <span className="text-error ml-1">*</span>}
        </h2>
      </div>
      {children}
    </div>
  );
};

export default FormSection;