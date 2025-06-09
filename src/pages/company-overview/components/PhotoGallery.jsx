// src/pages/company-overview/components/PhotoGallery.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoGallery = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Moderní obývací pokoj s čistě vymalovanými stěnami'
    },
    {
      src: 'https://images.pixabay.com/photo/2017/03/28/12/10/chairs-2181947_1280.jpg',
      alt: 'Elegantní chodba s profesionálně provedenou výmalbou'
    },
    {
      src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      alt: 'Stylová kuchyň s kvalitní malířskou úpravou'
    },
    {
      src: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Luxusní schodiště s precizně vymalovanými zábradlími'
    },
    {
      src: 'https://images.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_1280.jpg',
      alt: 'Světlá ložnice s jemnou barevnou úpravou'
    },
    {
      src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      alt: 'Pracovní místnost s profesionální výmalbou'
    },
    {
      src: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800',
      alt: 'Koupelna s vodoodolnou malířskou úpravou'
    },
    {
      src: 'https://images.pixabay.com/photo/2016/11/30/08/46/living-room-1872192_1280.jpg',
      alt: 'Reprezentativní vstupní hala'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

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
            Naše realizace
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              className={`relative cursor-pointer overflow-hidden rounded-lg shadow-light hover:shadow-medium transition-all duration-300 ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              } ${
                index === 4 ? 'col-span-2' : ''
              } ${
                index === 7 ? 'md:row-span-2' : ''
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition-transform duration-300 hover:scale-110 ${
                  index === 0 ? 'h-80 md:h-96' : 'h-40 md:h-48'
                } ${
                  index === 7 ? 'md:h-96' : ''
                }`}
              />
              
              {/* Overlay with carousel indicator on featured image */}
              {index === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="bg-accent bg-opacity-90 rounded-full p-3"
                  >
                    <Icon name="ChevronRight" size={24} color="white" />
                  </motion.div>
                </div>
              )}
              
              {/* Image counter overlay */}
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                {index + 1}/{galleryImages.length}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevImage}
            className="p-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Předchozí obrázek"
          >
            <Icon name="ChevronLeft" size={20} />
          </button>
          
          <span className="text-text-secondary font-medium">
            {currentImageIndex + 1} / {galleryImages.length}
          </span>
          
          <button
            onClick={nextImage}
            className="p-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Další obrázek"
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>

        {/* Current Image Display */}
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="relative max-w-2xl mx-auto">
            <Image
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="w-full h-80 object-cover rounded-lg shadow-light"
            />
            <p className="mt-4 text-text-secondary italic">
              {galleryImages[currentImageIndex].alt}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;