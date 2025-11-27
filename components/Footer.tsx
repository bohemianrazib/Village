import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = translations[language];

  return (
    <footer className="bg-stone-900 text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{t.siteName}</h3>
            <p className="text-sm leading-relaxed mb-4">
              {t.footer.desc}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-green-500 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.links}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="hover:text-green-500 transition-colors">{t.nav.home}</a></li>
              <li><a href="#about" className="hover:text-green-500 transition-colors">{t.nav.about}</a></li>
              <li><a href="#shop" className="hover:text-green-500 transition-colors">{t.nav.shop}</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">{t.nav.gallery}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-green-500" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-green-500" />
                <span>+৮৮০ ১৭১১ ১২৩৪৫৬</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-green-500" />
                <span>hello@khalishakundi.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;