import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  HelpCircle, 
  Calculator, 
  Menu, 
  X, 
  UserCheck, 
  Heart,
  ShieldCheck,
  Building,
  SlidersHorizontal
} from 'lucide-react';
import { UserRole } from '../types/traspaso';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenPublish: () => void;
  onOpenValuation: () => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenPublish,
  onOpenValuation,
  userRole,
  onRoleChange,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const roles: { id: UserRole; label: string; badge: string; desc: string }[] = [
    { id: 'comprador', label: 'Comprador', badge: 'Inversionista', desc: 'Explora y guarda traspasos' },
    { id: 'vendedor', label: 'Vendedor', badge: 'Propietario', desc: 'Gestiona tus publicaciones' },
    { id: 'broker', label: 'Broker Comercial', badge: 'Agente / Corredor', desc: 'Panel multi-anuncios' },
    { id: 'admin', label: 'Administrador', badge: 'Admin Sistema', desc: 'Auditoría y moderación' },
  ];

  const currentRoleObj = roles.find((r) => r.id === userRole) || roles[0];

  return (
    <header className="sticky top-0 z-50 bg-[#0F1014] text-white border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6710C]"
              aria-label="Ir al inicio de Traspasa México"
            >
              {!imgError ? (
                <img
                  src="https://daloocomercializadora.com.mx/tradialogo.png"
                  alt="Traspasa Logo"
                  onError={() => setImgError(true)}
                  className="h-10 md:h-12 w-auto object-contain max-w-[190px]"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#F6710C] flex items-center justify-center font-bold text-white text-xl shadow-md">
                    T
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white leading-none">
                      TRASPASA<span className="text-[#F6710C]">.COM</span>
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
                      Negocios en Marcha México
                    </span>
                  </div>
                </div>
              )}
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors whitespace-nowrap hover:text-[#F6710C] ${
                currentView === 'home' ? 'text-[#F6710C] font-semibold' : 'text-gray-200'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#F6710C] ${
                currentView === 'catalog' ? 'text-[#F6710C] font-semibold' : 'text-gray-200'
              }`}
            >
              <Search className="w-4 h-4 text-gray-400" />
              Catálogo de Traspasos
            </button>
            <button
              onClick={() => onNavigate('how_it_works')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#F6710C] ${
                currentView === 'how_it_works' ? 'text-[#F6710C] font-semibold' : 'text-gray-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-gray-400" />
              Proceso Seguro
            </button>
            <button
              onClick={onOpenValuation}
              className="flex items-center gap-1.5 text-gray-200 hover:text-[#F6710C] transition-colors whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-[#F6710C]" />
              Valuar Negocio
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#F6710C] ${
                currentView === 'dashboard' ? 'text-[#F6710C] font-semibold' : 'text-gray-200'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              Mi Panel
              {favoritesCount > 0 && (
                <span className="inline-flex items-center justify-center bg-[#F6710C] text-white text-[11px] font-bold rounded-full h-4 w-4">
                  {favoritesCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action Zone: Role Switcher & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            
            {/* Quick Role Switcher (RBAC) */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-gray-200 transition-colors"
                title="Cambiar rol de usuario"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#F6710C]" />
                <span className="font-medium">{currentRoleObj.label}</span>
                <span className="text-[10px] text-gray-400">({currentRoleObj.badge})</span>
              </button>

              {roleMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-[#18191f] border border-white/10 rounded-xl shadow-2xl py-2 z-50 text-left"
                  onMouseLeave={() => setRoleMenuOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-400 border-b border-white/10">
                    Cambiar Modo de Vista (Roles)
                  </div>
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        onRoleChange(r.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-white/5 transition-colors ${
                        userRole === r.id ? 'bg-white/10 text-[#F6710C]' : 'text-gray-300'
                      }`}
                    >
                      <div className="pt-0.5">
                        <div className={`w-2 h-2 rounded-full ${userRole === r.id ? 'bg-[#F6710C]' : 'bg-gray-600'}`} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          {r.label}
                          <span className="text-[10px] text-gray-400 font-normal">[{r.badge}]</span>
                        </div>
                        <div className="text-[11px] text-gray-400 leading-tight">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Action Button: Publicar Traspaso */}
            <button
              onClick={onOpenPublish}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#F6710C] hover:bg-[#e06206] active:scale-[0.98] rounded-lg shadow-md transition-all whitespace-nowrap"
            >
              <PlusCircle className="w-4 h-4" />
              Publicar Traspaso
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenPublish}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#F6710C] rounded-lg"
            >
              Publicar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18191f] border-b border-white/10 px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-[#F6710C]"
            >
              Inicio
            </button>
            <button
              onClick={() => {
                onNavigate('catalog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-[#F6710C]"
            >
              Catálogo de Traspasos
            </button>
            <button
              onClick={() => {
                onNavigate('how_it_works');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-[#F6710C]"
            >
              Cómo Funciona el Traspaso Seguro
            </button>
            <button
              onClick={() => {
                onOpenValuation();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-[#F6710C]"
            >
              Calculadora de Valuación
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:bg-white/10 hover:text-[#F6710C] flex items-center justify-between"
            >
              <span>Mi Panel de Control</span>
              {favoritesCount > 0 && (
                <span className="bg-[#F6710C] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  {favoritesCount} favoritos
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onNavigate('legal');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white"
            >
              Guías, FAQ y Legal (LFPDPPP)
            </button>
          </div>

          <div className="pt-3 border-t border-white/10">
            <div className="text-xs text-gray-400 mb-2 font-medium">Modo de usuario activo:</div>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    onRoleChange(r.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs p-2 rounded-lg text-left border ${
                    userRole === r.id
                      ? 'border-[#F6710C] bg-[#F6710C]/10 text-white font-semibold'
                      : 'border-white/10 text-gray-300 bg-white/5'
                  }`}
                >
                  <div>{r.label}</div>
                  <div className="text-[10px] text-gray-400">{r.badge}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
