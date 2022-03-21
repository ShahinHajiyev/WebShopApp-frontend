import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentInfo } from '../classes/payment-info';
import { Purchase } from '../classes/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {



  private purchaseURL = environment.webshopApiUrl + '/checkout/purchase';

  private paymentIntentURL = environment.webshopApiUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase) : Observable<any>{

    return this.httpClient.post<Purchase>(this.purchaseURL, purchase);
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{

    return this.httpClient.post<PaymentInfo>(this.paymentIntentURL, paymentInfo);

  }


}
