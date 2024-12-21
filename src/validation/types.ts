export interface BookingData {
  check_in: string;
  check_out: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  priceTotal: number;
  paymentDetails: {
    paymentMethod: PaymentMethod;
    paymentStatus?: paymentStatus;
    pidx?: string;
  };
}

export interface BookingDetails {
  productId: string;
}

export enum PaymentMethod {
  Cod = "cod",
  Khalti = "khalti",
}

export enum paymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

export interface KhaltiResponse {
  pidx: string;
  payment_url: string;
  expires_at: Date | string;
  expires_in: Date | string;
  user_fee: number;
}
export interface TransactionVerification {
  pidx: string;
  total_amount: number;
  status: TransactionStatus;
  transaction_id: string;
  fee: number;
  refunded: boolean;
}

export enum TransactionStatus {
  Completed = "Completed",
  Refunded = "Refunded",
  Pending = "Pending",
  Initiated = "Initiated",
}

export enum bookingStatus {
  Pending = "pending",
  Canceled = "cancelled",

  Confirmed = "confirmed",
}
