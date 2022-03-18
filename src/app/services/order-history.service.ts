import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../classes/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderURL = 'http://localhost:8080/api/orders';

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
