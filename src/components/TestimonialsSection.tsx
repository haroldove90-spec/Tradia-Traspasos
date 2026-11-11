import React from 'react';
import { Star, ShieldCheck, TrendingUp, CheckCircle, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const metrics = [
    { value: '+1,480', label: 'Negocios y Puntos Listados', desc: 'En las 32 entidades federativas' },
    { value: '890+', label: 'Traspasos Concluidos con Éxito', desc: 'Con contratos mercantiles seguros' },
    { value: '38 días', label: 'Tiempo Promedio de Cierre', desc: 'Desde publicación hasta traspaso' },
    { value: '$1.4M', label: 'Ticket Promedio de Inversión', desc: 'En pesos mexicanos (MXN)' },
  ];

  const testimonials = [
    {
      name: 'Lic. Eduardo Santillán',
      role: 'Expropietario de Restaurante Italiano en Roma Norte',
      city: 'Ciudad de México',
      quote:
        'Necesitaba traspasar mi restaurante en menos de 2 meses por viaje al extranjero. El modo confidencial de Traspasa.com evitó alarmar a mi chef y meseros. Conseguí un comprador formal en 28 días y la sustitución de arrendatario fue transparente.',
      outcome: 'Traspasado en $2,400,000 MXN en 28 días',
    },
    {
      name: 'Ing. Mariana Valenzuela',
      role: 'Inversionista & Nueva Propietaria de Farmacia',
      city: 'Guadalajara, Jalisco',
      quote:
        'Adquirí una farmacia en Colonia Americana a través de la plataforma. La auditoría previa de licencias COFEPRIS y el inventario cotejado me dieron la certeza que ningún portal inmobiliario genérico ofrece.',
      outcome: 'Operando desde el primer día con 28% de margen',
    },
    {
      name: 'Mtro. Roberto Cantú',
      role: 'Business Broker & Consultor de Franquicias',
      city: 'San Pedro Garza García, N.L.',
      quote:
        'Como broker comercial, el panel de Traspasa me permite centralizar la cartera de 12 clientes simultáneamente. Los prospectos que llegan son inversionistas con capital líquido real.',
      outcome: '6 cierres exitosos en el último semestre',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Quantitative Rigor Metrics Strip */}
        <div className="bg-[#0F1014] text-white rounded-3xl p-8 sm:p-10 mb-16 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {metrics.map((m, i) => (
              <div key={i} className="p-3">
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#F6710C] tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1">
                  {m.label}
                </div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#F6710C]">
            Casos de Éxito y Respaldo Comercial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight mt-1">
            Respaldado por Emprendedores y Brokers en México
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Historias reales de cesión y adquisición de negocios en marcha.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <Quote className="w-8 h-8 text-[#F6710C]/40 mb-3" />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-4">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1 mb-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.outcome}</span>
                </div>
                <div className="font-bold text-xs text-[#0F1014]">{t.name}</div>
                <div className="text-[11px] text-gray-500">{t.role}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{t.city}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
