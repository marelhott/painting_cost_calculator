import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} color="var(--color-warning)" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Stránka nebyla nalezena
          </h2>
          <p className="text-text-secondary mb-8">
            Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
          </p>
        </div>
        
        <Link
          to="/cost-estimation-form"
          className="btn-primary inline-flex items-center space-x-2"
        >
          <Icon name="Home" size={20} />
          <span>Zpět na kalkulačku</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;