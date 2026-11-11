import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Calculator, 
  HelpCircle, 
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { MEXICAN_STATES } from '../data/mockTraspasos';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenLegal: (tab: 'faq' | 'guias' | 'privacidad' | 'terminos') => void;
  onOpenValuation: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLegal,
  onOpenValuation,
  onSelectCategory,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <footer className="bg-[#0F1014] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {!imgError ? (
                <img
                  src="https://daloocomercializadora.com.mx/tradialogo.png"
                  alt="Traspasa Logo"
                  onError={() => setImgError(true)}
                  className="h-10 w-auto object-contain max-w-[190px]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-[#F6710C] flex items-center justify-center font-bold text-white text-base">
                    T
                  </div>
                  <span className="text-lg font-bold tracking-tight text-white">
                    TRASPASA<span className="text-[#F6710C]">.COM</span>
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              La plataforma de referencia en México para la compra, venta y cesión transparente de negocios en marcha, franquicias y locales equipados. Conectamos propietarios con inversionistas serios.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-[#F6710C]" />
              <span>Procesos auditados y contratos tipo notariados</span>
            </div>

            <div className="pt-2 text-xs text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F6710C]" />
                <span>Paseo de la Reforma 483, Cuauhtémoc, CDMX</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F6710C]" />
                <span>Atención: +52 (55) 4182-9033</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F6710C]" />
                <span>contacto@traspasa.com.mx</span>
              </div>
            </div>
          </div>

          {/* Col 2: Giros Populares */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F6710C] mb-3">
              Giros Comerciales
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('restaurantes');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Restaurantes y Bares
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('cafeterias');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Cafeterías y Panaderías
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('talleres');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Talleres y Detailing
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('farmacias');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Farmacias y Salud
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('abarrotes');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Tiendas de Abarrotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('franquicias');
                    onNavigate('catalog');
                  }}
                  className="hover:text-[#F6710C] transition-colors"
                >
                  Franquicias Acreditadas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Principales Estados */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F6710C] mb-3">
              Traspasos por Estado
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Ciudad de México (CDMX)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Jalisco (Guadalajara / Zapopan)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Nuevo León (Monterrey / San Pedro)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Querétaro (Juriquilla / Centro)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Puebla (Angelópolis / Cholula)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-[#F6710C] transition-colors">
                  Quintana Roo (Cancún / Playa del Carmen)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Recursos & Legal */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-[#F6710C] mb-3">
              Recursos & Legal
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={onOpenValuation} className="hover:text-[#F6710C] transition-colors flex items-center gap-1">
                  <Calculator className="w-3.5 h-3.5 text-[#F6710C]" />
                  Calculadora de Valuación
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('faq')} className="hover:text-[#F6710C] transition-colors">
                  Preguntas Frecuentes (FAQ)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('guias')} className="hover:text-[#F6710C] transition-colors">
                  Guías de Traspaso y Contratos
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacidad')} className="hover:text-[#F6710C] transition-colors">
                  Aviso de Privacidad (LFPDPPP)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terminos')} className="hover:text-[#F6710C] transition-colors">
                  Términos y Deslinde Legal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-[#F6710C] transition-colors">
                  Panel de Broker & Propietario
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            © {new Date().getFullYear()} Traspasa México S.A.P.I. de C.V. Todos los derechos reservados.
          </div>
          <div className="text-center md:text-right max-w-xl text-gray-400">
            Traspasa.com es una plataforma publicitaria y tecnológica. Las auditorías contables finales y negociaciones de contratos de arrendamiento son responsabilidad de las partes contratantes.
          </div>
        </div>

      </div>
    </footer>
  );
};
