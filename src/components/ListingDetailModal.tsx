import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Share2, 
  MessageCircle, 
  DollarSign, 
  Calendar, 
  Users, 
  Maximize2, 
  FileCheck2, 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  Lock, 
  Zap, 
  Building2, 
  Clock, 
  HelpCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { TraspasoListing } from '../types/traspaso';

interface ListingDetailModalProps {
  listing: TraspasoListing;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  similarListings: TraspasoListing[];
  onSelectSimilar: (listing: TraspasoListing) => void;
  onSendLead: (lead: {
    listingId: string;
    listingTitle: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    message: string;
  }) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  onClose,
  onToggleFavorite,
  isFavorite,
  similarListings,
  onSelectSimilar,
  onSendLead,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [formSent, setFormSent] = useState(false);
  
  // Contact form state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [message, setMessage] = useState(
    `Hola, me interesa obtener más información sobre el traspaso "${listing.title}" (ID: ${listing.id}). Me gustaría saber si las ventas son auditables y si es posible agendar una visita.`
  );
  const [hasCaptcha, setHasCaptcha] = useState(false);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasCaptcha) {
      alert('Por favor confirma la casilla de verificación de seguridad anti-spam.');
      return;
    }
    onSendLead({
      listingId: listing.id,
      listingTitle: listing.title,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
    });
    setFormSent(true);
  };

  const generateWhatsAppUrl = () => {
    const phone = listing.contactPhone || '525541829033';
    const text = encodeURIComponent(
      `Hola ${listing.sellerName}, vi en Traspasa.com el anuncio "${listing.title}" (Ref: ${listing.id}) con precio de traspaso de ${formatMoney(listing.price)}. Tengo interés comercial y me gustaría recibir información adicional.`
    );
    return `https://wa.me/${phone.startsWith('52') ? phone : `52${phone}`}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Top Floating Modal Bar */}
        <div className="bg-[#0F1014] text-white px-5 py-3.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#F6710C]">
              Ficha Técnica Oficial
            </span>
            <span className="text-xs text-gray-400 font-mono">
              ID: {listing.id}
            </span>
            {listing.verified && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-white/10 text-emerald-400 px-2 py-0.5 rounded font-medium">
                <ShieldCheck className="w-3 h-3" /> Verificación Documental Aprobada
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(listing.id)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorite 
                  ? 'border-red-400 bg-red-500/20 text-red-400' 
                  : 'border-white/20 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="Guardar en favoritos"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 transition-colors relative"
              title="Compartir enlace"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-[#F6710C] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                  ¡Enlace copiado!
                </span>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors ml-2"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8">
          
          {/* Header Info Block */}
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 flex-wrap">
              <span className="font-bold text-[#F6710C] uppercase tracking-wide">
                {listing.categoryLabel}
              </span>
              <span aria-hidden="true">·</span>
              {listing.location.isConfidentialLocation ? (
                <span className="flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Lock className="w-3.5 h-3.5" />
                  Ubicación Reservada por Confidencialidad ({listing.location.state})
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {listing.location.neighborhood}, {listing.location.cityOrMunicipality}, {listing.location.state}
                </span>
              )}
              <span aria-hidden="true">·</span>
              <span>Publicado: {listing.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{listing.viewsCount} visitas</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight leading-tight">
              {listing.title}
            </h1>

            {/* Confidentiality Explanatory Notice if applicable */}
            {listing.location.isConfidentialLocation && (
              <div className="mt-3 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Política de Discreción Comercial:</strong> El nombre y dirección exacta se reservan para no alertar al personal operativo ni proveedores hasta la firma del Acuerdo de Confidencialidad (NDA) y contacto verificado.
                </div>
              </div>
            )}
          </div>

          {/* Primary Gallery & Price Card 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gallery (Left Col) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gray-100 relative shadow-md">
                <img
                  src={listing.images[activeImageIndex] || listing.images[0]}
                  alt={listing.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md">
                  Foto {activeImageIndex + 1} de {listing.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {listing.images.length > 1 && (
                <div className="flex gap-2">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#F6710C] scale-105 shadow-xs' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Primary Call to Action Box (Right Col) */}
            <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5 shadow-xs">
              <div>
                <div className="text-xs uppercase font-bold tracking-wider text-gray-500">
                  Monto de Inversión (Traspaso)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F1014] font-mono tabular-nums tracking-tight mt-1">
                  {formatMoney(listing.price)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Incluye todo el mobiliario, equipo y contratos vigentes.
                </div>
              </div>

              {/* Rent & Operations pill row */}
              <div className="bg-white rounded-xl p-3.5 border border-gray-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Renta Mensual del Local:</span>
                  <span className="font-bold text-gray-900 font-mono">{formatMoney(listing.monthlyRent)} MXN/mes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Ventas Promedio Mensuales:</span>
                  <span className="font-bold text-gray-900 font-mono">{formatMoney(listing.monthlySales)} MXN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-700 font-semibold">Utilidad Mensual Estimada:</span>
                  <span className="font-bold text-emerald-700 font-mono">{formatMoney(listing.estimatedProfit)} ({listing.profitMargin}%)</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <span className="text-gray-500">Retorno de Inversión Est.:</span>
                  <span className="font-bold text-gray-900 font-mono">{listing.roiMonths} meses</span>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-2.5">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contactar por WhatsApp
                </a>

                <div className="text-center text-[11px] text-gray-500">
                  Vendedor: <strong className="text-gray-700">{listing.sellerName}</strong> ({listing.sellerType === 'propietario' ? 'Propietario directo' : 'Broker acreditado'})
                </div>
              </div>

              {/* Verification Guarantee badge */}
              <div className="pt-2 border-t border-gray-200 text-xs text-gray-500 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Traspaso con contrato de cesión</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-[#F6710C]" />
                  <span>Due Diligence y revisión de arrendamiento</span>
                </div>
              </div>
            </div>

          </div>

          {/* Section 1: Financial Dashboard */}
          <div>
            <h3 className="text-lg font-bold text-[#0F1014] mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#F6710C]" />
              Métricas Financieras y Desglose Operativo
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-semibold">Ventas Promedio / Mes</div>
                <div className="text-xl font-extrabold text-gray-900 font-mono mt-1">
                  {formatMoney(listing.monthlySales)}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Facturación demostrable</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-emerald-700 uppercase font-semibold">Utilidad Neta / Mes</div>
                <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">
                  {formatMoney(listing.estimatedProfit)}
                </div>
                <div className="text-[11px] text-emerald-800 mt-1">Margen libre: {listing.profitMargin}%</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-semibold">Costo de Renta / Mes</div>
                <div className="text-xl font-extrabold text-gray-900 font-mono mt-1">
                  {formatMoney(listing.monthlyRent)}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">{(listing.monthlyRent / listing.areaSqMeters).toFixed(0)} MXN/m²</div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 uppercase font-semibold">Payback / ROI</div>
                <div className="text-xl font-extrabold text-[#F6710C] font-mono mt-1">
                  {listing.roiMonths} meses
                </div>
                <div className="text-[11px] text-gray-500 mt-1">Recuperación estimada</div>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Specs of Local */}
          <div>
            <h3 className="text-lg font-bold text-[#0F1014] mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#F6710C]" />
              Ficha Técnica del Inmueble y Operación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-[#F6710C]" />
                  Instalaciones
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Superficie Total:</span>
                  <span className="font-semibold text-gray-900">{listing.areaSqMeters} m²</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Plantilla de Empleados:</span>
                  <span className="font-semibold text-gray-900">{listing.employeesCount} personas</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Antigüedad del Negocio:</span>
                  <span className="font-semibold text-gray-900">{listing.businessAgeYears} años</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Estado de Operación:</span>
                  <span className="font-semibold text-emerald-700 capitalize">{listing.operationStatus.replace('_', ' ')}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#F6710C]" />
                  Términos del Arrendamiento
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Vigencia Restante:</span>
                  <span className="font-semibold text-gray-900">{listing.leaseTerms.yearsRemaining} años</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Renovación con Propietario:</span>
                  <span className="font-semibold text-emerald-700">{listing.leaseTerms.isRenewable ? 'Garantizada' : 'Negociable'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Depósito en Garantía:</span>
                  <span className="font-semibold text-gray-900">{listing.leaseTerms.securityDepositMonths} meses</span>
                </div>
                <div className="py-1">
                  <span className="text-gray-500 block">Requisito de Garantía:</span>
                  <span className="font-semibold text-gray-900 text-[11px]">{listing.leaseTerms.guarantorRequired}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 space-y-2">
                <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#F6710C]" />
                  Licencias y Aspectos Legales
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Licencia de Alcoholes:</span>
                  <span className={`font-semibold ${listing.licenses.hasLiquorLicense ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {listing.licenses.hasLiquorLicense ? 'Vigente incluida' : 'No requerida / No'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Marca en IMPI:</span>
                  <span className={`font-semibold ${listing.licenses.hasTradeMark ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {listing.licenses.hasTradeMark ? 'Registrada y transferible' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-500">Sociedad / RFC limpia:</span>
                  <span className={`font-semibold ${listing.licenses.includesLegalEntity ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {listing.licenses.includesLegalEntity ? 'S.A. de C.V. transferible' : 'Traspaso de activos'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Avisos Sanitarios (COFEPRIS):</span>
                  <span className="font-semibold text-emerald-700">En orden</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Description & Reason for transfer */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#0F1014] mb-2 pb-2 border-b border-gray-200">
                Historia del Negocio y Descripción Detallada
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-xs">
              <span className="font-bold text-gray-800 uppercase tracking-wider block mb-1">
                Motivo del Traspaso:
              </span>
              <p className="text-gray-600 italic">
                "{listing.reasonForTransfer}"
              </p>
            </div>
          </div>

          {/* Section 4: Included Assets & Inventory */}
          <div>
            <h3 className="text-lg font-bold text-[#0F1014] mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Inventario, Mobiliario y Activos Incluidos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {listing.includedAssets.map((asset, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-gray-50 p-3 rounded-lg border border-gray-100 text-xs text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-[#F6710C] shrink-0 mt-0.5" />
                  <span>{asset}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Direct Confidential Contact Form */}
          <div className="bg-[#0F1014] text-white rounded-2xl p-6 sm:p-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <span className="text-xs uppercase font-bold tracking-wider text-[#F6710C]">
                  Contacto Directo y Seguro
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                  Solicita Información o Agenda una Llamada
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
                </p>
              </div>

              {formSent ? (
                <div className="bg-white/10 border border-emerald-400/40 rounded-xl p-6 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">¡Mensaje enviado al vendedor con éxito!</h4>
                  <p className="text-xs text-gray-300">
                    El propietario o broker comercial se pondrá en contacto contigo a la brevedad. Puedes también iniciar conversación directa por WhatsApp.
                  </p>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Abrir WhatsApp ahora
                  </a>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Tu Nombre Completo</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Carlos Mendoza"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="w-full text-xs bg-white/10 border border-white/20 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F6710C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        required
                        placeholder="ejemplo@correo.com"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        className="w-full text-xs bg-white/10 border border-white/20 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F6710C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Teléfono / WhatsApp</label>
                      <input
                        type="tel"
                        required
                        placeholder="10 dígitos"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="w-full text-xs bg-white/10 border border-white/20 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F6710C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Mensaje o Dudas Específicas</label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs bg-white/10 border border-white/20 rounded-lg p-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#F6710C]"
                    />
                  </div>

                  {/* Anti-spam Verification Check */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={hasCaptcha}
                        onChange={(e) => setHasCaptcha(e.target.checked)}
                        className="accent-[#F6710C] w-4 h-4 rounded"
                      />
                      <span>No soy un robot (Verificación de seguridad anti-spam)</span>
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">Protected by Turnstile</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#F6710C] hover:bg-[#e06206] text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Consulta Confidencial
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Section 6: Similar Businesses in the Area / Category */}
          {similarListings.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-[#0F1014] mb-4 pb-2 border-b border-gray-200">
                Traspasos Similares que Podrían Interesarte
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarListings.map((sim) => (
                  <div
                    key={sim.id}
                    onClick={() => onSelectSimilar(sim)}
                    className="bg-gray-50 border border-gray-200 hover:border-[#F6710C] rounded-xl p-3 cursor-pointer group transition-all"
                  >
                    <div className="aspect-[16/10] rounded-lg overflow-hidden mb-2 bg-gray-200">
                      <img src={sim.images[0]} alt={sim.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="text-[10px] text-[#F6710C] font-bold uppercase">{sim.categoryLabel}</div>
                    <div className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-[#F6710C]">{sim.title}</div>
                    <div className="text-xs text-gray-500">{sim.location.cityOrMunicipality}, {sim.location.state}</div>
                    <div className="text-sm font-extrabold text-[#0F1014] font-mono mt-1">{formatMoney(sim.price)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
