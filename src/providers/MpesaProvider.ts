import { PaymentProvider } from "../core/PaymentProvider";
import { httpClient } from "../utils/httpClient";

export interface MpesaConfig {
  apiKey: string;
  shortcode: string;
  baseUrl: string;
}

export class MpesaProvider implements PaymentProvider {
  name = "mpesa";

  constructor(private config: MpesaConfig) {}

  async initiatePayment(data: any): Promise<any> {
    // TODO: Replace with real Safaricom STK Push API
    return httpClient.post(`${this.config.baseUrl}/stkpush`, {
      amount: data.amount,
      phone: data.phone,
      reference: data.reference,
      shortcode: this.config.shortcode,
      apiKey: this.config.apiKey,
    });
  }

  async verifyPayment(reference: string): Promise<any> {
    // TODO: Replace with real M-Pesa verification API
    return httpClient.get(`${this.config.baseUrl}/transaction/${reference}`);
  }

  async checkBalance(): Promise<any> {
    // TODO: Replace with actual balance endpoint
    return httpClient.get(`${this.config.baseUrl}/account/balance`);
  }
}