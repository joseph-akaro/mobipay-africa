import { PaymentProvider } from "../core/PaymentProvider";
import { httpClient } from "../utils/httpClient";

export interface MtnConfig {
  apiKey: string;
  subscriptionKey: string;
  baseUrl: string;
  callbackUrl?: string;
}

export class MtnProvider implements PaymentProvider {
  name = "mtn";

  constructor(private config: MtnConfig) {}

  async initiatePayment(data: any): Promise<any> {
    // TODO: Connect to MTN MoMo Collections API
    return httpClient.post(`${this.config.baseUrl}/collection/request`, {
      amount: data.amount,
      phone: data.phone,
      externalId: data.reference,
      currency: data.currency || "UGX",
      callbackUrl: this.config.callbackUrl,
    }, {
      headers: {
        "X-API-Key": this.config.apiKey,
        "Ocp-Apim-Subscription-Key": this.config.subscriptionKey,
      },
    });
  }

  async verifyPayment(reference: string): Promise<any> {
    return httpClient.get(`${this.config.baseUrl}/collection/status/${reference}`, {
      headers: {
        "X-API-Key": this.config.apiKey,
      },
    });
  }

  async checkBalance(): Promise<any> {
    return httpClient.get(`${this.config.baseUrl}/account/balance`, {
      headers: {
        "X-API-Key": this.config.apiKey,
      },
    });
  }
}