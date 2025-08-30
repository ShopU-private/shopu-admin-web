export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  imageUrl: string;
  productName: string;
  price: number;
  discountedPrice: number;
  buyQuantity: number;
  createdAt: string; // ISO date-time string
  updatedAt: string | null; // ISO date-time string
}
