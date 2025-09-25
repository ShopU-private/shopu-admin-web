export interface ProductListResponse {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
}

export interface ProductCreateRequest {
  name: string;
  brand?: string;
  manufacturerName: string;
  category: string;
  dosageForm: string;
  packSize: string;
  prescriptionRequired: boolean;
  description: string;
  composition?: CompositionItem[];
  ingredients: string;
  uses?: string;
  benefits?: string;
  howToUse?: string;
  sideEffects?: string;
  precautions?: string;
  safetyAdvice?: string;
  safetyInformation?: string;
  storageInfo?: string;
  disclaimer?: string;
  hsnCode?: string;
  manufacturerDetails?: string; // ISO date string
  price: number;
  discount: number;
  images: string[];
  stock: number;
} 

export interface CompositionItem{
  name: string;
  strength: string;
}

export enum Category {
  HOMEOPATHY = "HOMEOPATHY",
  ALLOPATHY = "ALLOPATHY",
  HEALTHCARE = "HEALTHCARE",
  OTC = "OTC",
  MEDICINE = "MEDICINE",
  SUPPLEMENT = "SUPPLEMENT",
  AYURVEDIC = "AYURVEDIC",
  SEXUAL_WELLNESS = "SEXUAL_WELLNESS",
  PERSONAL_CARE = "PERSONAL_CARE",
  BABY_CARE = "BABY_CARE",
  DEVICE = "DEVICE",
  GENERAL_HEALTH = "GENERAL_HEALTH"
}
export enum DosageForm {
  TABLET = "TABLET",
  CAPSULE = "CAPSULE",
  SYRUP = "SYRUP",
  INJECTION = "INJECTION",
  OINTMENT = "OINTMENT",
  CREAM = "CREAM",
  DROP = "DROPS",
  INHALER = "INHALER",
  POWDER = "POWDER",
  SPRAY = "SPRAY",
  LIQUID = "LIQUID",
  STANDARD = "STANDARD",
  OTHER = "OTHER",
  PESSARY = "PESSARY",
  SUSPENSION = "SUSPENSION",
  GEL = "GEL",
  KIT = "KIT",
}

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  manufacturerName: string;
  category: Category;
  dosageForm: DosageForm | null;

  // Quantity Attributes
  strength: string | null;
  packSize: string;
  prescriptionRequired: boolean;

  description: string | null;
  composition: CompositionItem[] | CompositionItem[];
  ingredients: string | null;

  uses: string | null;
  benefits: string | null;
  howToUse: string | null;
  sideEffects: string | null;
  precautions: string | null;
  safetyAdvice: string | null;
  safetyInformation: string | null;

  storageInfo: string | null;
  disclaimer: string | null;

  hsnCode: string | null;
  manufacturerDetails: string | null;
  countryOfOrigin: string | null;

  expiryDate: string | null; // ISO date string (LocalDate se map hoga)
  manufacturingDate: string | null;

  price: number;
  discount: number;
  averageRating: number | 0;
  numberOfReviews: number | 0;

  images: string[] | string[];
  stock: number | 0;
  createdAt: string; // LocalDateTime → string
  updatedAt: string | null;
}