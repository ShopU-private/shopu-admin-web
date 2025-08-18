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
  DROPS = "DROPS",
  INHALER = "INHALER",
  POWDER = "POWDER",
  SPRAY = "SPRAY",
  LIQUID = "LIQUID",
  STANDARD = "STANDARD",
  OTHER = "OTHER"
}

export interface Product {
  id: string;
  name: string; //->
  brand: string; //->
  manufacturerName: string; //->
  category: string; //->
  dosageForm: DosageForm; //->
  strength?: string; //->>
  packSize: string; //->
  prescriptionRequired: boolean; //->>
  description: string; //->
  composition?: CompositionItem[]; //->>
  ingredients: string; //->
  uses?: string; //->
  benefits?: string; //->
  howToUse?: string; //->
  sideEffects?: string; //->>
  precautions?: string; //->>
  safetyAdvice?: string; //->
  safetyInformation?: string; //->
  storageInfo?: string; //->
  disclaimer?: string; //->
  hsnCode?: string; //->
  //manufacturerDetails?: string;
  //countryOfOrigin?: string;
  //expiryDate?: string; // ISO date string
  manufacturingDate?: string; // ISO date string
  price: number;
  discount?: number;
  //averageRating?: number;
  //numberOfReviews?: number;

  images: string[]; //->
  stock?: number; //->
  createdAt?: string; // ISO date-time string
  updatedAt?: string; // ISO date-time string
}