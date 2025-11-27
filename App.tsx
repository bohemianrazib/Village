import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Shop from './components/Shop';
import Footer from './components/Footer';
import { Product, CartItem, Language } from './types';
import { ShoppingBag, X } from 'lucide-react';
import { translations } from './utils/translations';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('bn');
  
  const t = translations[language];

  useEffect(() => {
    document.title = language === 'bn' ? "খলিসাকুন্ডি - হৃদয়ের ঠিকানা" : "Khalishakundi - Heart of the Village";
  }, [language]);

  const addToCart = (product: Product, customText: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.customText === customText);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.customText === customText)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        id: product.id,
        name: product.name[language], // Snapshot current language name
        price: product.price,
        image: product.image,
        customText, 
        quantity: 1 
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number, customText: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.customText === customText)));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      <Header 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={scrollToSection}
        language={language}
        setLanguage={setLanguage}
      />
      
      <main>
        <Hero onShopClick={() => scrollToSection('shop')} language={language} />
        <About language={language} />
        
        {/* Simple Gallery Strip */}
        <section id="gallery" className="py-12 bg-white overflow-hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 px-4 snap-x">
             {[10, 11, 12, 13, 14, 15].map((id) => (
                <img 
                  key={id}
                  src={`https://picsum.photos/id/${id + 50}/400/300`} 
                  alt="Gallery" 
                  className="snap-center flex-shrink-0 w-72 h-48 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                />
             ))}
          </div>
        </section>

        <Shop onAddToCart={addToCart} language={language} />
      </main>

      <Footer language={language} />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slide-in-right">
              <div className="flex items-center justify-between p-6 border-b border-stone-100">
                <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                  <ShoppingBag size={24} /> {t.cart.title}
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                    <ShoppingBag size={48} className="opacity-20" />
                    <p>{t.cart.empty}</p>
                    <button 
                      onClick={() => { setIsCartOpen(false); scrollToSection('shop'); }}
                      className="text-green-600 font-semibold hover:underline"
                    >
                      {t.cart.startShopping}
                    </button>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex gap-4 p-4 bg-stone-50 rounded-xl border border-stone-100">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-stone-200">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-stone-800">{item.name}</h3>
                          {item.customText && (
                            <p className="text-xs text-stone-500 mt-1">
                              {t.cart.customText}: <span className="font-medium text-stone-700">"{item.customText}"</span>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="font-medium text-stone-900">{t.shop.price} {item.price} x {item.quantity}</p>
                          <button 
                            onClick={() => removeFromCart(item.id, item.customText || '')}
                            className="text-xs text-red-500 hover:text-red-700 font-medium uppercase"
                          >
                            {t.cart.remove}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-stone-100 p-6 bg-stone-50">
                  <div className="flex justify-between items-center mb-4 text-lg font-bold text-stone-900">
                    <span>{t.cart.total}</span>
                    <span>{t.shop.price} {cartTotal}</span>
                  </div>
                  <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg active:scale-[0.98]">
                    {t.cart.confirm}
                  </button>
                  <p className="text-center text-xs text-stone-400 mt-3">
                    {t.cart.cod}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;