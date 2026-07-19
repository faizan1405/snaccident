import type { SIZES } from "@/lib/constants";

/** A single tee size, XS–XXL. */
export type Size = (typeof SIZES)[number];

export type MediaType = "image" | "video" | "model";

export interface ProductMedia {
  url: string;
  alt?: string;
  type?: MediaType;
}

/** Mirrors the Mongoose Product schema (defined in Phase 3). */
export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  sizes: Size[];
  stock: number;
  media: ProductMedia[];
}

export type PaymentStatus = "created" | "paid" | "failed";

export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

/** Mirrors the Mongoose Order schema (defined in Phase 3). */
export interface Order {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  size: Size;
  quantity: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  razorpayPaymentId?: string;
  shippingAddress: ShippingAddress;
  createdAt: string;
}

/** Client-side cart line item (Zustand store lands in Phase 3). */
export interface CartItem {
  size: Size;
  quantity: number;
}
