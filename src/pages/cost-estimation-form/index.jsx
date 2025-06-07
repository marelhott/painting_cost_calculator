// src/pages/cost-estimation-form/index.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import FormSection from './components/FormSection';
import CalculationPanel from './components/CalculationPanel';
import SchedulingSection from './components/SchedulingSection';
import { motion } from 'framer-motion';
import { useSupabase } from '../../context/SupabaseContext';

const CostEstimationForm = () => {
  const { submitOrder, loading, error, setError } = useSupabase();
  
  const [formData, setFormData] = useState({
    surfaceType: '',
    repairLevel: '',
    paintProvision: '',
    furnitureHandling: '',
    emptySpace: '',
    carpetPresence: '',
    spaceType: '',
    totalArea: '',
    roomCount: '',
    ceilingHeight: '',
    customerName: '',
    address: '',
    phone: '',
    email: '',
    preferredDate: '',
    additionalInfo: ''
  });

  const [calculatedCost, setCalculatedCost] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Cost calculation logic
  useEffect(() => {
    calculateCost();
  }, [formData]);

  // Clear Supabase error when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const calculateCost = () => {
    let baseCost = 0;
    const area = parseFloat(formData.totalArea) || 0;
    const rooms = parseInt(formData.roomCount) || 0;
    const height = parseFloat(formData.ceilingHeight) || 0;

    if (area === 0) {
      setCalculatedCost(0);
      return;
    }

    // Base cost per square meter
    let costPerSqm = 150; // Base rate in CZK

    // Surface type multiplier
    if (formData.surfaceType === 'wall') {
      costPerSqm *= 1.2;
    }

    // Repair level multiplier
    switch (formData.repairLevel) {
      case 'small':
        costPerSqm *= 1.1;
        break;
      case 'medium':
        costPerSqm *= 1.3;
        break;
      case 'large':
        costPerSqm *= 1.6;
        break;
      default:
        break;
    }

    // Additional services
    if (formData.paintProvision === 'yes') {
      costPerSqm += 50;
    }
    if (formData.furnitureHandling === 'yes') {
      costPerSqm += 30;
    }
    if (formData.carpetPresence === 'yes') {
      costPerSqm += 20;
    }

    // Space type multiplier
    switch (formData.spaceType) {
      case 'apartment':
        costPerSqm *= 1.1;
        break;
      case 'house':
        costPerSqm *= 1.2;
        break;
      case 'office':
        costPerSqm *= 1.3;
        break;
      case 'commercial':
        costPerSqm *= 1.4;
        break;
      case 'pension-hotel':
        costPerSqm *= 1.5;
        break;
      default:
        break;
    }

    // Ceiling height adjustment
    if (height > 300) {
      costPerSqm *= 1.2;
    } else if (height > 250) {
      costPerSqm *= 1.1;
    }

    // Room count adjustment - new rule
    if (rooms > 5) {
      costPerSqm *= 0.95; // 5% discount for larger projects
    } else if (rooms > 3) {
      costPerSqm *= 0.98; // 2% discount for medium projects
    }

    // Empty space adjustment - new rule
    if (formData.emptySpace === 'yes') {
      costPerSqm *= 0.9; // 10% discount if space is empty
    }

    baseCost = area * costPerSqm;
    setCalculatedCost(Math.round(baseCost));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear success message if user starts editing after successful submission
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation - modified to only validate email and phone for submission
    // Other validations remain for data quality, but don't block submission
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Toto pole je povinné';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Neplatný formát emailu';
    }

    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Toto pole je povinné';
    }
    
    // Remove international prefix validation for phone
    // Check the format for data quality but don't require the +420 prefix
    
    // Area validation for data quality
    if (formData.totalArea && (parseFloat(formData.totalArea) <= 0 || parseFloat(formData.totalArea) > 10000)) {
      newErrors.totalArea = 'Plocha musí být mezi 1 a 10000 m²';
    }

    // Room count validation for data quality
    if (formData.roomCount && (parseInt(formData.roomCount) <= 0 || parseInt(formData.roomCount) > 50)) {
      newErrors.roomCount = 'Počet místností musí být mezi 1 a 50';
    }

    // Ceiling height validation for data quality
    if (formData.ceilingHeight && (parseFloat(formData.ceilingHeight) < 200 || parseFloat(formData.ceilingHeight) > 500)) {
      newErrors.ceilingHeight = 'Výška stropu musí být mezi 200 a 500 cm';
    }

    setErrors(newErrors);
    
    // Return true if email and phone are valid (for form submission)
    return !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitOrder(formData, calculatedCost);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        surfaceType: '',
        repairLevel: '',
        paintProvision: '',
        furnitureHandling: '',
        emptySpace: '',
        carpetPresence: '',
        spaceType: '',
        totalArea: '',
        roomCount: '',
        ceilingHeight: '',
        customerName: '',
        address: '',
        phone: '',
        email: '',
        preferredDate: '',
        additionalInfo: ''
      });
      
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Došlo k neočekávané chybě při odesílání.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Title Section - Simplified to text only */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Malíři v černém
            </h1>
            <div className="h-1 bg-accent w-48 mx-auto mb-6"></div>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Získejte okamžitou cenovou nabídku pro vaše malířské práce. Vyplňte formulář a my vám pošleme detailní kalkulaci.
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <Icon name="CheckCircle" size={20} color="#10B981" className="mr-3" />
                <div>
                  <h3 className="text-green-800 font-medium">Poptávka byla úspěšně odeslána!</h3>
                  <p className="text-green-600 text-sm mt-1">
                    Brzy se vám ozveme s detailní nabídkou na email: <strong>{formData.email}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center">
                <Icon name="AlertCircle" size={20} color="#EF4444" className="mr-3" />
                <div>
                  <h3 className="text-red-800 font-medium">Chyba při odesílání</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* Surface Type Section - Full width restored */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full">                <FormSection
                  title="Typ povrchu"
                  icon="Layers"
                  required
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { value: 'floor', label: 'Podlahová plocha', icon: 'Square', image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg' },
                      { value: 'wall', label: 'Stěnová plocha', icon: 'RectangleVertical', image: 'https://images.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex flex-col overflow-hidden rounded-lg cursor-pointer transition-all duration-150 shadow-light hover:shadow-medium ${
                          formData.surfaceType === option.value
                            ? 'ring-2 ring-accent' :'ring-1 ring-border'
                        }`}
                      >
                        <input
                          type="radio"
                          name="surfaceType"
                          value={option.value}
                          checked={formData.surfaceType === option.value}
                          onChange={(e) => handleInputChange('surfaceType', e.target.value)}
                          className="sr-only"
                        />
                        <div className="h-36 overflow-hidden">
                          <Image src={option.image} alt={option.label} className="w-full h-full object-cover" />
                        </div>
                        <div className={`flex items-center space-x-3 p-4 ${formData.surfaceType === option.value ? 'bg-yellow-50' : 'bg-surface'}`}>
                          <Icon name={option.icon} size={24} color={formData.surfaceType === option.value ? 'var(--color-accent)' : 'var(--color-secondary)'} />
                          <span className={`font-medium ${formData.surfaceType === option.value ? 'text-primary' : 'text-text-secondary'}`}>
                            {option.label}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.surfaceType && <p className="text-error text-sm mt-2">{errors.surfaceType}</p>}
                </FormSection>
              </motion.div>

              {/* Property Details Section - Moved up after surface type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FormSection
                  title="Detaily nemovitosti"
                  icon="Building"
                  required
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Typ prostoru *
                      </label>
                      <select
                        value={formData.spaceType}
                        onChange={(e) => handleInputChange('spaceType', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Vyberte typ prostoru</option>
                        <option value="room">Místnost</option>
                        <option value="apartment">Byt</option>
                        <option value="house">Dům</option>
                        <option value="common-areas">Společné prostory</option>
                        <option value="office">Kancelář</option>
                        <option value="pension-hotel">Penzion/Hotel</option>
                        <option value="commercial">Komerční prostor</option>
                      </select>
                      {errors.spaceType && <p className="text-error text-sm mt-1">{errors.spaceType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Celková plocha (m²) *
                      </label>
                      <input
                        type="number"
                        value={formData.totalArea}
                        onChange={(e) => handleInputChange('totalArea', e.target.value)}
                        placeholder="např. 50"
                        min="1"
                        max="10000"
                        className="form-input"
                      />
                      {errors.totalArea && <p className="text-error text-sm mt-1">{errors.totalArea}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Počet místností
                      </label>
                      <input
                        type="number"
                        value={formData.roomCount}
                        onChange={(e) => handleInputChange('roomCount', e.target.value)}
                        placeholder="např. 3"
                        min="1"
                        max="50"
                        className="form-input"
                      />
                      {errors.roomCount && <p className="text-error text-sm mt-1">{errors.roomCount}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Výška stropu (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.ceilingHeight}
                        onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
                        placeholder="např. 270"
                        min="200"
                        max="500"
                        className="form-input"
                      />
                      {errors.ceilingHeight && <p className="text-error text-sm mt-1">{errors.ceilingHeight}</p>}
                    </div>
                  </div>
                </FormSection>
              </motion.div>

              {/* Repair Level Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <FormSection
                  title="Úroveň oprav"
                  icon="Wrench"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { value: 'none', label: 'Žádné opravy', icon: 'Check', desc: 'Pouze malování' },
                      { value: 'small', label: 'Malé opravy', icon: 'Minus', desc: 'Drobné trhliny a praskliny' },
                      { value: 'medium', label: 'Střední opravy', icon: 'Equal', desc: 'Větší trhliny, opravy omítky' },
                      { value: 'large', label: 'Velké opravy', icon: 'Plus', desc: 'Rozsáhlé opravy povrchu' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-all duration-150 ${
                          formData.repairLevel === option.value
                            ? 'border-accent bg-yellow-50' :'border-border hover:border-accent hover:shadow-light'
                        }`}
                      >
                        <input
                          type="radio"
                          name="repairLevel"
                          value={option.value}
                          checked={formData.repairLevel === option.value}
                          onChange={(e) => handleInputChange('repairLevel', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${formData.repairLevel === option.value ? 'bg-accent' : 'bg-surface border border-border'}`}>
                          <Icon 
                            name={option.icon} 
                            size={24} 
                            color={formData.repairLevel === option.value ? 'white' : 'var(--color-secondary)'} 
                          />
                        </div>
                        <span className={`text-sm font-medium text-center ${formData.repairLevel === option.value ? 'text-primary' : 'text-text-secondary'}`}>
                          {option.label}
                        </span>
                        <span className="text-xs text-text-secondary text-center mt-1">{option.desc}</span>
                      </label>
                    ))}
                  </div>
                </FormSection>
              </motion.div>

              {/* Service Preferences */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <FormSection
                  title="Preference služeb"
                  icon="Settings"
                >
                  <div className="space-y-4">
                    {[
                      { key: 'paintProvision', label: 'Dodáváme barvu?', icon: 'Palette', desc: 'Máte-li vlastní barvu, ušetříte na nákladech' },
                      { key: 'furnitureHandling', label: 'Potřebujete posouvání nábytku?', icon: 'Package', desc: 'Zahrnuje opatrnou manipulaci s vašim nábytkem' },
                      { key: 'emptySpace', label: 'Je prostor prázdný?', icon: 'Home', desc: 'Prázdné prostory umožňují rychlejší práci' },
                      { key: 'carpetPresence', label: 'Je v prostoru koberec?', icon: 'Square', desc: 'Koberce vyžadují zvláštní ochranu' }
                    ].map((item) => (
                      <div key={item.key} className="bg-surface border border-border rounded-lg overflow-hidden transition-all duration-150 hover:shadow-light">
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                              <Icon name={item.icon} size={20} color="var(--color-primary)" />
                            </div>
                            <div>
                              <span className="font-medium text-text-primary">{item.label}</span>
                              <p className="text-xs text-text-secondary mt-1">{item.desc}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {['yes', 'no'].map((value) => (
                              <label
                                key={value}
                                className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-150 ${
                                  formData[item.key] === value
                                    ? 'bg-accent text-white' :'bg-background text-text-secondary hover:bg-border'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={item.key}
                                  value={value}
                                  checked={formData[item.key] === value}
                                  onChange={(e) => handleInputChange(item.key, e.target.value)}
                                  className="sr-only"
                                />
                                {value === 'yes' ? 'Ano' : 'Ne'}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormSection>
              </motion.div>

              {/* Scheduling */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <SchedulingSection
                  formData={formData}
                  errors={errors}
                  onInputChange={handleInputChange}
                />
              </motion.div>
            </div>

            {/* Calculation Panel - Contact info integrated directly in this panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <CalculationPanel
                  calculatedCost={calculatedCost}
                  formData={formData}
                  isSubmitting={isSubmitting || loading}
                  onInputChange={handleInputChange}
                  errors={errors}
                />
              </motion.div>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-16 mb-8">
            <h3 className="text-xl font-semibold text-center mb-8">Proč zvolit naše služby</h3>
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
                  className="bg-surface p-6 rounded-lg border border-border text-center shadow-light"
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
          
          {/* Disclaimer */}
          <div className="mt-8 text-xs text-text-secondary p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-primary mb-3 text-sm">Důležité informace k ceně:</h4>
            <ul className="space-y-2 list-disc pl-5">
              <li>K celkové ceně je už v online kalkulaci automaticky připočtena cena za úklid.</li>
              <li>Podkladová penetrace není součástí kalkulace a bude zaceněna jen v případě, že bude potřeba (zjistíme až na místě).</li>
              <li>V ceně každé zakázky při potvrzením nákupu barvy je v ceně primalex plus, všechny ostatní barvy jako například tónované, plně omyvatelné, disperzní apod budou dle dohody s klientem zaceněny navíc dle domluvy na místě.</li>
              <li>Tónované barvy a jejich výmalba je součastí kalkulace až na místě s klientem.</li>
              <li>Doprava po Praze je v ceně, bližší až vzdálenější okolí Prahy bude zpoplatněno dle vzdálenosti a dle dohody.</li>
              <li>Speciální opravy a úpravy jako je strhávání tapet, odstraňování skvrn, celopošný štuk, stěrkování apod jsou řešeny a naceňovány navíc až na místě.</li>
              <li>Žádné opravy - jedná se o žádné, nebo minimální opravy jako vyspravení pár dírek po obrazech.</li>
              <li>Malé opravy: jedná se o vyplnění malých otvorů a opravu drobných trhlin, obitých rohů, menší tmelení.</li>
              <li>Střední opravy: jedná se o lokální škrábání menších ploch, rozsáhlejší trhliny, vyspravení omítek, vyrovnání i oprava poškozených štuků.</li>
              <li>Velké opravy: jedná se o rozsáhlejší škrábání (v případě celoplošného škrábání je potřeba dodatečných prací, doceněno na místě malířem) a jakékoli rozsáhlejší opravy na větších plochách, které však nezahrnují stěrkování.</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                  <Icon name="Paintbrush" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold">Malíři v černém</span>
              </div>
              <p className="text-white/70 mt-2 text-sm">Profesionální malířské služby</p>
            </div>
            <div className="flex flex-col space-y-1">
              <a href="tel:+420732333550" className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Icon name="Phone" size={16} />
                <span>+420 732 333 550</span>
              </a>
              <a href="mailto:info@malirivcernem.cz" className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Icon name="Mail" size={16} />
                <span>info@malirivcernem.cz</span>
              </a>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 pt-6 text-center md:text-left">
            <p className="text-white/50 text-sm">© 2023 Malíři v černém. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CostEstimationForm;