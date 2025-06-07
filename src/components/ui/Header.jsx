import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const companyInfo = {
    name: "MalovaniPro",
    phone: "+420 123 456 789",
    email: "info@malovanipro.cz"
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${companyInfo.phone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${companyInfo.email}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-60 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <Icon name="Paintbrush" size={20} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">
                    {companyInfo.name}
                  </span>
                  <div className="h-0.5 bg-accent w-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Contact Information */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={handlePhoneClick}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-150 focus-ring rounded-md px-3 py-2"
            >
              <Icon name="Phone" size={18} />
              <span className="font-medium">{companyInfo.phone}</span>
            </button>
            
            <button
              onClick={handleEmailClick}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-150 focus-ring rounded-md px-3 py-2"
            >
              <Icon name="Mail" size={18} />
              <span className="font-medium">{companyInfo.email}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-primary focus-ring rounded-md p-2"
              aria-label="Toggle contact menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Contact Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={handlePhoneClick}
                className="flex items-center space-x-3 w-full text-left px-3 py-3 text-text-secondary hover:text-primary hover:bg-background transition-colors duration-150 rounded-md focus-ring"
              >
                <Icon name="Phone" size={20} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Zavolejte nám</span>
                  <span className="text-sm">{companyInfo.phone}</span>
                </div>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center space-x-3 w-full text-left px-3 py-3 text-text-secondary hover:text-primary hover:bg-background transition-colors duration-150 rounded-md focus-ring"
              >
                <Icon name="Mail" size={20} />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Napište nám</span>
                  <span className="text-sm">{companyInfo.email}</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;