import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../classes/product';
import { ProductCategory } from '../classes/product-category';

@Injectable({
  providedIn: 'root'
})


export class ProductService {


  private URL  = environment.webshopApiUrl + '/products';

  private categoryURL = environment.webshopApiUrl + '/category';

  constructor(private httpClient : HttpClient) { }

  
  searchProductsPaginate(thePage : number, 
    thePageSize:number,
    theKeyword:string ) : Observable<ProductResponse> {

//we need URL  for keyword, page and sizee
 
const searchingURL = `${this.URL}/search/findByProductNameContaining?name=${theKeyword}`;
                + `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<ProductResponse>(searchingURL) ;
}

  

getProductsListPaginate(thePage : number, 
  thePageSize:number,
  theCategoryId:number ) : Observable<ProductResponse> {

//we need URL  for category id, page and size

const searchingURL = `${this.URL}/search/findByCategoryId?id=${theCategoryId}`
              + `&page=${thePage}&size=${thePageSize}`;

              console.log(`GETTING PRODUCTS   ${searchingURL}`);

return this.httpClient.get<ProductResponse>(searchingURL) ;
}


  getProduct(theProductId: number): Observable<Product> {
    
    //we need a url for product id

    const productURL = `${this.URL}/${theProductId}`;

    return this.httpClient.get<Product>(productURL);

  }

  
  getCategories (): Observable<ProductCategory[]> {
    return this.httpClient
    .get<ProductCategoryResponse>(this.categoryURL)       
    .pipe(map(response => response._embedded.productCategory));
}

}

interface ProductResponse{
     _embedded : { products : Product[];
    },

    page:{
      size:number,
      totalElements:number,
      totalPages:number,
      number:number
    }
}


interface ProductCategoryResponse{
  _embedded : { productCategory : ProductCategory[];
 }
}










/*

  private getProducts(pageURL: string ): Observable<Product[]> {
    return this.httpClient
      .get<ProductResponse>(this.URL)
      .pipe(map(response => response._embedded.products));
  }


getProductsList(productCategoryId : number) : Observable<Product[]> {

  //we need URL  for category id

  const searchingURL = `${this.URL}/search/findByCategoryId?id=${productCategoryId}`;

  return this.getProducts(searchingURL);
}

searchProducts(keyword: string) : Observable<Product[]>{
    
  //we need URL  for category id
     const searchingURL = `${this.URL}/search/findByProductNameContaining?name=${keyword}`;
 
     return this.getProducts(searchingURL);
   }
   */
