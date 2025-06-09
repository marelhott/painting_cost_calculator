// src/pages/company-overview/components/ContactFooter.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactFooter = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Adresa',
      content: 'Františka Křížka 1133/8',
      subtitle: 'Praha 7, 17 000',
      additionalInfo: 'IČ: 64347532',
      href: 'https://maps.google.com/?q=Františka+Křížka+1133/8+Praha+7'
    },
    {
      icon: 'Phone',
      title: 'Telefon',
      content: '+420 732 333 550',
      subtitle: 'Mgr. Marek Hospodářský',
      href: 'tel:+420732333550'
    },
    {
      icon: 'Mail',
      title: 'Email',
      content: 'info@malirivcernem.cz',
      href: 'mailto:info@malirivcernem.cz'
    },
    {
      icon: 'MessageCircle',
      title: 'WhatsApp',
      content: '+420 732 333 550',
      href: 'https://wa.me/420732333550'
    }
  ];

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Spojte se s námi
          </h2>
        </motion.div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center space-y-3"
            >
              {/* Contact Icon */}
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                  <Icon name={contact.icon} size={24} color="white" />
                </div>
              </div>
              
              {/* Contact Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">
                  {contact.title}
                </h3>
                
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : '_self'}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block text-gray-300 hover:text-accent transition-colors duration-200 text-sm"
                  >
                    <div className="font-medium">{contact.content}</div>
                    {contact.subtitle && (
                      <div className="text-xs mt-1">{contact.subtitle}</div>
                    )}
                    {contact.additionalInfo && (
                      <div className="text-xs mt-1">{contact.additionalInfo}</div>
                    )}
                  </a>
                ) : (
                  <div className="text-gray-300 text-sm">
                    <div className="font-medium">{contact.content}</div>
                    {contact.subtitle && (
                      <div className="text-xs mt-1">{contact.subtitle}</div>
                    )}
                    {contact.additionalInfo && (
                      <div className="text-xs mt-1">{contact.additionalInfo}</div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-secondary mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 Malíři v černém - Rodinná firma. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;