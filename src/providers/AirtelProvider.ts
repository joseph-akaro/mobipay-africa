import { PaymentProvider } from "../core/PaymentProvider";
import { httpClient } from "../utils/httpClient";

export interface AirtelConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

export class AirtelProvider implements PaymentProvider {
  name = "airtel";

  constructor(private config: AirtelConfig) {}

  private async getAccessToken() {
    // TODO: Replace with Airtel OAuth API
    return httpClient.post(`${this.config.baseUrl}/auth/token`, {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });
  }

  async initiatePayment(data: any): Promise<any> {
    const { data: tokenData } = await this.getAccessToken();

    return httpClient.post(
      `${this.config.baseUrl}/merchant/transaction`,
      {
        amount: data.amount,
        msisdn: data.phone,
        reference: data.reference,
      },
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
  }

  async verifyPayment(reference: string): Promise<any> {
    const { data: tokenData } = await this.getAccessToken();

    return httpClient.get(
      `${this.config.baseUrl}/merchant/transaction/${reference}`,
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
  }

  async checkBalance(): Promise<any> {
    const { data: tokenData } = await this.getAccessToken();

    return httpClient.get(`${this.config.baseUrl}/wallet/balance`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
  }
}