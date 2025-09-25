export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;

  discountAmount: number;
  discountPercentage: number;
  minOrderAmount: number;

  requiredOrderCount: number;

  startDate: string;
  endDate: string;

  active: boolean;
  isUpTo: boolean;

  createdAt: string;
  updatedAt?: string;
}

export interface CouponCreateRequest {
  code: string;
  title: string;       
  description: string;

  discountAmount: number;
  discountPercentage: number;
  minOrderAmount: number;

  requiredOrderCount: number;

  startDate: Date | null;
  endDate: Date | null;

  isUpTo: boolean;
}