import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  getCreditCardMonth(startMonth: number) : Observable<number[]>{

    let data: number[] = [];

    //month dropdown list
    //starting from the current one

    for(let month = startMonth; month <= 12; month++) {
   data.push(month);
    }
     
    //we wrap observable array via of
    return of(data);
    
  }

  getCreditCardYear(): Observable<number[]>{

    let data: number[] = [];

    //array for year downlist;

   const startYear: number = new Date().getFullYear();

   const endYear: number = startYear + 10;
   

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
