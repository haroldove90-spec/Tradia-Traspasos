import React from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Heart, 
  MessageCircle, 
  ArrowUpRight, 
  Lock,
  Maximize2,
  Users
} from 'lucide-react';
import { TraspasoListing } from '../types/traspaso';

interface TraspasoCardProps {
  listing: TraspasoListing;
  onSelect: (listing: TraspasoListing) => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  layoutMode?: 'grid' | 'list';
}

export const TraspasoCard: React.FC<TraspasoCardProps> = ({
  listing,
  onSelect,
  onToggleFavorite,
  isFavorite,
  layoutMode = 'grid',
}) => {
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const generateWhatsAppUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    const phone = listing.contactPhone || '525541829033';
    const text = encodeURIComponent(
      `Hola, vi en Traspasa.com el anuncio "${listing.title}" (Ref: ${listing.id}) con precio de ${formatMoney(listing.price)}. Me gustaría solicitar más información y concertar una llamada o visita confidencial.`
    );
    window.open(`https://wa.me/${phone.startsWith('52') ? phone : `52${phone}`}?text=${text}`, '_blank');
  };

  if (layoutMode === 'list') {
    return (
      <div 
        onClick={() => onSelect(listing)}
        className="bg-white rounded-xl border border-gray-200 hover:border-[#F6710C]/40 hover:shadow-lg transition-all p-4 cursor-pointer flex flex-col md:flex-row gap-5 relative group"
      >
        {/* Thumbnail Image */}
        <div className="w-full md:w-64 h-48 md:h-auto rounded-lg overflow-hidden shrink-0 relative bg-gray-100">
          <img
            src={listing.images[0]}
            alt={listing.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Status chips */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.verified && (
              <span className="bg-[#0F1014]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                <ShieldCheck className="w-3 h-3 text-[#F6710C]" /> Verificado
              </span>
            )}
            {listing.opportunityBadge && (
              <span className="bg-[#F6710C] text-white text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                <Zap className="w-3 h-3" /> Oportunidad
              </span>
            )}
          </div>
        </div>

        {/* Content & Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Unboxed Metadata line with separators */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1 flex-wrap">
              <span className="font-semibold text-gray-800">{listing.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                {listing.location.isConfidentialLocation ? (
                  <>
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>Ubicación Confidencial ({listing.location.state})</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{listing.location.neighborhood}, {listing.location.cityOrMunicipality}, {listing.location.state}</span>
                  </>
                )}
              </span>
              <span aria-hidden="true">·</span>
              <span>{listing.areaSqMeters} m²</span>
              <span aria-hidden="true">·</span>
              <span>{listing.employeesCount} empleados</span>
            </div>

            <h3 className="text-lg font-bold text-[#0F1014] group-hover:text-[#F6710C] transition-colors leading-snug line-clamp-1">
              {listing.title}
            </h3>

            <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {listing.description}
            </p>
          </div>

          {/* Financial KPIs Bar */}
          <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50/70 rounded-lg p-2.5">
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Traspaso</div>
              <div className="text-base font-extrabold text-[#0F1014] font-mono tabular-nums">
                {formatMoney(listing.price)}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Renta Mensual</div>
              <div className="text-sm font-semibold text-gray-700 font-mono tabular-nums">
                {formatMoney(listing.monthlyRent)}/mes
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Ventas Aprox.</div>
              <div className="text-sm font-semibold text-gray-700 font-mono tabular-nums">
                {formatMoney(listing.monthlySales)}/mes
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Utilidad Estimada</div>
              <div className="text-sm font-bold text-emerald-700 font-mono tabular-nums">
                {formatMoney(listing.estimatedProfit)}/mes ({listing.profitMargin}%)
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-gray-500 flex items-center gap-3">
              <span>Retorno est.: <strong className="text-gray-800 font-mono">{listing.roiMonths} meses</strong></span>
              <span>·</span>
              <span>Antigüedad: <strong className="text-gray-800">{listing.businessAgeYears} años</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(listing.id);
                }}
                className={`p-2 rounded-lg border transition-colors ${
                  isFavorite 
                    ? 'border-red-200 bg-red-50 text-red-500' 
                    : 'border-gray-200 text-gray-400 hover:text-red-500 hover:bg-gray-50'
                }`}
                aria-label="Guardar en favoritos"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={generateWhatsAppUrl}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </button>
              <button
                onClick={() => onSelect(listing)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-semibold transition-colors"
              >
                Ver Ficha
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div
      onClick={() => onSelect(listing)}
      className="bg-white rounded-xl border border-gray-200 hover:border-[#F6710C]/50 hover:shadow-xl transition-all duration-200 overflow-hidden cursor-pointer flex flex-col group"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Gradient Overlay for Top Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {listing.verified && (
            <span className="bg-[#0F1014]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#F6710C]" /> Verificado
            </span>
          )}
          {listing.opportunityBadge && (
            <span className="bg-[#F6710C] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
              <Zap className="w-3 h-3" /> Urgente
            </span>
          )}
        </div>

        {/* Favorite Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(listing.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-transform active:scale-90 ${
            isFavorite
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          aria-label="Guardar en favoritos"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay on Bottom of Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-gray-200">Traspaso Inversión</div>
            <div className="text-xl font-extrabold font-mono tabular-nums drop-shadow-md">
              {formatMoney(listing.price)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-200">Renta mensual</div>
            <div className="text-sm font-semibold font-mono tabular-nums drop-shadow-md">
              {formatMoney(listing.monthlyRent)}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata line with separators */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5 flex-wrap">
            <span className="font-semibold text-gray-700">{listing.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            {listing.location.isConfidentialLocation ? (
              <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
                <Lock className="w-3 h-3" /> Confidencial ({listing.location.state})
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                {listing.location.neighborhood}, {listing.location.state}
              </span>
            )}
          </div>

          <h3 className="text-base font-bold text-[#0F1014] group-hover:text-[#F6710C] transition-colors leading-snug line-clamp-2">
            {listing.title}
          </h3>

          <p className="mt-2 text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>
        </div>

        {/* Financial Highlights */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-2.5 rounded-lg mb-3">
            <div>
              <div className="text-[10px] uppercase text-gray-400 font-bold">Ventas Mes</div>
              <div className="font-bold text-gray-900 font-mono tabular-nums">
                {formatMoney(listing.monthlySales)}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-emerald-600 font-bold">Utilidad Neta</div>
              <div className="font-bold text-emerald-700 font-mono tabular-nums">
                {formatMoney(listing.estimatedProfit)} ({listing.profitMargin}%)
              </div>
            </div>
            <div className="pt-1 border-t border-gray-200/60">
              <div className="text-[10px] text-gray-400">Superficie</div>
              <div className="font-semibold text-gray-800">{listing.areaSqMeters} m²</div>
            </div>
            <div className="pt-1 border-t border-gray-200/60">
              <div className="text-[10px] text-gray-400">Retorno Est.</div>
              <div className="font-semibold text-gray-800 font-mono">{listing.roiMonths} meses</div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center gap-2">
            <button
              onClick={generateWhatsAppUrl}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors border border-emerald-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              WhatsApp
            </button>
            <button
              onClick={() => onSelect(listing)}
              className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-lg bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-semibold transition-colors"
            >
              Ver Detalle
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
