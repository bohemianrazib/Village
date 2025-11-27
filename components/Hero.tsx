import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeroProps {
  onShopClick: () => void;
  language: Language;
}

const IMAGES = [
  "https://picsum.photos/id/1018/1920/1080", // Nature
  "https://picsum.photos/id/1039/1920/1080", // Greenery
  "https://picsum.photos/id/1028/1920/1080", // Forest
  "https://picsum.photos/id/1015/1920/1080", // River/Water
];

const Hero: React.FC<HeroProps> = ({ onShopClick, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = translations[language];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      {IMAGES.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Village view ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8 font-light text-stone-100 animate-fade-in-up delay-100">
          {t.hero.subtitle}
        </p>
        <button
          onClick={onShopClick}
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-green-900 bg-white hover:bg-green-50 md:text-lg transition-all transform hover:scale-105 shadow-lg animate-fade-in-up delay-200"
        >
          {t.hero.cta}
          <ArrowRight className="ml-2 -mr-1" size={20} />
        </button>
      </div>
      
      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;