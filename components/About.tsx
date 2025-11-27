import React from 'react';
import { MapPin, Users, TreePine } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface AboutProps {
  language: Language;
}

const About: React.FC<AboutProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section id="about" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t.about.title}</h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-stone-600 text-lg leading-relaxed">
            <p>{t.about.desc1}</p>
            <p>{t.about.desc2}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                <MapPin className="text-green-600 mb-2" size={32} />
                <span className="font-semibold text-stone-800">{t.about.stats.river}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                <Users className="text-green-600 mb-2" size={32} />
                <span className="font-semibold text-stone-800">{t.about.stats.people}</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-stone-100">
                <TreePine className="text-green-600 mb-2" size={32} />
                <span className="font-semibold text-stone-800">{t.about.stats.beauty}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://picsum.photos/id/10/400/500" 
              alt="Village view 1" 
              className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
            />
            <img 
              src="https://picsum.photos/id/11/400/500" 
              alt="Village view 2" 
              className="rounded-2xl shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;