import { Model, Document, Types } from "mongoose";

// defined the payment type
export interface TPayment extends Document {
  service: Types.ObjectId;
  totalAmount: string;
  paidStatus: "PENDING" | "SUCCESS" | "REJECTED";
  transactionId: string;
  user: Types.ObjectId;
}

// payment model for using method and statics
export interface PaymentModel
  extends Model<TPayment, Record<string, unknown>> {}

export interface TPaymentFilters {
  searchTerm?: string;
  service?: string;
  title?: string;
}
