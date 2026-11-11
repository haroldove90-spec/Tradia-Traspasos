import React, { useState } from 'react';
import { 
  Heart, 
  Bell, 
  MessageSquare, 
  Building, 
  Eye, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  PlusCircle, 
  DollarSign, 
  FileText, 
  ArrowUpRight,
  Trash2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { TraspasoListing, UserRole, BuyerLeadMessage } from '../types/traspaso';

interface DashboardViewProps {
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  listings: TraspasoListing[];
  favorites: string[];
  leads: BuyerLeadMessage[];
  onSelectListing: (listing: TraspasoListing) => void;
  onOpenPublish: () => void;
  onToggleFavorite: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userRole,
  onRoleChange,
  listings,
  favorites,
  leads,
  onSelectListing,
  onOpenPublish,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<'main' | 'alerts' | 'messages' | 'analytics'>('main');

  const favoriteListings = listings.filter((l) => favorites.includes(l.id));

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header of Dashboard */}
      <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight">
              Panel de Control
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F6710C]/10 text-[#F6710C] border border-[#F6710C]/20 uppercase">
              {userRole}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Gestiona tus oportunidades, publicaciones, alertas y contactos comerciales en Traspasa México.
          </p>
        </div>

        {/* Role Switcher Toolbar */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl self-start md:self-auto border border-gray-200">
          {(['comprador', 'vendedor', 'broker', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => onRoleChange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                userRole === r
                  ? 'bg-white text-[#0F1014] shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. COMPRADOR VIEW */}
      {/* ======================================================== */}
      {userRole === 'comprador' && (
        <div className="space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <span>Negocios Favoritos</span>
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-extrabold text-[#0F1014] mt-2 font-mono">
                {favoriteListings.length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Guardados para seguimiento</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <span>Alertas de Nuevos Traspasos</span>
                <Bell className="w-4 h-4 text-[#F6710C]" />
              </div>
              <div className="text-2xl font-extrabold text-[#0F1014] mt-2 font-mono">
                2 activas
              </div>
              <div className="text-[11px] text-gray-400 mt-1">CDMX & Guadalajara (Restaurantes)</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <span>Consultas Enviadas</span>
                <MessageSquare className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-extrabold text-[#0F1014] mt-2 font-mono">
                {leads.length}
              </div>
              <div className="text-[11px] text-gray-400 mt-1">Contactos con vendedores</div>
            </div>
          </div>

          {/* Favoritos Section */}
          <div>
            <h3 className="text-lg font-bold text-[#0F1014] mb-4 flex items-center justify-between">
              <span>Tus Traspasos Guardados ({favoriteListings.length})</span>
            </h3>

            {favoriteListings.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-xs text-gray-500">
                <Heart className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                No tienes traspasos en favoritos todavía. Explora el catálogo y presiona el ícono del corazón.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2 bg-gray-100">
                        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[10px] text-[#F6710C] font-bold uppercase">{item.categoryLabel}</div>
                      <h4 className="text-xs font-bold text-[#0F1014] line-clamp-1 mt-0.5">{item.title}</h4>
                      <div className="text-xs text-gray-500">{item.location.cityOrMunicipality}, {item.location.state}</div>
                      <div className="text-base font-extrabold text-[#0F1014] font-mono mt-2">{formatMoney(item.price)}</div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => onSelectListing(item)}
                        className="flex-1 py-1.5 px-3 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-semibold rounded-lg transition-colors text-center"
                      >
                        Ver Ficha
                      </button>
                      <button
                        onClick={() => onToggleFavorite(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg border border-gray-200"
                        title="Eliminar de favoritos"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Historial de Mensajes Enviados */}
          <div>
            <h3 className="text-lg font-bold text-[#0F1014] mb-3">
              Historial de Consultas y Solicitudes de Información
            </h3>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {leads.length === 0 ? (
                <div className="p-6 text-center text-xs text-gray-500">
                  No has enviado consultas directas aún. En la ficha de cualquier negocio puedes solicitar información confidencial.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="font-bold text-gray-900">{lead.listingTitle}</div>
                        <div className="text-gray-500 text-[11px] mt-0.5">
                          Enviado el {lead.createdAt} · Ref: {lead.listingId}
                        </div>
                        <p className="text-gray-600 italic text-[11px] mt-1 bg-gray-50 p-2 rounded">
                          "{lead.message}"
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {lead.status === 'nuevo' ? 'Enviado al Propietario' : lead.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. VENDEDOR VIEW */}
      {/* ======================================================== */}
      {userRole === 'vendedor' && (
        <div className="space-y-8">
          {/* Seller Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 uppercase font-semibold">Anuncios Activos</div>
              <div className="text-2xl font-extrabold text-[#0F1014] mt-1 font-mono">1</div>
              <div className="text-[11px] text-emerald-600 mt-1">En catálogo nacional</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 uppercase font-semibold">Visitas Totales</div>
              <div className="text-2xl font-extrabold text-[#0F1014] mt-1 font-mono">1,420</div>
              <div className="text-[11px] text-gray-400 mt-1">Últimos 30 días</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 uppercase font-semibold">Prospectos / Leads</div>
              <div className="text-2xl font-extrabold text-[#F6710C] mt-1 font-mono">38</div>
              <div className="text-[11px] text-emerald-700 mt-1">2.7% tasa de conversión</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
              <div className="text-xs text-gray-500 uppercase font-semibold">Estatus de Plan</div>
              <div className="text-base font-extrabold text-gray-900 mt-1">Destacado Pro</div>
              <div className="text-[11px] text-[#F6710C] font-semibold mt-1">Vence en 18 días</div>
            </div>
          </div>

          {/* Seller Listings Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0F1014]">Mis Publicaciones de Traspaso</h3>
              <button
                onClick={onOpenPublish}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F6710C] hover:bg-[#e06206] text-white text-xs font-bold rounded-lg shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                Publicar Nuevo Negocio
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={listings[0].images[0]} alt="preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 line-clamp-1">{listings[0].title}</div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-2">
                      <span>Ref: {listings[0].id}</span>
                      <span>·</span>
                      <span>Precio: {formatMoney(listings[0].price)}</span>
                      <span>·</span>
                      <span className="text-emerald-700 font-semibold">Activo y Verificado</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectListing(listings[0])}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-lg"
                  >
                    Ver Anuncio
                  </button>
                  <button
                    onClick={() => alert('Plan renovado: Tu publicación ahora tiene máxima prioridad en la categoría.')}
                    className="px-3 py-1.5 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-semibold rounded-lg"
                  >
                    Destacar Anuncio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. BROKER VIEW */}
      {/* ======================================================== */}
      {userRole === 'broker' && (
        <div className="space-y-6">
          <div className="bg-[#0F1014] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#F6710C] font-bold uppercase tracking-wider">
                Panel Multi-Anuncio Comercial
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                Agencia Traspasos & Correduría Inmobiliaria
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Gestiona la cartera de negocios de tus clientes, reportes de visitas y comisiones pactadas.
              </p>
            </div>
            <button
              onClick={onOpenPublish}
              className="px-4 py-2 bg-[#F6710C] text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md"
            >
              + Agregar Traspaso a Cartera
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-xs text-gray-500">Valor de Cartera en Traspaso</div>
              <div className="text-2xl font-extrabold text-[#0F1014] font-mono mt-1">$13,460,000 MXN</div>
              <div className="text-[11px] text-gray-400 mt-1">8 negocios en cartera</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-xs text-gray-500">Comisión Estimada al Cierre</div>
              <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">$1,076,800 MXN</div>
              <div className="text-[11px] text-gray-400 mt-1">Promedio 8% por traspaso</div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="text-xs text-gray-500">Leads Calificados del Mes</div>
              <div className="text-2xl font-extrabold text-[#F6710C] font-mono mt-1">112</div>
              <div className="text-[11px] text-gray-400 mt-1">Contactos listos para llamada</div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. ADMIN VIEW */}
      {/* ======================================================== */}
      {userRole === 'admin' && (
        <div className="space-y-6">
          <div className="bg-red-950/20 border border-red-300/40 p-4 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-red-900 font-semibold">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>Modo Auditoría de la Plataforma: Moderación de anuncios, antifraude y control fiscal CFDI</span>
            </div>
            <span className="text-[11px] text-red-700 font-mono">Sistema Operativo v2.4</span>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <h3 className="text-base font-bold text-[#0F1014]">
              Bandeja de Aprobación y Moderación Documental
            </h3>
            <div className="divide-y divide-gray-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">TRP-1092 · Cafetería de Especialidad Roma Norte</div>
                  <div className="text-gray-500">Documentos adjuntos: Contrato de arrendamiento, Comprobante SAT, INE</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Aprobado
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">Auditar</button>
                </div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">TRP-1045 · Restaurante Bistro Polanco</div>
                  <div className="text-gray-500">Documentos: Licencia de alcoholes tipo C cotejada con alcaldía</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Aprobado
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">Auditar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
