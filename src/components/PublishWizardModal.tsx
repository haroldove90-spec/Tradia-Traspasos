import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Building2, 
  DollarSign, 
  Image as ImageIcon, 
  ShieldCheck, 
  CreditCard, 
  Lock,
  Plus,
  Trash2,
  FileText
} from 'lucide-react';
import { BusinessCategory, TraspasoListing } from '../types/traspaso';
import { MEXICAN_STATES } from '../data/mockTraspasos';

interface PublishWizardModalProps {
  onClose: () => void;
  onPublishSuccess: (newListing: TraspasoListing) => void;
}

export const PublishWizardModal: React.FC<PublishWizardModalProps> = ({
  onClose,
  onPublishSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishComplete, setPublishComplete] = useState(false);

  // Form State - Step 1: General Info
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('restaurantes');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('Ciudad de México');
  const [cityOrMunicipality, setCityOrMunicipality] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [isConfidentialLocation, setIsConfidentialLocation] = useState(false);
  const [reasonForTransfer, setReasonForTransfer] = useState('');

  // Step 2: Financials & Technical
  const [price, setPrice] = useState<number | ''>('');
  const [monthlyRent, setMonthlyRent] = useState<number | ''>('');
  const [monthlySales, setMonthlySales] = useState<number | ''>('');
  const [estimatedProfit, setEstimatedProfit] = useState<number | ''>('');
  const [areaSqMeters, setAreaSqMeters] = useState<number | ''>('');
  const [employeesCount, setEmployeesCount] = useState<number | ''>('');
  const [businessAgeYears, setBusinessAgeYears] = useState<number | ''>('');
  const [hasLiquorLicense, setHasLiquorLicense] = useState(false);
  const [hasTradeMark, setHasTradeMark] = useState(false);
  const [includesLegalEntity, setIncludesLegalEntity] = useState(false);
  const [assetsList, setAssetsList] = useState<string[]>([
    'Mobiliario de comensales y estantería completa',
    'Equipo de refrigeración industrial',
    'Terminal de punto de venta e inventario'
  ]);
  const [newAssetInput, setNewAssetInput] = useState('');

  // Step 3: Photos
  const [selectedImages, setSelectedImages] = useState<string[]>([
    '/src/assets/images/biz_cafeteria_artesanal_1794418592963.jpg'
  ]);

  // Step 4: Contact & Verification
  const [sellerName, setSellerName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [sellerType, setSellerType] = useState<'propietario' | 'broker'>('propietario');
  const [requestVerification, setRequestVerification] = useState(true);

  // Step 5: Visibility Plan & Billing
  const [selectedPlan, setSelectedPlan] = useState<'basico' | 'destacado' | 'premium'>('destacado');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mercadopago' | 'oxxo'>('stripe');
  const [requiresCFDI, setRequiresCFDI] = useState(false);
  const [rfc, setRfc] = useState('');
  const [razonSocial, setRazonSocial] = useState('');

  const addAsset = () => {
    if (newAssetInput.trim()) {
      setAssetsList([...assetsList, newAssetInput.trim()]);
      setNewAssetInput('');
    }
  };

  const removeAsset = (idx: number) => {
    setAssetsList(assetsList.filter((_, i) => i !== idx));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!title || !description || !cityOrMunicipality) {
        alert('Por favor completa el título, descripción y municipio.');
        return;
      }
    } else if (currentStep === 2) {
      if (!price || !monthlyRent) {
        alert('Por favor indica al menos el precio del traspaso y la renta mensual.');
        return;
      }
    } else if (currentStep === 4) {
      if (!sellerName || !contactPhone) {
        alert('Por favor proporciona tu nombre y número de WhatsApp para recibir prospectos.');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(5, prev + 1));
  };

  const handleFinalPublish = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `TRP-${Math.floor(1000 + Math.random() * 9000)}`;
      const priceNum = Number(price) || 850000;
      const salesNum = Number(monthlySales) || 280000;
      const profitNum = Number(estimatedProfit) || 65000;
      const margin = salesNum > 0 ? Number(((profitNum / salesNum) * 100).toFixed(1)) : 22.0;

      const newListing: TraspasoListing = {
        id: generatedId,
        title: title || 'Traspaso de Negocio Comercial',
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        category,
        categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
        price: priceNum,
        monthlyRent: Number(monthlyRent) || 25000,
        monthlySales: salesNum,
        estimatedProfit: profitNum,
        profitMargin: margin,
        areaSqMeters: Number(areaSqMeters) || 120,
        employeesCount: Number(employeesCount) || 4,
        businessAgeYears: Number(businessAgeYears) || 3,
        roiMonths: profitNum > 0 ? Math.ceil(priceNum / profitNum) : 18,
        location: {
          state,
          cityOrMunicipality: cityOrMunicipality || 'Centro',
          neighborhood: neighborhood || 'Comercial',
          lat: 19.4326 + (Math.random() - 0.5) * 0.1,
          lng: -99.1332 + (Math.random() - 0.5) * 0.1,
          isConfidentialLocation,
        },
        operationStatus: 'activa',
        includedAssets: assetsList,
        leaseTerms: {
          yearsRemaining: 3,
          isRenewable: true,
          guarantorRequired: 'Aval con bien raíz o fianza mercantil',
          securityDepositMonths: 2,
        },
        licenses: {
          hasLiquorLicense,
          hasTradeMark,
          includesLegalEntity,
          sanitaryPermits: true,
        },
        reasonForTransfer: reasonForTransfer || 'Planes personales del titular',
        images: selectedImages.length > 0 ? selectedImages : ['/src/assets/images/biz_cafeteria_artesanal_1794418592963.jpg'],
        verified: requestVerification,
        featured: selectedPlan !== 'basico',
        opportunityBadge: selectedPlan === 'premium',
        publishedAt: new Date().toISOString().split('T')[0],
        viewsCount: 1,
        leadsCount: 0,
        contactPhone,
        sellerName,
        sellerType,
      };

      setIsSubmitting(false);
      setPublishComplete(true);
      onPublishSuccess(newListing);
    }, 1200);
  };

  const steps = [
    { num: 1, title: 'Datos Generales' },
    { num: 2, title: 'Finanzas e Inventario' },
    { num: 3, title: 'Fotografías' },
    { num: 4, title: 'Contacto & Verificación' },
    { num: 5, title: 'Plan de Publicación' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Wizard Header */}
        <div className="bg-[#0F1014] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div>
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#F6710C]" />
              Publicar Traspaso de Negocio
            </h2>
            <p className="text-xs text-gray-400">
              Paso {currentStep} de 5: {steps[currentStep - 1].title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps Stepper Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 shrink-0 hidden sm:block">
          <div className="flex items-center justify-between">
            {steps.map((st) => (
              <div key={st.num} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === st.num
                      ? 'bg-[#F6710C] text-white shadow-xs'
                      : currentStep > st.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > st.num ? '✓' : st.num}
                </div>
                <span
                  className={`text-xs font-medium ${
                    currentStep === st.num ? 'text-[#0F1014] font-bold' : 'text-gray-500'
                  }`}
                >
                  {st.title}
                </span>
                {st.num < 5 && <div className="w-6 h-[1px] bg-gray-300 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {publishComplete ? (
            <div className="text-center py-10 space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1014]">
                ¡Tu Traspaso ha sido publicado con éxito!
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Tu anuncio ya está activo en el catálogo público de Traspasa.com. Si solicitaste verificación documental, nuestro equipo legal revisará tu comprobante en menos de 24 horas.
              </p>
              {requiresCFDI && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs text-gray-700">
                  Factura CFDI 4.0 timbrada automáticamente a favor de <strong>{razonSocial || rfc}</strong> enviada a tu correo.
                </div>
              )}
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Ver en el Catálogo
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: General Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Título Comercial del Anuncio *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Restaurante Bistro con Licencia de Alcoholes en Polanco"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Giro / Categoría *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as BusinessCategory)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none bg-white"
                      >
                        <option value="restaurantes">Restaurantes y Bares</option>
                        <option value="cafeterias">Cafeterías y Panaderías</option>
                        <option value="talleres">Servicios Automotrices / Talleres</option>
                        <option value="farmacias">Farmacias y Salud</option>
                        <option value="abarrotes">Abarrotes y Tiendas</option>
                        <option value="franquicias">Franquicias Comerciales</option>
                        <option value="belleza_spa">Salud, Belleza y Spas</option>
                        <option value="retail">Retail y Tiendas de Moda</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Estado de la República *</label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none bg-white"
                      >
                        {MEXICAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Municipio / Alcaldía *</label>
                      <input
                        type="text"
                        placeholder="Ej. Cuauhtémoc, Zapopan, San Pedro..."
                        value={cityOrMunicipality}
                        onChange={(e) => setCityOrMunicipality(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Colonia o Corredor Comercial</label>
                      <input
                        type="text"
                        placeholder="Ej. Roma Norte, Providencia, Valle Oriente..."
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Confidentiality toggle */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="confidentialCheck"
                      checked={isConfidentialLocation}
                      onChange={(e) => setIsConfidentialLocation(e.target.checked)}
                      className="accent-[#F6710C] w-4 h-4 mt-0.5"
                    />
                    <label htmlFor="confidentialCheck" className="text-xs text-amber-900 cursor-pointer">
                      <strong className="font-semibold block">Activar Modo de Máxima Confidencialidad:</strong>
                      Ocultar la dirección exacta y nombre público del negocio hasta que el comprador envíe una consulta y firme el Acuerdo de Confidencialidad (NDA). Recomendado para proteger la estabilidad del personal y proveedores.
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Descripción Detallada del Negocio *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe la historia, clientela, flujo de ventas, equipamiento y por qué es una excelente oportunidad..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Motivo del Traspaso (Transparencia con el comprador)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Cambio de residencia, jubilación, nuevos proyectos..."
                      value={reasonForTransfer}
                      onChange={(e) => setReasonForTransfer(e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Financials & Assets */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Precio de Traspaso (MXN) *
                      </label>
                      <input
                        type="number"
                        placeholder="Ej. 1500000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Renta Mensual del Local (MXN) *
                      </label>
                      <input
                        type="number"
                        placeholder="Ej. 35000"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Ventas Mensuales Promedio (MXN)
                      </label>
                      <input
                        type="number"
                        placeholder="Ej. 320000"
                        value={monthlySales}
                        onChange={(e) => setMonthlySales(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Utilidad Neta Estimada (MXN)
                      </label>
                      <input
                        type="number"
                        placeholder="Ej. 85000"
                        value={estimatedProfit}
                        onChange={(e) => setEstimatedProfit(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Superficie (m²)</label>
                      <input
                        type="number"
                        placeholder="Ej. 120"
                        value={areaSqMeters}
                        onChange={(e) => setAreaSqMeters(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">No. de Empleados</label>
                      <input
                        type="number"
                        placeholder="Ej. 5"
                        value={employeesCount}
                        onChange={(e) => setEmployeesCount(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Antigüedad (Años)</label>
                      <input
                        type="number"
                        placeholder="Ej. 4"
                        value={businessAgeYears}
                        onChange={(e) => setBusinessAgeYears(e.target.value ? Number(e.target.value) : '')}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Legal Options */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="text-xs font-bold text-gray-800 mb-2">Condiciones Legales e Intangibles Incluidos:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasLiquorLicense}
                          onChange={(e) => setHasLiquorLicense(e.target.checked)}
                          className="accent-[#F6710C]"
                        />
                        <span>Permiso de alcoholes vigente</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasTradeMark}
                          onChange={(e) => setHasTradeMark(e.target.checked)}
                          className="accent-[#F6710C]"
                        />
                        <span>Marca registrada (IMPI)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includesLegalEntity}
                          onChange={(e) => setIncludesLegalEntity(e.target.checked)}
                          className="accent-[#F6710C]"
                        />
                        <span>Sociedad Anónima con RFC</span>
                      </label>
                    </div>
                  </div>

                  {/* Included Assets List */}
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">
                      Inventario y Maquinaria Incluida:
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Ej. Horno de convección, 10 mesas de madera..."
                        value={newAssetInput}
                        onChange={(e) => setNewAssetInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAsset())}
                        className="flex-1 text-xs border border-gray-300 rounded-lg p-2 focus:border-[#F6710C] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={addAsset}
                        className="px-3 py-2 bg-[#0F1014] hover:bg-[#F6710C] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Agregar
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {assetsList.map((asset, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 text-xs text-gray-700">
                          <span>• {asset}</span>
                          <button
                            type="button"
                            onClick={() => removeAsset(i)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Photos */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-[#F6710C] transition-colors cursor-pointer bg-gray-50/50">
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <div className="text-xs font-bold text-gray-800">
                      Sube las fotografías de tu negocio
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Formatos JPG, PNG o WebP. Los anuncios con 3 o más fotos reciben 4.8x más prospectos calificados.
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-gray-800 mb-2">Fotos seleccionadas:</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedImages.map((img, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 relative group">
                          <img src={img} alt="preview" className="w-full h-full object-cover" />
                          <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                            {idx === 0 ? 'Principal' : `Foto ${idx + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Verification */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">Tu Nombre Completo *</label>
                      <input
                        type="text"
                        placeholder="Ej. Lic. Fernando Morales"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">WhatsApp para Contacto Directo *</label>
                      <input
                        type="tel"
                        placeholder="10 dígitos (ej. 5512345678)"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:border-[#F6710C] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1">Tipo de Publicador</label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${sellerType === 'propietario' ? 'border-[#F6710C] bg-orange-50/40 font-semibold' : 'border-gray-200'}`}>
                        <input
                          type="radio"
                          name="sellerType"
                          checked={sellerType === 'propietario'}
                          onChange={() => setSellerType('propietario')}
                          className="accent-[#F6710C]"
                        />
                        <span>Propietario Directo</span>
                      </label>
                      <label className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 ${sellerType === 'broker' ? 'border-[#F6710C] bg-orange-50/40 font-semibold' : 'border-gray-200'}`}>
                        <input
                          type="radio"
                          name="sellerType"
                          checked={sellerType === 'broker'}
                          onChange={() => setSellerType('broker')}
                          className="accent-[#F6710C]"
                        />
                        <span>Broker / Agente Comercial</span>
                      </label>
                    </div>
                  </div>

                  {/* Verification checkbox */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="verifyCheck"
                      checked={requestVerification}
                      onChange={(e) => setRequestVerification(e.target.checked)}
                      className="accent-emerald-600 w-4 h-4 mt-0.5"
                    />
                    <label htmlFor="verifyCheck" className="text-xs text-emerald-900 cursor-pointer">
                      <strong className="font-bold flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        Solicitar Insignia de "Publicación Verificada"
                      </strong>
                      <span className="block mt-0.5 text-emerald-800">
                        Los anuncios verificados generan 3 veces más confianza. Solo requerimos carátula del contrato de arrendamiento o identificación oficial.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 5: Visibility Plan & Payment / CFDI */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <div className="text-xs text-gray-600">
                    Selecciona el nivel de visibilidad para acelerar el cierre del traspaso de tu negocio:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Basic */}
                    <div
                      onClick={() => setSelectedPlan('basico')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedPlan === 'basico' ? 'border-[#0F1014] ring-2 ring-[#0F1014] bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#0F1014]">Plan Básico</div>
                      <div className="text-xl font-extrabold text-gray-900 mt-1 font-mono">Gratis</div>
                      <div className="text-[11px] text-gray-500 mt-2 space-y-1">
                        <div>• Duración: 30 días</div>
                        <div>• Hasta 3 fotografías</div>
                        <div>• Contacto por formulario</div>
                      </div>
                    </div>

                    {/* Pro */}
                    <div
                      onClick={() => setSelectedPlan('destacado')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                        selectedPlan === 'destacado' ? 'border-[#F6710C] ring-2 ring-[#F6710C] bg-orange-50/30' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="absolute -top-2.5 right-3 bg-[#F6710C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Más Popular
                      </div>
                      <div className="font-bold text-sm text-[#0F1014]">Destacado Pro</div>
                      <div className="text-xl font-extrabold text-[#F6710C] mt-1 font-mono">$899 MXN</div>
                      <div className="text-[11px] text-gray-600 mt-2 space-y-1">
                        <div>• Primeros lugares en su categoría</div>
                        <div>• Enlace directo a WhatsApp</div>
                        <div>• Insignia Verificada incluida</div>
                        <div>• Hasta 15 fotos en alta calidad</div>
                      </div>
                    </div>

                    {/* Premium */}
                    <div
                      onClick={() => setSelectedPlan('premium')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedPlan === 'premium' ? 'border-[#0F1014] ring-2 ring-[#0F1014] bg-gray-900 text-white' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`font-bold text-sm ${selectedPlan === 'premium' ? 'text-white' : 'text-[#0F1014]'}`}>
                        Oportunidad Urgente
                      </div>
                      <div className="text-xl font-extrabold text-[#F6710C] mt-1 font-mono">$1,899 MXN</div>
                      <div className={`text-[11px] mt-2 space-y-1 ${selectedPlan === 'premium' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div>• Portada en Página de Inicio</div>
                        <div>• Etiqueta de "Oportunidad Urgente"</div>
                        <div>• Renovación semanal automática</div>
                        <div>• Asesoría para contrato tipo de cesión</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Gateway Selector */}
                  {selectedPlan !== 'basico' && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                      <div className="text-xs font-bold text-gray-800">
                        Pasarela de Pago Segura:
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('stripe')}
                          className={`p-2.5 rounded-lg border text-center font-semibold transition-all ${
                            paymentMethod === 'stripe' ? 'border-[#F6710C] bg-white text-[#F6710C] shadow-xs' : 'border-gray-200 text-gray-600 bg-white/50'
                          }`}
                        >
                          Tarjeta (Stripe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('mercadopago')}
                          className={`p-2.5 rounded-lg border text-center font-semibold transition-all ${
                            paymentMethod === 'mercadopago' ? 'border-[#F6710C] bg-white text-[#F6710C] shadow-xs' : 'border-gray-200 text-gray-600 bg-white/50'
                          }`}
                        >
                          Mercado Pago
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('oxxo')}
                          className={`p-2.5 rounded-lg border text-center font-semibold transition-all ${
                            paymentMethod === 'oxxo' ? 'border-[#F6710C] bg-white text-[#F6710C] shadow-xs' : 'border-gray-200 text-gray-600 bg-white/50'
                          }`}
                        >
                          Efectivo en OXXO
                        </button>
                      </div>

                      {/* Facturación CFDI */}
                      <div className="pt-2 border-t border-gray-200">
                        <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={requiresCFDI}
                            onChange={(e) => setRequiresCFDI(e.target.checked)}
                            className="accent-[#F6710C]"
                          />
                          <span>Requiero Factura Fiscal con CFDI 4.0 (México)</span>
                        </label>

                        {requiresCFDI && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2">
                            <input
                              type="text"
                              placeholder="RFC (12 o 13 caracteres)"
                              value={rfc}
                              onChange={(e) => setRfc(e.target.value.toUpperCase())}
                              className="text-xs border border-gray-300 rounded-lg p-2 font-mono"
                            />
                            <input
                              type="text"
                              placeholder="Razón Social o Nombre Fiscal"
                              value={razonSocial}
                              onChange={(e) => setRazonSocial(e.target.value)}
                              className="text-xs border border-gray-300 rounded-lg p-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Wizard Footer Controls */}
        {!publishComplete && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Anterior
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-[#0F1014] hover:bg-[#F6710C] rounded-lg transition-colors shadow-sm"
              >
                Siguiente Paso <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalPublish}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-[#F6710C] hover:bg-[#e06206] rounded-lg shadow-md transition-all active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Procesando publicación...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirmar y Publicar Negocio
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
