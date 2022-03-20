import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor{

  constructor(private oktaAuth: OktaAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    return from(this.handleAccess(request, next));
  }



  private async handleAccess(request: HttpRequest<any>, next:HttpHandler) : Promise<HttpEvent<any>>{

    const endpoint = environment.webshopApiUrl + '/orders';
    
    //access tokens for secured access
    const securedEndpoints = [endpoint];

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



