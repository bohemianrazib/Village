import React, { useState } from 'react';
import { Product, Language } from '../types';
import ProductCustomizer from './ProductCustomizer';
import { ShoppingCart } from 'lucide-react';
import { translations } from '../utils/translations';

interface ShopProps {
  onAddToCart: (product: Product, customText: string) => void;
  language: Language;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: {
      bn: "গ্রামের স্মৃতি টি-শার্ট",
      en: "Village Memories T-Shirt"
    },
    price: 450,
    image: "https://picsum.photos/id/1060/400/400",
    description: {
      bn: "১০০% সুতি কাপড়ে তৈরি আরামদায়ক টি-শার্ট।",
      en: "100% Cotton comfortable T-shirt."
    },
    type: 'tshirt'
  },
  {
    id: 2,
    name: {
      bn: "কফি মগ - মাটির টান",
      en: "Coffee Mug - Earth's Call"
    },
    price: 250,
    image: "https://picsum.photos/id/30/400/400",
    description: {
      bn: "আপনার সকালের চা বা কফিতে গ্রামের ছোঁয়া।",
      en: "A touch of the village in your morning tea or coffee."
    },
    type: 'mug'
  },
  {
    id: 3,
    name: {
      bn: "ওয়াল পোস্টার - গোধূলি",
      en: "Wall Poster - Twilight"
    },
    price: 150,
    image: "https://picsum.photos/id/1047/400/400",
    description: {
      bn: "ঘরের দেয়ালে খলিসাকুন্ডির মনোরম দৃশ্যের পোস্টার।",
      en: "A poster of the beautiful scenery of Khalishakundi for your wall."
    },
    type: 'poster'
  },
  {
    id: 4,
    name: {
      bn: "ইকো টোট ব্যাগ",
      en: "Eco Tote Bag"
    },
    price: 200,
    image: "https://picsum.photos/id/250/400/400",
    description: {
      bn: "পরিবেশবান্ধব ও মজবুত পাটের ব্যাগ।",
      en: "Eco-friendly and durable jute bag."
    },
    type: 'tote'
  }
];

const Shop: React.FC<ShopProps> = ({ onAddToCart, language }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const t = translations[language];

  return (
    <section id="shop" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">{t.shop.title}</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            {t.shop.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="aspect-square overflow-hidden relative bg-stone-100">
                <img 
                  src={product.image} 
                  alt={product.name[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="font-bold text-lg text-stone-800 mb-1">{product.name[language]}</h3>
                <p className="text-sm text-stone-500 mb-4 line-clamp-2">{product.description[language]}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-xl font-bold text-green-700">{t.shop.price} {product.price}</span>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-2 bg-stone-900 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
                    title={t.shop.buyBtn}
                  >
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductCustomizer
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(text) => onAddToCart(selectedProduct, text)}
          language={language}
        />
      )}
    </section>
  );
};

export default Shop;