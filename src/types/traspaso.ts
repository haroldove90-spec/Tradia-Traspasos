export type BusinessCategory =
  | 'restaurantes'
  | 'cafeterias'
  | 'talleres'
  | 'farmacias'
  | 'abarrotes'
  | 'franquicias'
  | 'belleza_spa'
  | 'retail'
  | 'servicios';

export interface LeaseTerms {
  yearsRemaining: number;
  isRenewable: boolean;
  guarantorRequired: string;
  securityDepositMonths: number;
}

export interface BusinessLicenses {
  hasLiquorLicense: boolean;
  hasTradeMark: boolean;
  includesLegalEntity: boolean; // S.A. o RFC
  sanitaryPermits: boolean;
}

export interface TraspasoListing {
  id: string; // e.g. "TRP-2041"
  title: string;
  slug: string;
  description: string;
  category: BusinessCategory;
  categoryLabel: string;
  price: number; // MXN
  monthlyRent: number; // MXN
  monthlySales: number; // MXN
  estimatedProfit: number; // MXN
  profitMargin: number; // %
  areaSqMeters: number; // m²
  employeesCount: number;
  businessAgeYears: number;
  roiMonths: number;
  location: {
    state: string;
    cityOrMunicipality: string;
    neighborhood: string;
    lat: number;
    lng: number;
    isConfidentialLocation?: boolean;
  };
  operationStatus: 'activa' | 'cerrado_equipado';
  includedAssets: string[];
  leaseTerms: LeaseTerms;
  licenses: BusinessLicenses;
  reasonForTransfer: string;
  images: string[];
  verified: boolean;
  featured: boolean;
  opportunityBadge: boolean;
  publishedAt: string;
  viewsCount: number;
  leadsCount: number;
  contactPhone: string;
  sellerName: string;
  sellerType: 'propietario' | 'broker';
}

export type UserRole = 'comprador' | 'vendedor' | 'broker' | 'admin';

export interface BuyerLeadMessage {
  id: string;
  listingId: string;
  listingTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  message: string;
  createdAt: string;
  status: 'nuevo' | 'contactado' | 'en_negociacion';
}

export interface FilterState {
  keyword: string;
  category: string;
  state: string;
  municipality: string;
  minPrice: number | '';
  maxPrice: number | '';
  maxRent: number | '';
  minSales: number | '';
  operationStatus: 'all' | 'activa' | 'cerrado_equipado';
  hasLiquorLicense: boolean;
  hasTradeMark: boolean;
  includesLegalEntity: boolean;
  verifiedOnly: boolean;
  opportunityOnly: boolean;
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'sales_desc' | 'recent';
}
