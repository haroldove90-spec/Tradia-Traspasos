import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface ValuationCalculatorModalProps {
  onClose: () => void;
  onOpenPublish: () => void;
}

export const ValuationCalculatorModal: React.FC<ValuationCalculatorModalProps> = ({
  onClose,
  onOpenPublish,
}) => {
  const [category, setCategory] = useState('restaurantes');
  const [monthlySales, setMonthlySales] = useState<number>(350000);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(85000);
  const [machineryValue, setMachineryValue] = useState<number>(450000);
  const [inventoryValue, setInventoryValue] = useState<number>(120000);
  const [hasLiquorLicense, setHasLiquorLicense] = useState(true);

  // Category multiples for valuation (standard Mexican M&A small business valuation)
  const multipliers: Record<string, { baseMultiplierMonths: number; label: string }> = {
    restaurantes: { baseMultiplierMonths: 18, label: 'Restaurantes y Bares (18 - 24 meses de utilidad)' },
    cafeterias: { baseMultiplierMonths: 16, label: 'Cafeterías y Panaderías (15 - 20 meses de utilidad)' },
    talleres: { baseMultiplierMonths: 15, label: 'Servicios Automotrices (14 - 18 meses)' },
    farmacias: { baseMultiplierMonths: 20, label: 'Farmacias y Salud (18 - 24 meses)' },
    abarrotes: { baseMultiplierMonths: 12, label: 'Abarrotes y Minisupers (10 - 15 meses)' },
    franquicias: { baseMultiplierMonths: 22, label: 'Franquicias Acreditadas (20 - 28 meses)' },
    belleza_spa: { baseMultiplierMonths: 16, label: 'Spas y Belleza (14 - 19 meses)' },
  };

  const selectedMult = multipliers[category] || multipliers.restaurantes;

  // Calculation
  const annualProfit = monthlyProfit * 12;
  const earningsBaseValue = monthlyProfit * selectedMult.baseMultiplierMonths;
  const tangibleAssetsValue = machineryValue + inventoryValue;
  const liquorLicenseBonus = hasLiquorLicense && (category === 'restaurantes' || category === 'franquicias') ? 180000 : 0;

  const estimatedValue = earningsBaseValue + (tangibleAssetsValue * 0.75) + liquorLicenseBonus;
  const lowRange = Math.round(estimatedValue * 0.88);
  const highRange = Math.round(estimatedValue * 1.15);
  const paybackMonths = monthlyProfit > 0 ? Math.ceil(estimatedValue / monthlyProfit) : 0;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs overflow-y-auto flex justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto border border-gray-100 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="bg-[#0F1014] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#F6710C]" />
            <div>
              <h2 className="text-base sm:text-lg font-bold">
                Calculadora de Valuación de Traspaso Comercial
              </h2>
              <p className="text-xs text-gray-400">
                Modelo estandarizado según flujos de caja y valor de reposición de activos en México
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

        {/* Content */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Inputs Column */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-800 mb-1">
                Giro o Categoría del Negocio
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-white font-medium"
              >
                <option value="restaurantes">Restaurantes y Bares</option>
                <option value="cafeterias">Cafeterías y Panaderías</option>
                <option value="talleres">Servicios Automotrices y Talleres</option>
                <option value="farmacias">Farmacias y Salud</option>
                <option value="abarrotes">Abarrotes y Minisupers</option>
                <option value="franquicias">Franquicias Comerciales</option>
                <option value="belleza_spa">Salud, Belleza y Spas</option>
              </select>
              <div className="text-[11px] text-gray-500 mt-1">{selectedMult.label}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Ventas Mensuales Promedio (MXN)
                </label>
                <input
                  type="number"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(Number(e.target.value))}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Utilidad Neta Mensual Estimada (MXN)
                </label>
                <input
                  type="number"
                  value={monthlyProfit}
                  onChange={(e) => setMonthlyProfit(Number(e.target.value))}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono text-emerald-700 font-bold"
                />
                <span className="text-[10px] text-gray-400">
                  Margen: {monthlySales > 0 ? ((monthlyProfit / monthlySales) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Valor Actual de Maquinaria y Mobiliario
                </label>
                <input
                  type="number"
                  value={machineryValue}
                  onChange={(e) => setMachineryValue(Number(e.target.value))}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono"
                />
                <span className="text-[10px] text-gray-400">Valor de reposición en mercado</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-800 mb-1">
                  Valor de Inventario a Costo
                </label>
                <input
                  type="number"
                  value={inventoryValue}
                  onChange={(e) => setInventoryValue(Number(e.target.value))}
                  className="w-full text-xs border border-gray-300 rounded-lg p-2.5 font-mono"
                />
                <span className="text-[10px] text-gray-400">Mercancía vendible actual</span>
              </div>
            </div>

            {/* Licencia de alcoholes check */}
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-800 font-medium">
                <input
                  type="checkbox"
                  checked={hasLiquorLicense}
                  onChange={(e) => setHasLiquorLicense(e.target.checked)}
                  className="accent-[#F6710C] w-4 h-4 rounded"
                />
                <span>Cuenta con Licencia de Venta de Alcoholes vigente y transferible</span>
              </label>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#F6710C] uppercase tracking-wider block">
                Valoración Sugerida de Traspaso
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0F1014] font-mono mt-1">
                {formatMoney(estimatedValue)}
              </div>
              <div className="text-xs text-gray-500 mt-1 font-mono">
                Rango de negociación: {formatMoney(lowRange)} – {formatMoney(highRange)}
              </div>

              {/* Breakdown */}
              <div className="mt-6 space-y-2.5 text-xs border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Valor por Flujo de Caja (EBITDA):</span>
                  <span className="font-mono font-semibold text-gray-900">{formatMoney(earningsBaseValue)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Activos Físicos e Inventario:</span>
                  <span className="font-mono font-semibold text-gray-900">{formatMoney(tangibleAssetsValue * 0.75)}</span>
                </div>
                {liquorLicenseBonus > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Plusvalía de Licencia de Alcoholes:</span>
                    <span className="font-mono font-bold">+{formatMoney(liquorLicenseBonus)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700 pt-2 border-t border-gray-200 font-semibold">
                  <span>Payback para el Comprador:</span>
                  <span className="font-mono text-[#F6710C]">{paybackMonths} meses</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenPublish();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#F6710C] hover:bg-[#e06206] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all"
              >
                Publicar este Negocio con este Precio
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-gray-400 text-center">
                * Estimación referencial basada en múltiplos de mercado en México. Para avalúos notariales oficiales, solicita auditoría en nuestro panel.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
