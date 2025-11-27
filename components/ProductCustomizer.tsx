import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check } from 'lucide-react';
import { Product, SloganTone, Language } from '../types';
import { generateSlogan } from '../services/geminiService';
import { translations } from '../utils/translations';

interface ProductCustomizerProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (customText: string) => void;
  language: Language;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ product, onClose, onAddToCart, language }) => {
  const [customText, setCustomText] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState<SloganTone>(SloganTone.EMOTIONAL);
  const [generatedSlogans, setGeneratedSlogans] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const t = translations[language];

  const handleGenerate = async () => {
    setIsGenerating(true);
    const slogans = await generateSlogan(product.name[language], selectedTone, language, topic);
    setGeneratedSlogans(slogans);
    setIsGenerating(false);
  };

  const handleAddToCart = () => {
    onAddToCart(customText || (language === 'bn' ? "খলিসাকুন্ডি" : "Khalishakundi"));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl">
        
        {/* Preview Section */}
        <div className="w-full md:w-1/2 bg-stone-100 p-8 flex items-center justify-center relative min-h-[300px]">
          <div className="relative w-full max-w-sm aspect-square bg-white rounded-xl shadow-lg p-4 flex items-center justify-center overflow-hidden">
             {/* Base Image */}
            <img src={product.image} alt={product.name[language]} className="w-full h-full object-contain mix-blend-multiply opacity-90" />
            
            {/* Overlay Text Preview */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-stone-200 transform rotate-[-2deg] max-w-[80%]">
                <p className="text-xl md:text-2xl font-bold text-stone-800 text-center leading-tight font-serif">
                  {customText || t.shop.customizeTitle}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md text-stone-600 hover:text-red-600 transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Controls Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-stone-800">{product.name[language]}</h3>
              <p className="text-green-600 font-semibold text-lg">{t.shop.price} {product.price}</p>
            </div>
            <button 
              onClick={onClose}
              className="hidden md:block p-2 hover:bg-stone-100 rounded-full transition-colors"
            >
              <X size={24} className="text-stone-500" />
            </button>
          </div>

          <div className="space-y-6 flex-grow">
            {/* Manual Input */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                {t.shop.inputLabel}
              </label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder={t.shop.inputPlaceholder}
                className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* AI Generator Box */}
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-green-600" size={20} />
                <h4 className="font-semibold text-green-800">{t.shop.aiTitle}</h4>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <select 
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as SloganTone)}
                  className="w-full px-3 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:border-green-500"
                >
                  {Object.values(SloganTone).map((tone) => (
                    <option key={tone} value={tone}>{t.tones[tone]}</option>
                  ))}
                </select>
                <input 
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t.shop.topicPlaceholder}
                  className="w-full px-3 py-2 rounded-md border border-green-200 text-sm focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                {isGenerating ? t.shop.generating : t.shop.generateBtn}
              </button>

              {/* Suggestions */}
              {generatedSlogans.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">{t.shop.pickText}</p>
                  {generatedSlogans.map((slogan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomText(slogan)}
                      className="w-full text-left px-3 py-2 bg-white border border-green-100 rounded-md text-sm text-stone-700 hover:border-green-500 hover:bg-green-50 transition-colors flex items-center justify-between group"
                    >
                      <span>{slogan}</span>
                      <Check size={14} className="text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-stone-100">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold text-lg hover:bg-stone-800 transition-transform active:scale-[0.98] shadow-lg"
            >
              {t.shop.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;