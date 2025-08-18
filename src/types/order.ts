import { CartItem } from "./CartItem";
import { Address } from "./Address";

export interface OrderListResponse {
  id: string;
  orderId: string;
  receiverName: string;
  totalItem: number;
  orderAmount: number;
  status: string;
  createdAt: string;
}

export enum OrderStatus {
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  REFUNDED = "REFUNDED"
}

export enum PaymentMode {
  UPI = "UPI",
  CARD = "CARD",
  WALLET = "WALLET",
  COD = "COD",
  PARTIAL_COD = "PARTIAL_COD"
}

export enum PaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIAL_PAID = "PARTIAL_PAID"
}

export interface Order {
  id: string;
  userId: string;
  orderId: string;
  orderStatus: OrderStatus;
  cartItems: CartItem[];

  // Coupon Attributes
  couponDiscountAmount: number;
  couponCode: string;

  // Amount Attributes
  totalItemPrice: number;
  totalItemPriceWithDiscount: number;
  deliveryCharge: number;
  handlingCharge: number;
  smallCartCharge: number;
  orderAmount: number;

  // Payment Attributes
  paymentMode: PaymentMode; 
  amountPaidOnline: number;
  codAmountPending: number;
  paymentStatus: PaymentStatus; 
  paymentId: string;

  // Delivery attributes
  address: Address;
  deliveredAt: string | null; // ISO date-time string
  refundInitiated: boolean; // Default: false
  deliveryNotes: string;

  createdAt: string; // ISO date-time string
  updatedAt: string | null; // ISO date-time string
}
