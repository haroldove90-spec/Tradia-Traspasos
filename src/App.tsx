import React, { useState, useEffect } from 'react';
import { TraspasoListing, UserRole, BuyerLeadMessage } from './types/traspaso';
import { INITIAL_LISTINGS } from './data/mockTraspasos';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedSection } from './components/FeaturedSection';
import { RecentListingsSection } from './components/RecentListingsSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { DualCTASection } from './components/DualCTASection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CatalogView } from './components/CatalogView';
import { DashboardView } from './components/DashboardView';
import { ListingDetailModal } from './components/ListingDetailModal';
import { PublishWizardModal } from './components/PublishWizardModal';
import { ValuationCalculatorModal } from './components/ValuationCalculatorModal';
import { LegalAndGuidesModal } from './components/LegalAndGuidesModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'how_it_works' | 'dashboard' | 'legal'>('home');
  const [listings, setListings] = useState<TraspasoListing[]>(INITIAL_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchState, setSearchState] = useState<string>('');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('traspasa_favorites');
      return saved ? JSON.parse(saved) : ['TRP-1092', 'TRP-1088'];
    } catch {
      return ['TRP-1092', 'TRP-1088'];
    }
  });

  // Leads
  const [leads, setLeads] = useState<BuyerLeadMessage[]>([
    {
      id: 'lead-1',
      listingId: 'TRP-1092',
      listingTitle: 'Cafetería de Especialidad & Panadería Francesa en Roma Norte',
      buyerName: 'Carlos Mendoza',
      buyerEmail: 'carlos.mendoza@inversiones.mx',
      buyerPhone: '5541902233',
      message: 'Solicito información sobre auditoría de ventas en punto de venta y citas disponibles para inspección.',
      createdAt: '2026-11-09',
      status: 'nuevo',
    }
  ]);

  // Role (RBAC)
  const [userRole, setUserRole] = useState<UserRole>('comprador');

  // Modals
  const [selectedListing, setSelectedListing] = useState<TraspasoListing | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'faq' | 'guias' | 'privacidad' | 'terminos' | null>(null);

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('traspasa_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not persist favorites to localStorage', e);
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleHeroSearch = (params: { keyword: string; category: string; state: string }) => {
    setSearchKeyword(params.keyword);
    setSelectedCategory(params.category || 'all');
    setSearchState(params.state);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishSuccess = (newListing: TraspasoListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const handleSendLead = (leadData: {
    listingId: string;
    listingTitle: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    message: string;
  }) => {
    const newLead: BuyerLeadMessage = {
      id: `lead-${Date.now()}`,
      listingId: leadData.listingId,
      listingTitle: leadData.listingTitle,
      buyerName: leadData.buyerName,
      buyerEmail: leadData.buyerEmail,
      buyerPhone: leadData.buyerPhone,
      message: leadData.message,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'nuevo',
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  // Similar listings for modal
  const similarListings = selectedListing
    ? listings
        .filter(
          (l) =>
            l.id !== selectedListing.id &&
            (l.category === selectedListing.category || l.location.state === selectedListing.location.state)
        )
        .slice(0, 3)
    : [];

  return (
    <div className="min-h-screen bg-white text-[#0F1014] flex flex-col font-sans selection:bg-[#F6710C] selection:text-white">
      
      {/* Primary Header with #0F1014 and Logo */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'legal') {
            setLegalModalTab('faq');
          } else {
            setCurrentView(view as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenPublish={() => setIsPublishModalOpen(true)}
        onOpenValuation={() => setIsValuationModalOpen(true)}
        userRole={userRole}
        onRoleChange={setUserRole}
        favoritesCount={favorites.length}
      />

      {/* Main Body Routing */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onSearch={handleHeroSearch}
              onSelectCategory={handleCategorySelect}
              selectedCategory={selectedCategory}
              onOpenPublish={() => setIsPublishModalOpen(true)}
            />

            {/* Featured Listings Carousel / Grid */}
            <FeaturedSection
              listings={listings}
              onSelectListing={(l) => setSelectedListing(l)}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
              onViewAll={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Recent Listings Section */}
            <RecentListingsSection
              listings={listings}
              onSelectListing={(l) => setSelectedListing(l)}
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
              onViewAll={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Dual CTA Section ("Busco Negocio" vs "Quiero Traspasar") */}
            <DualCTASection
              onExploreCatalog={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPublish={() => setIsPublishModalOpen(true)}
            />

            {/* Testimonials & Verified Metrics */}
            <TestimonialsSection />
          </>
        )}

        {currentView === 'catalog' && (
          <CatalogView
            listings={listings}
            onSelectListing={(l) => setSelectedListing(l)}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            initialCategory={selectedCategory}
            initialKeyword={searchKeyword}
            initialState={searchState}
          />
        )}

        {currentView === 'how_it_works' && (
          <div className="py-6">
            <HowItWorksSection />
            <DualCTASection
              onExploreCatalog={() => {
                setCurrentView('catalog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenPublish={() => setIsPublishModalOpen(true)}
            />
          </div>
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            userRole={userRole}
            onRoleChange={setUserRole}
            listings={listings}
            favorites={favorites}
            leads={leads}
            onSelectListing={(l) => setSelectedListing(l)}
            onOpenPublish={() => setIsPublishModalOpen(true)}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Primary Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenLegal={(tab) => setLegalModalTab(tab)}
        onOpenValuation={() => setIsValuationModalOpen(true)}
        onSelectCategory={handleCategorySelect}
      />

      {/* Modal 1: Ficha Técnica de Detalle */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedListing.id)}
          similarListings={similarListings}
          onSelectSimilar={(sim) => setSelectedListing(sim)}
          onSendLead={handleSendLead}
        />
      )}

      {/* Modal 2: Asistente Wizard de Publicación */}
      {isPublishModalOpen && (
        <PublishWizardModal
          onClose={() => setIsPublishModalOpen(false)}
          onPublishSuccess={handlePublishSuccess}
        />
      )}

      {/* Modal 3: Calculadora de Valuación de Negocio */}
      {isValuationModalOpen && (
        <ValuationCalculatorModal
          onClose={() => setIsValuationModalOpen(false)}
          onOpenPublish={() => {
            setIsValuationModalOpen(false);
            setIsPublishModalOpen(true);
          }}
        />
      )}

      {/* Modal 4: Legal, FAQ y Guías */}
      {legalModalTab && (
        <LegalAndGuidesModal
          onClose={() => setLegalModalTab(null)}
          defaultTab={legalModalTab}
        />
      )}

    </div>
  );
}
