// src/pages/company-overview/components/HowItWorksSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const HowItWorksSection = () => {
  const steps = [
    {
      title: 'Kalkulace a objednávka',
      description: 'Využijte naší online kalkulačky pro rychlý odhad ceny nebo nás kontaktujte přímo. Provedeme nezávaznou konzultaci a připravíme detailní cenovou nabídku přesně podle vašich požadavků.',
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Příprava a realizace',
      description: 'Naši zkušení malíři důkladně připraví všechny povrchy, provedou potřebné opravy a aplikují kvalitní barvy. Pracujeme rychle, čistě a s maximální péčí o detail.',
      image: 'https://images.pixabay.com/photo/2020/03/09/17/49/painting-4916302_960_720.jpg'
    },
    {
      title: 'Kontrola a fakturace',
      description: 'Po dokončení práce provedeme společnou kontrolu kvality. Předáme vám všechny potřebné dokumenty a fakturu. Poskytujeme záruku na všechny provedené práce.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces'
    }
  ];

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Jak to funguje?
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-surface rounded-lg shadow-light overflow-hidden hover:shadow-medium transition-all duration-300"
            >
              {/* Card Image */}
              <div className="h-48 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">
                  {step.title}
                </h3>
                <div className="bg-background p-4 rounded-md border border-border">
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;