import { Model, Document, Types } from "mongoose";

// defined the payment type
export interface TPayment extends Document {
  service: string;
  pricing: string;
  totalAmount: string;
  paidStatus: "PENDING" | "SUCCESS" | "REJECTED";
  transactionId: string;
  user: string;
}

export interface IOrder {
  address: string;
  country: string;
  currency: string;
  city: string;
  pricingId: string;
  serviceId: string;
  totalAmount: string;
  userId: string;
}

// payment model for using method and statics
export interface PaymentModel
  extends Model<TPayment, Record<string, unknown>> {}

export interface TPaymentFilters {
  searchTerm?: string;
  service?: string;
  title?: string;
}
