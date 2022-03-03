import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL  = 'http://localhost:8080/api/products';

  constructor(private httpClient : HttpClient) { }

  
  getProductsList() : Observable<Product[]> {
    return this.httpClient
                          .get<Response>(this.URL)
                          .pipe(map(response => response._embedded.products));
  }
}

interface Response{
     _embedded : { products : Product[];
    }

}
