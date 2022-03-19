import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private oktaAuth: OktaAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    return from(this.handleAccess(request, next));
  }



  private async handleAccess(request: HttpRequest<any>, next:HttpHandler) : Promise<HttpEvent<any>>{
    
    //access tokens for secured access
    const securedEndpoints = ['http://localhost:8080/api/orders'];

    if(securedEndpoints.some(url => request.urlWithParams.includes(url))) {
      // if matches, get access token

      const accessToken = await this.oktaAuth.getAccessToken();  //call to an async method so we await

      //clone request and add header
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }

   //return next.handle(request).toPromise();
  return await lastValueFrom(next.handle(request));
  }
  
} 



