import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Scale, 
  Building2, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';

interface LegalAndGuidesModalProps {
  onClose: () => void;
  defaultTab?: 'faq' | 'guias' | 'privacidad' | 'terminos';
}

export const LegalAndGuidesModal: React.FC<LegalAndGuidesModalProps> = ({
  onClose,
  defaultTab = 'faq',
}) => {
  const [activeTab, setActiveTab] = useState<'faq' | 'guias' | 'privacidad' | 'terminos'>(defaultTab);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Qué es exactamente el traspaso de un negocio?',
      a: 'El traspaso comercial consiste en la cesión de la posesión del local comercial, las instalaciones, mobiliario, maquinaria, licencias y permisos de funcionamiento, cartera de clientes y contratos con proveedores a cambio de un precio convenido. Permite al comprador comenzar a operar inmediatamente sin incurrir en los costos y tiempos de equipar un local desde cero.',
    },
    {
      q: '¿Cómo se garantiza que el dueño del inmueble acepte el traspaso del contrato de arrendamiento?',
      a: 'Es fundamental gestionar el Visto Bueno del Arrendador antes de cualquier pago definitivo. Se elabora un Convenio de Sustitución de Arrendatario o un nuevo Contrato de Arrendamiento por escrito donde el propietario del inmueble acepta formalmente al nuevo inquilino.',
    },
    {
      q: '¿Cómo funciona el traspaso de permisos de alcoholes en México?',
      a: 'Las licencias de bebidas alcohólicas pueden traspasarse dependiendo de la legislación de cada municipio o alcaldía. En la mayoría de los casos, se tramita el cambio de titular ante la Dirección de Padrón y Licencias municipal, o bien, si la licencia está a nombre de una empresa (S.A. de C.V.), se ceden las acciones de la sociedad mercantil.',
    },
    {
      q: '¿Por qué se utiliza el modo de confidencialidad?',
      a: 'La confidencialidad protege al vendedor para evitar que los colaboradores, proveedores o caseros se alarmen ante un proceso de venta rutinario. Solo compradores calificados que firman un Acuerdo de Confidencialidad (NDA) reciben la ubicación exacta.',
    },
    {
      q: '¿Cómo se determina el valor justo de un negocio?',
      a: 'En México se utiliza principalmente la fórmula de Flujo de Caja Libre (EBITDA multiplicado por 12 a 24 meses según el giro) sumado al valor de reposición de la maquinaria, mobiliario e inventario a costo.',
    },
  ];

  const guias = [
    {
      title: 'Guía Definitiva: Cómo Valuar un Negocio en Marcha en México',
      category: 'Finanzas & M&A',
      readTime: '6 min lectura',
      desc: 'Aprende a calcular el múltiplo de EBITDA adecuado para restaurantes, farmacias, talleres y retail. Cómo auditar los tickets de punto de venta y cuentas de banco.',
    },
    {
      title: 'Checklist Legal para Traspasos Comerciales ante Notario y SAT',
      category: 'Aspectos Jurídicos',
      readTime: '8 min lectura',
      desc: 'Los 7 documentos indispensables: Opinión de cumplimiento 32-D, certificado de no adeudo de agua y predial, fianza de arrendamiento y acta de inventario con fe de hechos.',
    },
    {
      title: 'Modelo de Contrato Tipo de Promesa y Cesión de Derechos Comerciales',
      category: 'Contratos & Formatos',
      readTime: '5 min lectura',
      desc: 'Estructura recomendada de cláusulas de no competencia territorial, vicios ocultos, período de acompañamiento y cesión de marcas ante el IMPI.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0F1014] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#F6710C]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Centro de Asesoría, Legal y Cumplimiento
              </h2>
              <p className="text-xs text-gray-400">
                Información transparente para operaciones comerciales en México
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-2.5 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'faq' ? 'bg-[#0F1014] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Preguntas Frecuentes (FAQ)
          </button>
          <button
            onClick={() => setActiveTab('guias')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'guias' ? 'bg-[#0F1014] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Guías y Blog de Traspasos
          </button>
          <button
            onClick={() => setActiveTab('privacidad')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'privacidad' ? 'bg-[#0F1014] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Aviso de Privacidad (LFPDPPP)
          </button>
          <button
            onClick={() => setActiveTab('terminos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'terminos' ? 'bg-[#0F1014] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Términos y Deslinde
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#0F1014]">
                  Preguntas Frecuentes sobre Compra y Venta de Negocios
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Respuestas claras para compradores primerizos y propietarios interesados en traspasar.
                </p>
              </div>

              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-gray-50/70 hover:bg-gray-100/70 text-xs sm:text-sm font-bold text-gray-900"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#F6710C]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 bg-white text-xs text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Guías */}
          {activeTab === 'guias' && (
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#0F1014]">
                  Guías de Asesoría Legal y Financiera
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Artículos redactados por abogados mercantiles y valuadores de negocios en México.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {guias.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:border-[#F6710C] transition-all"
                  >
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-1">
                      <span className="font-bold text-[#F6710C] uppercase">{g.category}</span>
                      <span>·</span>
                      <span>{g.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-[#0F1014]">{g.title}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{g.desc}</p>
                    <button 
                      onClick={() => alert(`Descargando machote y guía completa: ${g.title}`)}
                      className="mt-3 text-xs font-bold text-[#0F1014] hover:text-[#F6710C] flex items-center gap-1"
                    >
                      Leer guía completa y descargar formatos →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Aviso de Privacidad */}
          {activeTab === 'privacidad' && (
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
              <h3 className="text-base font-bold text-[#0F1014] mb-2">
                Aviso de Privacidad Integral (Cumplimiento LFPDPPP - México)
              </h3>
              <p>
                En cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento, <em>Traspasa México S.A.P.I. de C.V.</em>, con domicilio en Ciudad de México, es el responsable del tratamiento y salvaguarda de sus datos personales.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">1. Finalidades del Tratamiento de Datos</h4>
              <p>
                Los datos recabados (nombre, teléfono de WhatsApp, correo electrónico, comprobantes de titularidad o identificación) son tratados con las finalidades de: (a) Enlazar a compradores y vendedores de traspasos comerciales; (b) Validar la autenticidad documental de los anuncios con insignia de Verificado; (c) Generar los enlaces y mensajes cifrados de contacto; (d) Emisión de Comprobantes Fiscales Digitales por Internet (CFDI) conforme al Código Fiscal de la Federación.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">2. Protección de Confidencialidad Comercial</h4>
              <p>
                Traspasa.com protege celosamente la confidencialidad de los negocios inscritos en "Modo Confidencial", reteniendo la divulgación de ubicaciones exactas o razones sociales hasta la confirmación de interés legítimo por parte del comprador.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">3. Derechos ARCO</h4>
              <p>
                Usted tiene derecho de Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO) enviando una solicitud formal a <code>privacidad@traspasa.com.mx</code>.
              </p>
            </div>
          )}

          {/* Términos */}
          {activeTab === 'terminos' && (
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
              <h3 className="text-base font-bold text-[#0F1014] mb-2">
                Términos, Condiciones de Uso y Deslinde de Responsabilidad Operativa
              </h3>
              <p>
                El acceso y uso de la plataforma <strong>Traspasa.com</strong> constituye la aceptación de estos términos y condiciones.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">1. Naturaleza de la Plataforma</h4>
              <p>
                Traspasa.com actúa como un portal digital publicitario y de enlace entre partes interesadas en la cesión mercantil de puntos de venta y negocios en marcha. La información financiera, ventas y utilidades mostradas son proporcionadas bajo protesta de decir verdad por cada vendedor o broker acreditado.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">2. Deber de Auditoría (Due Diligence)</h4>
              <p>
                Traspasa.com exhorta a todo comprador a realizar una auditoría contable y jurídica independiente antes de realizar cualquier entrega de anticipos económicos, así como validar la vigencia formal del contrato de arrendamiento y la disposición del arrendador para la suscripción de nuevos instrumentos jurídicos.
              </p>
              <h4 className="font-bold text-gray-900 pt-2">3. Deslinde Financiero</h4>
              <p>
                Traspasa.com no asume responsabilidad directa por el éxito operacional futuro del establecimiento adquirido ni por divergencias contables no reflejadas durante el proceso de Due Diligence privado entre las partes.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
