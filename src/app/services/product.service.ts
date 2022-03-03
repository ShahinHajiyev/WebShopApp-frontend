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

  
  getProductsList(productCategoryId : number) : Observable<Product[]> {

    //we need URL  for category id

    const pageURL = `${this.URL}/search/findByCategoryId?id=${productCategoryId}`;

    return this.httpClient
                          .get<Response>(pageURL)       //class url changed to pageURL
                          .pipe(map(response => response._embedded.products));
  }
}

interface Response{
     _embedded : { products : Product[];
    }

}
