import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../classes/country';
import { State } from '../classes/state';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private countryURL = 'http://localhost:8080/api/countries';
  private stateyURL = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{

    return this.httpClient.get<GetCountriesResponse>(this.countryURL).pipe(
      map(response => response._embedded.countries)
    );
  }

   

  getStates(countryCode: string) : Observable<State[]>{

    const searchStateURL = `${this.countryURL}/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetStatesReponse>(searchStateURL).pipe(
      map(response => response._embedded.states)
    );

  }



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

interface GetCountriesResponse {
  _embedded:{
    countries:Country[];
  }
}

interface GetStatesReponse {
  _embedded:{
    states:State[];
  }
}
