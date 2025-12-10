export interface PaymentProvider {
    name: string;
  
    initiatePayment(data: any): Promise<any>;
    verifyPayment(reference: string): Promise<any>;
    checkBalance(): Promise<any>;
  }  