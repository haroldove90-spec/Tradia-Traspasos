import React from 'react';
import { 
  FileSearch, 
  ShieldCheck, 
  FileText, 
  Key, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Building2 
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Auditoría & Valuación',
      desc: 'Analizamos las ventas reales demostrables, estados de cuenta, vigencia de permisos ante alcaldía/municipio y condiciones del contrato de arrendamiento.',
      icon: FileSearch,
    },
    {
      num: '02',
      title: 'Acuerdo Confidencial & Due Diligence',
      desc: 'Firma de NDA previo a inspección para proteger la identidad del negocio. El comprador revisa a detalle el inventario físico, facturas de maquinaria y cartera.',
      icon: Lock,
    },
    {
      num: '03',
      title: 'Visto Bueno de Arrendamiento',
      desc: 'Gestión formal ante el propietario del inmueble para la sustitución de arrendatario o firma de nuevo contrato a largo plazo con condiciones claras.',
      icon: Building2,
    },
    {
      num: '04',
      title: 'Contrato de Cesión & Entrega Notariada',
      desc: 'Firma de contrato mercantil de cesión de derechos con inventario notariado. Entrega de llaves y acompañamiento técnico para una transición sin pausa de ventas.',
      icon: Key,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0F1014] text-white tracking-wide uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F6710C]" />
            Garantía de Transparencia Jurídica
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1014] tracking-tight">
            Cómo Funciona el Traspaso Seguro
          </h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Eliminamos el riesgo de fraude, vicios ocultos o cancelaciones sorpresivas de arrendamiento. 
            Guiamos cada paso con rigor jurídico y comercial.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:border-[#F6710C]/60 hover:shadow-lg transition-all group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-[#F6710C] group-hover:scale-110 transition-transform inline-block">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-[#0F1014] group-hover:bg-[#0F1014] group-hover:text-white transition-colors shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#0F1014] mb-2 leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-200/60 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Protección para ambas partes</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust banner */}
        <div className="mt-12 bg-[#0F1014] rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F6710C] flex items-center justify-center text-white shrink-0 shadow-md">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold">
                ¿Necesitas Contrato Tipo de Traspaso o Asesoría Notarial?
              </h4>
              <p className="text-xs text-gray-300 mt-0.5">
                Ponemos a tu disposición machotes certificados de cesión de derechos mercantiles y revisión de pólizas de arrendamiento.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-gray-300">Auditoría personalizada</span>
            <span className="w-2 h-2 rounded-full bg-[#F6710C]" />
            <span className="text-xs font-bold text-[#F6710C]">Disponible para México</span>
          </div>
        </div>

      </div>
    </section>
  );
};
