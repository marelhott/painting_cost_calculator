// src/pages/company-overview/components/WhyUsSection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const WhyUsSection = () => {
  const leftPoints = [
    'Více než 500 úspěšně dokončených zakázek',
    'Přímý kontakt se zákazníkem bez prostředníků',
    'Dodržujeme smluvené termíny a časy',
    'Kvalitní materiály a certifikované barvy',
    'Profesionální přístup a dlouholeté zkušenosti',
    'Čistota a pořádek během i po práci',
    'Konkurenceschopné ceny bez skrytých poplatků'
  ];

  const rightPoints = [
    'Expresní a víkendové termíny k dispozici',
    'Záruka na všechny provedené práce',
    'Bezplatné konzultace a cenové nabídky',
    'Flexibilní přístup k individuálním požadavkům',
    'Rodinná firma s tradicí a důvěryhodností',
    'Moderní techniky a postupy malování'
  ];

  return (
    <section className="bg-surface py-16">
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
            Proč my?
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        {/* Two Column Bullet Points */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {leftPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {rightPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="flex items-start space-x-3"
              >
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;