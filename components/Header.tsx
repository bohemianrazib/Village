import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onNavigate: (sectionId: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onNavigate, language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  const navItems = [
    { label: t.nav.home, id: 'home' },
    { label: t.nav.about, id: 'about' },
    { label: t.nav.gallery, id: 'gallery' },
    { label: t.nav.shop, id: 'shop' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-2xl font-bold text-green-700">{t.siteName}</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-stone-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-sm font-bold text-stone-600 border border-stone-300 rounded px-2 py-1 hover:bg-stone-100 hover:text-green-700"
            >
              <Globe size={16} />
              {language === 'bn' ? 'EN' : 'BN'}
            </button>
          </nav>

          {/* Cart Icon & Mobile Actions */}
          <div className="flex items-center gap-4">
             <button 
              onClick={onCartClick}
              className="relative p-2 text-stone-600 hover:text-green-700 transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            
            <div className="md:hidden flex items-center gap-4">
               {/* Mobile Language Toggle */}
               <button 
                onClick={toggleLanguage}
                className="font-bold text-stone-600 border border-stone-300 rounded px-2 py-1 text-xs"
              >
                {language === 'bn' ? 'EN' : 'BN'}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-stone-600 hover:text-green-700 focus:outline-none"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-green-700 hover:bg-stone-50"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;