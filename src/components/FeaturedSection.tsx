import React from 'react';
import { TraspasoListing } from '../types/traspaso';
import { TraspasoCard } from './TraspasoCard';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedSectionProps {
  listings: TraspasoListing[];
  onSelectListing: (listing: TraspasoListing) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  onViewAll: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  listings,
  onSelectListing,
  onToggleFavorite,
  favorites,
  onViewAll,
}) => {
  const featuredListings = listings.filter((l) => l.featured).slice(0, 3);

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#F6710C] text-xs uppercase font-extrabold tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Oportunidades Premium Verificadas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight mt-1">
              Traspasos Destacados de la Semana
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Negocios en marcha con documentación cotejada, arrendamiento renovable y facturación demostrable.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F1014] hover:text-[#F6710C] transition-colors shrink-0 group"
          >
            Ver todos los traspasos destacados
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListings.map((item) => (
            <TraspasoCard
              key={item.id}
              listing={item}
              onSelect={onSelectListing}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.includes(item.id)}
              layoutMode="grid"
            />
          ))}
        </div>

      </div>
    </section>
  );
};
