import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises(): any{
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
    .pipe(
        map ( (resp: any[])  => {
        return resp.map( (pais: any) => {
          return {
            nombre: pais.name,
            codigo: pais.alpha3Code
          };
        });
      })
    );
  }
}
