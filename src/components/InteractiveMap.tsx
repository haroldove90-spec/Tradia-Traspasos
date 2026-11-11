import React, { useState } from 'react';
import { TraspasoListing } from '../types/traspaso';
import { MapPin, X, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface InteractiveMapProps {
  listings: TraspasoListing[];
  onSelectListing: (listing: TraspasoListing) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  listings,
  onSelectListing,
}) => {
  const [activePin, setActivePin] = useState<TraspasoListing | null>(listings[0] || null);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Convert Mexican lat/lng to percentage coordinates on an optimized stylized Mexico view
  // Mexico bounding box: lat ~ 14.5 to 32.7, lng ~ -117 to -86.5
  const getCoordinates = (lat: number, lng: number) => {
    const minLng = -118;
    const maxLng = -86;
    const minLat = 14;
    const maxLat = 32.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    // Invert Y for SVG/Canvas
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 100;

    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(8, Math.min(92, y))}%`,
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Top Header of Map */}
      <div className="bg-[#0F1014] text-white px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#F6710C]" />
          <span className="font-bold text-sm tracking-wide">
            Mapa de Oportunidades Comerciales en México
          </span>
        </div>
        <span className="text-xs text-gray-400">
          {listings.length} negocios geolocalizados
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Interactive Map Visual Stage */}
        <div className="lg:col-span-8 bg-[#16181f] relative overflow-hidden flex items-center justify-center p-6 min-h-[420px]">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* Stylized Mexico Silhouette Guide */}
          <div className="relative w-full max-w-2xl h-80 sm:h-96">
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full text-white/10 drop-shadow-md"
              fill="currentColor"
            >
              {/* Simplified Mexico geographic outline path */}
              <path d="M 120,60 L 220,110 L 280,180 L 330,220 L 410,230 L 460,260 L 520,330 L 590,360 L 670,410 L 730,460 L 810,470 L 870,430 L 920,410 L 950,440 L 900,490 L 820,490 L 770,510 L 710,500 L 640,490 L 570,480 L 510,450 L 460,420 L 400,380 L 340,320 L 290,260 L 210,190 L 140,120 Z" opacity="0.4" />
              <path d="M 80,40 L 140,140 L 170,220 L 220,320 L 250,380 L 240,400 L 200,350 L 150,260 L 110,170 L 60,70 Z" opacity="0.3" /> {/* Baja California */}
              <path d="M 850,390 L 960,380 L 980,440 L 940,470 L 880,450 Z" opacity="0.4" /> {/* Península Yucatán */}
            </svg>

            {/* Hub indicators */}
            <div className="absolute top-[52%] left-[58%] text-[10px] text-white/40 pointer-events-none font-semibold">
              CDMX / EdoMéx
            </div>
            <div className="absolute top-[48%] left-[44%] text-[10px] text-white/40 pointer-events-none font-semibold">
              Jalisco (GDL)
            </div>
            <div className="absolute top-[32%] left-[56%] text-[10px] text-white/40 pointer-events-none font-semibold">
              Nuevo León (MTY)
            </div>
            <div className="absolute top-[58%] left-[86%] text-[10px] text-white/40 pointer-events-none font-semibold">
              Riviera Maya
            </div>

            {/* Listing Pins */}
            {listings.map((item) => {
              const pos = getCoordinates(item.location.lat, item.location.lng);
              const isSelected = activePin?.id === item.id;

              return (
                <div
                  key={item.id}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActivePin(item)}
                    className={`group relative flex items-center justify-center transition-all ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                    aria-label={`Ver ${item.title}`}
                  >
                    {/* Ring highlight if selected */}
                    {isSelected && (
                      <span className="absolute -inset-1.5 rounded-full bg-[#F6710C] opacity-40 animate-ping" />
                    )}

                    <div
                      className={`px-2 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border transition-all ${
                        isSelected
                          ? 'bg-[#F6710C] text-white border-white scale-110'
                          : 'bg-[#0F1014] text-white border-white/20 hover:border-[#F6710C]'
                      }`}
                    >
                      <MapPin className="w-3 h-3 text-[#F6710C]" />
                      <span className="font-mono">{formatMoney(item.price)}</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="absolute bottom-3 left-3 text-[11px] text-gray-400 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/5">
            Haz clic en cualquier punto para ver el resumen del negocio
          </div>
        </div>

        {/* Selected Listing Preview Card on the Side */}
        <div className="lg:col-span-4 p-5 bg-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gray-200">
          {activePin ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-[#F6710C]">
                  {activePin.categoryLabel}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Ref: {activePin.id}
                </span>
              </div>

              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-100 relative shadow-inner">
                <img
                  src={activePin.images[0]}
                  alt={activePin.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {activePin.verified && (
                  <div className="absolute top-2 left-2 bg-[#0F1014]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#F6710C]" /> Verificado
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-base font-bold text-[#0F1014] leading-snug">
                  {activePin.title}
                </h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span>
                    {activePin.location.neighborhood}, {activePin.location.cityOrMunicipality}, {activePin.location.state}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Traspaso</div>
                  <div className="text-base font-extrabold text-[#0F1014] font-mono">
                    {formatMoney(activePin.price)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Renta Mensual</div>
                  <div className="text-sm font-semibold text-gray-700 font-mono">
                    {formatMoney(activePin.monthlyRent)}
                  </div>
                </div>
                <div className="pt-1 border-t border-gray-200">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Ventas/Mes</div>
                  <div className="font-bold text-gray-800 font-mono">
                    {formatMoney(activePin.monthlySales)}
                  </div>
                </div>
                <div className="pt-1 border-t border-gray-200">
                  <div className="text-[10px] text-emerald-600 uppercase font-semibold">Utilidad Est.</div>
                  <div className="font-bold text-emerald-700 font-mono">
                    {formatMoney(activePin.estimatedProfit)}
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {activePin.description}
              </p>

              <button
                onClick={() => onSelectListing(activePin)}
                className="w-full flex items-center justify-center gap-2 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
              >
                Ver Ficha Técnica Completa
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 text-xs">
              Selecciona una ubicación en el mapa
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
