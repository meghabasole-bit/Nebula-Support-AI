import React from 'react';
import { BotConfig } from '../types';
import { ChatWidget } from '../components/ChatWidget';
import { ShoppingBag, Search, Menu } from 'lucide-react';

interface DemoProps {
  config: BotConfig;
}

export const EmbeddedDemo: React.FC<DemoProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Fake E-commerce Navbar */}
      <nav className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Menu className="h-6 w-6 text-gray-500 mr-4 md:hidden" />
              <span className="text-2xl font-serif font-bold text-gray-900">{config.companyName || 'StoreFront'}</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search size={18} className="text-gray-500 mr-2" />
                <input type="text" placeholder="Search products..." className="bg-transparent border-none focus:outline-none text-sm w-48" />
              </div>
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              <div className="h-8 w-8 bg-gray-900 rounded-full text-white flex items-center justify-center text-xs">JD</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Fake Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://picsum.photos/1920/600" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">New Arrivals</h1>
          <p className="mt-6 text-xl max-w-3xl text-gray-300">
            Discover the latest trends in our collection. Quality comfort meets modern style.
          </p>
          <div className="mt-10">
            <a href="#" className="inline-block bg-white border border-transparent rounded-md py-3 px-8 font-medium text-gray-900 hover:bg-gray-100">Shop Collection</a>
          </div>
        </div>
      </div>

      {/* Fake Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
            {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img src={`https://picsum.photos/400/500?random=${item}`} alt="Product" className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                    </div>
                    <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-sm text-gray-700">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    Premium Product {item}
                                </a>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">Colorway {item}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${(item * 34.50).toFixed(2)}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* The Widget */}
      <ChatWidget config={config} demoMode={true} />
    </div>
  );
};