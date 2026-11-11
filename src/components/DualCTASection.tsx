import React from 'react';
import { Search, PlusCircle, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

interface DualCTASectionProps {
  onExploreCatalog: () => void;
  onOpenPublish: () => void;
}

export const DualCTASection: React.FC<DualCTASectionProps> = ({
  onExploreCatalog,
  onOpenPublish,
}) => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Busco Negocio */}
          <div className="bg-[#0F1014] text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#F6710C] uppercase tracking-wider mb-4 border border-white/10">
                <Search className="w-3.5 h-3.5" />
                Para Inversionistas & Emprendedores
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Busco un Negocio en Marcha con Flujo de Clientes
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                Empieza a facturar desde el día 1. Adquiere puntos comerciales consolidados con licencias vigentes, personal capacitado y proveedores ya negociados.
              </p>

              <ul className="mt-6 space-y-2 text-xs text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Filtros por margen de utilidad y ventas mensuales auditables
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Negocios en CDMX, Guadalajara, Monterrey, Querétaro y más
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Contacto directo con propietarios y brokers certificados
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F6710C] hover:bg-[#e06206] text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                Explorar Catálogo Completo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Quiero Traspasar mi Negocio */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border border-[#F6710C]/30 text-[#0F1014] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F6710C]/20 text-[#0F1014] uppercase tracking-wider mb-4 border border-[#F6710C]/30">
                <PlusCircle className="w-3.5 h-3.5 text-[#F6710C]" />
                Para Propietarios & Dueños de Negocio
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                Quiero Traspasar mi Negocio al Mejor Valor de Mercado
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                Recupera tu inversión en instalaciones, mobiliario y clientela. Publica de forma 100% confidencial protegiendo a tus empleados y proveedores.
              </p>

              <ul className="mt-6 space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Modo de máxima confidencialidad con firma de NDA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Más de 35,000 compradores e inversionistas activos cada mes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#F6710C] font-bold">✓</span>
                  Publicación básica sin costo inicial y paquetes de visibilidad
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F6710C]/20">
              <button
                onClick={onOpenPublish}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                Publicar mi Traspaso Ahora
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
