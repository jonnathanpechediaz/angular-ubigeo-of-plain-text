import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = environment.apiURL;

  constructor(
    private http: HttpClient
  ) { }

  getDataFile() {
    return this.http.get('assets/files/ubigeo.txt', {responseType: 'text'});
  }
}
