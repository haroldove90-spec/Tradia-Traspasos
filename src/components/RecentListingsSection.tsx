import React from 'react';
import { TraspasoListing } from '../types/traspaso';
import { TraspasoCard } from './TraspasoCard';
import { Clock, ArrowRight } from 'lucide-react';

interface RecentListingsSectionProps {
  listings: TraspasoListing[];
  onSelectListing: (listing: TraspasoListing) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  onViewAll: () => void;
}

export const RecentListingsSection: React.FC<RecentListingsSectionProps> = ({
  listings,
  onSelectListing,
  onToggleFavorite,
  favorites,
  onViewAll,
}) => {
  // Sort by publishedAt and take 6
  const recentListings = [...listings]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              <Clock className="w-3.5 h-3.5 text-[#F6710C]" />
              <span>Nuevas Incorporaciones al Mercado</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight">
              Traspasos Recientemente Publicados
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Puntos de venta recién registrados en CDMX, Guadalajara, Monterrey, Querétaro y Riviera Maya.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="flex items-center gap-1.5 text-xs font-bold text-[#0F1014] hover:text-[#F6710C] transition-colors shrink-0 group"
          >
            Ver todos los traspasos recientes ({listings.length})
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentListings.map((item) => (
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

        {/* Bottom CTA to catalog */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-[0.98]"
          >
            Explorar el Catálogo Completo con Filtros Avanzados
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
