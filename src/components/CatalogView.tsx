import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Grid, 
  List, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  Zap, 
  ArrowUpDown,
  Building2,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { TraspasoListing, FilterState } from '../types/traspaso';
import { TraspasoCard } from './TraspasoCard';
import { InteractiveMap } from './InteractiveMap';
import { MEXICAN_STATES, POPULAR_CATEGORIES } from '../data/mockTraspasos';

interface CatalogViewProps {
  listings: TraspasoListing[];
  onSelectListing: (listing: TraspasoListing) => void;
  onToggleFavorite: (id: string) => void;
  favorites: string[];
  initialCategory?: string;
  initialKeyword?: string;
  initialState?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  listings,
  onSelectListing,
  onToggleFavorite,
  favorites,
  initialCategory = '',
  initialKeyword = '',
  initialState = '',
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    keyword: initialKeyword,
    category: initialCategory === 'all' ? '' : initialCategory,
    state: initialState,
    municipality: '',
    minPrice: '',
    maxPrice: '',
    maxRent: '',
    minSales: '',
    operationStatus: 'all',
    hasLiquorLicense: false,
    hasTradeMark: false,
    includesLegalEntity: false,
    verifiedOnly: false,
    opportunityOnly: false,
    sortBy: 'relevance',
  });

  const resetFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      state: '',
      municipality: '',
      minPrice: '',
      maxPrice: '',
      maxRent: '',
      minSales: '',
      operationStatus: 'all',
      hasLiquorLicense: false,
      hasTradeMark: false,
      includesLegalEntity: false,
      verifiedOnly: false,
      opportunityOnly: false,
      sortBy: 'relevance',
    });
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Keyword
      if (filters.keyword.trim()) {
        const query = filters.keyword.toLowerCase();
        const matches =
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.location.neighborhood.toLowerCase().includes(query) ||
          item.location.cityOrMunicipality.toLowerCase().includes(query) ||
          item.categoryLabel.toLowerCase().includes(query);
        if (!matches) return false;
      }

      // Category
      if (filters.category && item.category !== filters.category) {
        return false;
      }

      // State
      if (filters.state && item.location.state !== filters.state) {
        return false;
      }

      // Price
      if (filters.minPrice !== '' && item.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice !== '' && item.price > Number(filters.maxPrice)) {
        return false;
      }

      // Rent
      if (filters.maxRent !== '' && item.monthlyRent > Number(filters.maxRent)) {
        return false;
      }

      // Sales
      if (filters.minSales !== '' && item.monthlySales < Number(filters.minSales)) {
        return false;
      }

      // Operation Status
      if (filters.operationStatus !== 'all' && item.operationStatus !== filters.operationStatus) {
        return false;
      }

      // Specific conditions
      if (filters.hasLiquorLicense && !item.licenses.hasLiquorLicense) {
        return false;
      }
      if (filters.hasTradeMark && !item.licenses.hasTradeMark) {
        return false;
      }
      if (filters.includesLegalEntity && !item.licenses.includesLegalEntity) {
        return false;
      }
      if (filters.verifiedOnly && !item.verified) {
        return false;
      }
      if (filters.opportunityOnly && !item.opportunityBadge) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') return a.price - b.price;
      if (filters.sortBy === 'price_desc') return b.price - a.price;
      if (filters.sortBy === 'sales_desc') return b.monthlySales - a.monthlySales;
      if (filters.sortBy === 'recent') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      // Default: featured first, then id
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [listings, filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.keyword) count++;
    if (filters.category) count++;
    if (filters.state) count++;
    if (filters.minPrice !== '') count++;
    if (filters.maxPrice !== '') count++;
    if (filters.maxRent !== '') count++;
    if (filters.minSales !== '') count++;
    if (filters.operationStatus !== 'all') count++;
    if (filters.hasLiquorLicense) count++;
    if (filters.hasTradeMark) count++;
    if (filters.includesLegalEntity) count++;
    if (filters.verifiedOnly) count++;
    if (filters.opportunityOnly) count++;
    return count;
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Catalog Header Bar */}
      <div className="mb-6 pb-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1014] tracking-tight">
            Catálogo de Negocios en Traspaso
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Explora {filteredListings.length} oportunidades comerciales auditadas y listas para operar en México.
          </p>
        </div>

        {/* View Mode & Sorter Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
          
          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800"
          >
            <Filter className="w-4 h-4 text-[#F6710C]" />
            Filtros {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent focus:outline-none text-xs font-medium cursor-pointer"
            >
              <option value="relevance">Relevancia / Destacados</option>
              <option value="price_asc">Precio: Menor a Mayor</option>
              <option value="price_desc">Precio: Mayor a Menor</option>
              <option value="sales_desc">Mayor Facturación</option>
              <option value="recent">Más Recientes</option>
            </select>
          </div>

          {/* View Mode Segmented Switcher */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-[#0F1014] shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Vista de cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                viewMode === 'list' ? 'bg-white text-[#0F1014] shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Vista de lista detallada"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors ${
                viewMode === 'map' ? 'bg-[#0F1014] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Vista de mapa interactivo"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F6710C]" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-xl border border-gray-200 p-5 space-y-6 sticky top-24 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 font-bold text-sm text-[#0F1014]">
              <SlidersHorizontal className="w-4 h-4 text-[#F6710C]" />
              <span>Filtros Avanzados</span>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-[#F6710C] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" /> Limpiar ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Palabra Clave o Zona
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Ej. Polanco, café, horno..."
                value={filters.keyword}
                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 pl-8 focus:border-[#F6710C] focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Giro / Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Giro Comercial
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:border-[#F6710C] focus:outline-none"
            >
              <option value="">Todos los Giros</option>
              <option value="restaurantes">Restaurantes y Bares</option>
              <option value="cafeterias">Cafeterías y Panaderías</option>
              <option value="talleres">Servicios Automotrices</option>
              <option value="farmacias">Farmacias y Salud</option>
              <option value="abarrotes">Abarrotes y Tiendas</option>
              <option value="franquicias">Franquicias Comerciales</option>
              <option value="belleza_spa">Salud, Belleza y Spas</option>
              <option value="retail">Retail y Moda</option>
            </select>
          </div>

          {/* State / Estado */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Estado Geográfico
            </label>
            <select
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
              className="w-full text-xs border border-gray-200 rounded-lg p-2 bg-white focus:border-[#F6710C] focus:outline-none"
            >
              <option value="">Toda la República</option>
              {MEXICAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Precio Máximo Traspaso
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Mínimo MXN"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : '' })}
                className="text-xs border border-gray-200 rounded-lg p-2 focus:border-[#F6710C] focus:outline-none font-mono"
              />
              <input
                type="number"
                placeholder="Máximo MXN"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })}
                className="text-xs border border-gray-200 rounded-lg p-2 focus:border-[#F6710C] focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Monthly Rent */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Renta Mensual Máxima
            </label>
            <input
              type="number"
              placeholder="Hasta $MXN/mes"
              value={filters.maxRent}
              onChange={(e) => setFilters({ ...filters, maxRent: e.target.value ? Number(e.target.value) : '' })}
              className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:border-[#F6710C] focus:outline-none font-mono"
            />
          </div>

          {/* State of operation */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Estatus del Inmueble
            </label>
            <div className="space-y-1.5 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.operationStatus === 'all'}
                  onChange={() => setFilters({ ...filters, operationStatus: 'all' })}
                  className="accent-[#F6710C]"
                />
                <span>Cualquiera</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.operationStatus === 'activa'}
                  onChange={() => setFilters({ ...filters, operationStatus: 'activa' })}
                  className="accent-[#F6710C]"
                />
                <span>En operación activa (en marcha)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  checked={filters.operationStatus === 'cerrado_equipado'}
                  onChange={() => setFilters({ ...filters, operationStatus: 'cerrado_equipado' })}
                  className="accent-[#F6710C]"
                />
                <span>Cerrado / listo para abrir</span>
              </label>
            </div>
          </div>

          {/* Specific Commercial / Legal Requirements */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Condiciones Especiales
            </label>
            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasLiquorLicense}
                  onChange={(e) => setFilters({ ...filters, hasLiquorLicense: e.target.checked })}
                  className="rounded text-[#F6710C] focus:ring-[#F6710C]"
                />
                <span>Permiso de alcoholes vigente</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasTradeMark}
                  onChange={(e) => setFilters({ ...filters, hasTradeMark: e.target.checked })}
                  className="rounded text-[#F6710C] focus:ring-[#F6710C]"
                />
                <span>Marca registrada en IMPI</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.includesLegalEntity}
                  onChange={(e) => setFilters({ ...filters, includesLegalEntity: e.target.checked })}
                  className="rounded text-[#F6710C] focus:ring-[#F6710C]"
                />
                <span>Sociedad Anónima / RFC limpia</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                  className="rounded text-[#F6710C] focus:ring-[#F6710C]"
                />
                <span className="font-semibold text-gray-800">Solo Verificados</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.opportunityOnly}
                  onChange={(e) => setFilters({ ...filters, opportunityOnly: e.target.checked })}
                  className="rounded text-[#F6710C] focus:ring-[#F6710C]"
                />
                <span className="font-semibold text-[#F6710C]">Oportunidad Urgente</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="lg:col-span-9">
          {/* Active Filters Tag Pills (Interactive filter remove) */}
          {activeFilterCount > 0 && (
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">Filtros activos:</span>
              {filters.keyword && (
                <button
                  onClick={() => setFilters({ ...filters, keyword: '' })}
                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-md"
                >
                  "{filters.keyword}" <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
              {filters.category && (
                <button
                  onClick={() => setFilters({ ...filters, category: '' })}
                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-md"
                >
                  Giro: {filters.category} <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
              {filters.state && (
                <button
                  onClick={() => setFilters({ ...filters, state: '' })}
                  className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs px-2.5 py-1 rounded-md"
                >
                  Estado: {filters.state} <X className="w-3 h-3 text-gray-500" />
                </button>
              )}
              {filters.verifiedOnly && (
                <button
                  onClick={() => setFilters({ ...filters, verifiedOnly: false })}
                  className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded-md"
                >
                  Verificado <X className="w-3 h-3 text-emerald-600" />
                </button>
              )}
              {filters.opportunityOnly && (
                <button
                  onClick={() => setFilters({ ...filters, opportunityOnly: false })}
                  className="inline-flex items-center gap-1 bg-orange-50 text-orange-800 border border-orange-200 text-xs px-2.5 py-1 rounded-md"
                >
                  Urgente <X className="w-3 h-3 text-orange-600" />
                </button>
              )}
              <button
                onClick={resetFilters}
                className="text-xs text-[#F6710C] hover:underline font-semibold ml-1"
              >
                Borrar todos
              </button>
            </div>
          )}

          {/* View Modes Rendering */}
          {viewMode === 'map' ? (
            <div className="mb-8">
              <InteractiveMap listings={filteredListings} onSelectListing={onSelectListing} />
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-gray-800">
                No encontramos negocios con los criterios seleccionados
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                Prueba relajando algunos filtros como el precio máximo o seleccionando toda la República Mexicana.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#0F1014] text-white text-xs font-semibold rounded-lg hover:bg-[#F6710C] transition-colors"
              >
                Restablecer todos los filtros
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredListings.map((item) => (
                <TraspasoCard
                  key={item.id}
                  listing={item}
                  onSelect={onSelectListing}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(item.id)}
                  layoutMode="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredListings.map((item) => (
                <TraspasoCard
                  key={item.id}
                  listing={item}
                  onSelect={onSelectListing}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.includes(item.id)}
                  layoutMode="list"
                />
              ))}
            </div>
          )}
        </main>

      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="font-bold text-base text-[#0F1014] flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#F6710C]" />
                  <span>Filtros de Búsqueda</span>
                </div>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter fields same as desktop */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Palabra Clave</label>
                <input
                  type="text"
                  placeholder="Ej. Cafetería, farmacia..."
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Giro</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5"
                >
                  <option value="">Todos los Giros</option>
                  <option value="restaurantes">Restaurantes</option>
                  <option value="cafeterias">Cafeterías</option>
                  <option value="talleres">Automotriz</option>
                  <option value="farmacias">Farmacias</option>
                  <option value="abarrotes">Abarrotes</option>
                  <option value="franquicias">Franquicias</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Estado</label>
                <select
                  value={filters.state}
                  onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5"
                >
                  <option value="">Toda la República</option>
                  {MEXICAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Precio Máximo</label>
                <input
                  type="number"
                  placeholder="Hasta MXN"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : '' })}
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 font-mono"
                />
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.hasLiquorLicense}
                    onChange={(e) => setFilters({ ...filters, hasLiquorLicense: e.target.checked })}
                    className="accent-[#F6710C]"
                  />
                  <span>Permiso de alcoholes vigente</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => setFilters({ ...filters, verifiedOnly: e.target.checked })}
                    className="accent-[#F6710C]"
                  />
                  <span>Solo Verificados</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-2.5 text-xs font-semibold text-gray-700 bg-gray-100 rounded-xl"
              >
                Limpiar
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-white bg-[#F6710C] rounded-xl"
              >
                Aplicar ({filteredListings.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
