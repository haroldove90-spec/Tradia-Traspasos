import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';
import { MEXICAN_STATES, POPULAR_CATEGORIES } from '../data/mockTraspasos';

interface HeroSectionProps {
  onSearch: (params: { keyword: string; category: string; state: string }) => void;
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  onOpenPublish: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectCategory,
  selectedCategory,
  onOpenPublish,
}) => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ keyword, category, state });
  };

  return (
    <div className="relative bg-[#0F1014] text-white overflow-hidden">
      {/* Background with real commercial photography and darkening scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_traspasos_mexico_1794418591574.jpg"
          alt="Zona comercial en México"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1014] via-[#0F1014]/80 to-[#0F1014]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        
        {/* Editorial Trust Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F6710C]/20 text-[#F6710C] border border-[#F6710C]/30 tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            Traspaso Comercial Seguro en México
          </span>
          <span className="hidden sm:inline-block text-xs text-gray-400">
            Auditado legal y financieramente
          </span>
        </div>

        {/* Hero Main Heading & Subtitle */}
        <div className="max-w-3xl mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
            Encuentra y Traspasa <br />
            <span className="text-[#F6710C]">Negocios en Marcha</span> con Flujo Comprobado
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
            La plataforma líder en México para comprar o ceder restaurantes, cafeterías, farmacias, 
            talleres y franquicias operando con contratos, licencias e inventario incluido.
          </p>
        </div>

        {/* Main Search Bar Form */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-2xl max-w-5xl border border-gray-100 text-[#0F1014]">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Keyword / Name input */}
            <div className="md:col-span-4 relative flex items-center border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#F6710C] transition-all bg-gray-50/50">
              <Search className="w-5 h-5 text-gray-400 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Ej. Cafetería, taller, Polanco..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0F1014] placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* Category / Giro Dropdown */}
            <div className="md:col-span-3 relative flex items-center border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#F6710C] transition-all bg-gray-50/50">
              <Building2 className="w-5 h-5 text-gray-400 shrink-0 mr-2" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0F1014] focus:outline-none cursor-pointer"
              >
                <option value="">Todos los Giros</option>
                <option value="restaurantes">Restaurantes y Bares</option>
                <option value="cafeterias">Cafeterías y Panaderías</option>
                <option value="talleres">Servicios Automotrices</option>
                <option value="farmacias">Farmacias y Salud</option>
                <option value="abarrotes">Abarrotes y Minisupers</option>
                <option value="franquicias">Franquicias Comerciales</option>
                <option value="belleza_spa">Salud, Belleza y Spas</option>
                <option value="retail">Retail y Tiendas</option>
              </select>
            </div>

            {/* State Dropdown */}
            <div className="md:col-span-3 relative flex items-center border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#F6710C] transition-all bg-gray-50/50">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0 mr-2" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-transparent text-sm text-[#0F1014] focus:outline-none cursor-pointer"
              >
                <option value="">Toda la República Mexicana</option>
                {MEXICAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#F6710C] hover:bg-[#e06206] active:scale-[0.98] text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all text-sm whitespace-nowrap"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Quick Access Popular Giros Pills / Categories */}
        <div className="mt-8">
          <div className="text-xs uppercase font-bold tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <span>Giros Populares con Alta Demanda:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#F6710C] text-white shadow-sm font-semibold'
                      : 'bg-white/10 hover:bg-white/20 text-gray-200 border border-white/5'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.count && (
                    <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                      ({cat.count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Micro Trust Strip below Search */}
        <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F6710C] shrink-0" />
            <span>Verificación de Licencias y Permisos</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F6710C] shrink-0" />
            <span>Contratos de Cesión Notariados</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F6710C] shrink-0" />
            <span>Ventas y Utilidades Demostrables</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F6710C] shrink-0" />
            <span>Confidencialidad para Propietarios</span>
          </div>
        </div>

      </div>
    </div>
  );
};
