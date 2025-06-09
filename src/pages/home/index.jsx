// src/pages/home/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';

// Import components from company overview
import StatsBar from '../company-overview/components/StatsBar';
import HowItWorksSection from '../company-overview/components/HowItWorksSection';
import WhyUsSection from '../company-overview/components/WhyUsSection';
import PhotoGallery from '../company-overview/components/PhotoGallery';
import ContactFooter from '../company-overview/components/ContactFooter';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation - Updated to dark green exactly as requested */}
      <header className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Company Name */}
          <div className="py-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              MALÍŘI V ČERNÉM
            </h1>
            <p className="text-lg md:text-xl text-white mt-1 font-medium">
              - RODINNÁ FIRMA -
            </p>
          </div>
          
          {/* Navigation Menu */}
          <nav className="py-4 border-t border-white/20">
            <div className="flex flex-wrap justify-center space-x-8">
              <Link to="/" className="text-white hover:text-accent transition-colors duration-200 py-2 px-3 font-medium">
                DOMŮ
              </Link>
              <Link to="#" className="text-white hover:text-accent transition-colors duration-200 py-2 px-3 font-medium">
                NABÍDKA
              </Link>
              <Link to="/cost-estimation-form" className="text-white hover:text-accent transition-colors duration-200 py-2 px-3 font-medium">
                KALKULAČKA
              </Link>
              <Link to="/company-overview" className="text-white hover:text-accent transition-colors duration-200 py-2 px-3 font-medium">
                O NÁS
              </Link>
              <Link to="#" className="text-white hover:text-accent transition-colors duration-200 py-2 px-3 font-medium">
                NĚCO NAVÍC
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main>
        {/* Hero Section - Updated with better typography */}
        <section className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  Malování bytů, domů, kanceláří v Praze a okolí.
                  <br />
                  <span className="text-primary mt-2 block">
                    Kvalitně, rychle a s péčí o detail - barvy dodáme, spokojenost zaručíme!
                  </span>
                </h2>
                
                <p className="text-lg text-text-secondary leading-relaxed">
                  Poskytujeme kompletní malířské služby pro soukromé i komerční prostory. 
                  Naši zkušení malíři se postarají o kvalitní výsledek, který překoná vaše očekávání.
                  S námi máte jistotu profesionálního přístupu a dlouhodobé spokojenosti.
                </p>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <Image
                  src="https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=1000"
                  alt="Malířské potřeby - plechovky barev, váleček a štětec na bílém dřevěném povrchu"
                  className="w-full h-auto rounded-lg shadow-light"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Yellow Section - Moved to middle as requested */}
        <section className="bg-accent py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-primary">
                Získejte cenovou nabídku ještě dnes!
              </h3>
              <p className="text-lg text-primary/80 max-w-2xl mx-auto">
                Využijte naši online kalkulačku pro rychlý odhad ceny nebo nás kontaktujte pro osobní konzultaci.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <Link
                  to="/cost-estimation-form"
                  className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 shadow-medium hover:shadow-light"
                >
                  Spočítejte cenu
                </Link>
                
                <a
                  href="tel:+420732333550"
                  className="inline-flex items-center space-x-3 text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <Icon name="Phone" size={24} />
                  <span>+420 732 333 550</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Statistics Bar - Added from company overview */}
        <StatsBar />

        {/* How It Works Section - Added from company overview */}
        <HowItWorksSection />

        {/* Services Section - Updated with modern design */}
        <section className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Service 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <Icon name="Home" size={32} color="white" />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  NAŠE SPECIALIZACE JSOU INTERIÉRY
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Specializujeme se na malování interiérů bytů, domů a kanceláří. 
                  Máme bohaté zkušenosti s různými typy povrchů a materiálů. 
                  Každý projekt přizpůsobujeme individuálním požadavkům zákazníka.
                </p>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <Icon name="Wrench" size={32} color="white" />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  OPRAVÍME ZDI PŘED VÝMALBOU
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Před samotným malováním provedeme všechny potřebné opravy zdí. 
                  Vyspravíme trhliny, vyrovnáme nerovnosti a připravíme povrch pro dokonalý výsledek. 
                  Kvalitní příprava je základem dlouhotrvajícího výsledku.
                </p>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <Icon name="Clock" size={32} color="white" />
                </div>
                <h3 className="text-xl font-bold text-primary">
                  EXPRES A VÍKENDOVÉ TERMÍNY
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Nabízíme flexibilní termíny včetně víkendových a expresních služeb. 
                  Rozumíme, že někdy je potřeba práce dokončit rychle. 
                  Přizpůsobíme se vašemu časovému harmonogramu a potřebám.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Us Section - Added from company overview */}
        <WhyUsSection />

        {/* Photo Gallery Section - Added from company overview */}
        <PhotoGallery />

        {/* Trust Indicators Section - Updated with modern design */}
        <section className="bg-surface py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">Proč zvolit naše služby</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: 'Award', title: 'Kvalitní provedení', desc: 'Garantujeme profesionální výsledek a spokojenost s každou prací' },
                { icon: 'Clock', title: 'Rychlé dokončení', desc: 'Dodržujeme dohodnuté termíny a pracujeme efektivně' },
                { icon: 'Shield', title: 'Záruka 24 měsíců', desc: 'Na všechny naše práce poskytujeme plnou záruku kvality' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="bg-background p-6 rounded-lg border border-border text-center shadow-light"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Icon name={item.icon} size={32} color="var(--color-accent)" />
                  </div>
                  <h4 className="text-lg font-medium text-primary mb-2">{item.title}</h4>
                  <p className="text-text-secondary">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Contact Footer - Added from company overview */}
      <ContactFooter />
    </div>
  );
};

export default HomePage;