import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { Product } from '../classes/product';
import { ProductCategory } from '../classes/product-category';

@Injectable({
  providedIn: 'root'
})



export class ProductService {
 

  private URL  = 'http://localhost:8080/api/products';

  private categoryURL = 'http://localhost:8080/api/category';

  constructor(private httpClient : HttpClient) { }

  


  searchProducts(keyword: string) : Observable<Product[]>{
    
 //we need URL  for category id
    const searchingURL = `${this.URL}/search/findByProductNameContaining?name=${keyword}`;

    return this.getProducts(searchingURL);
  }



  private getProducts(pageURL: string): Observable<Product[]> {
    return this.httpClient
      .get<ProductResponse>(pageURL)
      .pipe(map(response => response._embedded.products));
  }

  

  getProductsList(productCategoryId : number) : Observable<Product[]> {

    //we need URL  for category id

    const searchingURL = `${this.URL}/search/findByCategoryId?id=${productCategoryId}`;

    return this.getProducts(searchingURL);
  }



  getCategories (): Observable<ProductCategory[]> {
    return this.httpClient
    .get<ProductCategoryResponse>(this.categoryURL)       
    .pipe(map(response => response._embedded.productCategory));
}

}

interface ProductResponse{
     _embedded : { products : Product[];
    }
}


interface ProductCategoryResponse{
  _embedded : { productCategory : ProductCategory[];
 }

}