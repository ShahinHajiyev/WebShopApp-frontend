import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderHistory } from '../classes/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderURL = environment.webshopApiUrl + '/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(theEmail: string) : Observable<GetResponseOrderHistory>{


    const orderHistoryURL = `${this.orderURL}/search/findByCustomerEmail?email=${theEmail}`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryURL);
  }
}

interface GetResponseOrderHistory{
_embedded: {
  
    orders: OrderHistory[];

}
}
