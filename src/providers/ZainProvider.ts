import { PaymentProvider } from "../core/PaymentProvider";
import { httpClient } from "../utils/httpClient";

export interface ZainConfig {
  apiKey: string;
  merchantId: string;
  baseUrl: string;
}

export class ZainProvider implements PaymentProvider {
  name = "zain";

  constructor(private config: ZainConfig) {}

  async initiatePayment(data: any): Promise<any> {
    // TODO: Replace with ZainCash actual API
    return httpClient.post(`${this.config.baseUrl}/payment/request`, {
      merchantId: this.config.merchantId,
      apiKey: this.config.apiKey,
      phone: data.phone,
      amount: data.amount,
      reference: data.reference,
    });
  }

  async verifyPayment(reference: string): Promise<any> {
    return httpClient.get(
      `${this.config.baseUrl}/payment/verify/${reference}`,
      { headers: { "X-API-Key": this.config.apiKey } }
    );
  }

  async checkBalance(): Promise<any> {
    return httpClient.get(`${this.config.baseUrl}/merchant/balance`, {
      headers: { "X-API-Key": this.config.apiKey },
    });
  }
}