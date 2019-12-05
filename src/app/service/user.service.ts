import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCountry():Observable<user[]>{
    const urlPeticion=`https://restcountries.eu/rest/v2/all`;
    return this.http.get<user[]>(urlPeticion);
  }
}
