// src/pages/company-overview/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';


import StatsBar from './components/StatsBar';
import HowItWorksSection from './components/HowItWorksSection';
import WhyUsSection from './components/WhyUsSection';
import PhotoGallery from './components/PhotoGallery';
import ContactFooter from './components/ContactFooter';

const CompanyOverview = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Navigation - Same as Homepage */}
      <header className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Name */}
          <div className="py-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold">
              MALÍŘI V ČERNÉM - RODINNÁ FIRMA
            </h1>
          </div>
          
          {/* Navigation Menu */}
          <nav className="py-4 border-t border-green-700">
            <div className="flex flex-wrap justify-center space-x-8">
              <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-200 py-2 px-3">
                DOMŮ
              </Link>
              <Link to="#" className="text-white hover:text-yellow-300 transition-colors duration-200 py-2 px-3">
                NABÍDKA
              </Link>
              <Link to="/cost-estimation-form" className="text-white hover:text-yellow-300 transition-colors duration-200 py-2 px-3">
                KALKULAČKA
              </Link>
              <Link to="/company-overview" className="text-white hover:text-yellow-300 transition-colors duration-200 py-2 px-3">
                O NÁS
              </Link>
              <Link to="#" className="text-white hover:text-yellow-300 transition-colors duration-200 py-2 px-3">
                NĚCO NAVÍC
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {/* Statistics Bar */}
        <StatsBar />
        
        {/* How It Works Section */}
        <HowItWorksSection />
        
        {/* Why Us Section */}
        <WhyUsSection />
        
        {/* Photo Gallery Section */}
        <PhotoGallery />
      </main>

      {/* Contact Footer */}
      <ContactFooter />
    </div>
  );
};

export default CompanyOverview;