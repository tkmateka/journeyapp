import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  get(endpoint:string) {
    return this.http.get(`${environment.serverUrl}/${endpoint}`);
  }

  post(endpoint:string, payload:any, options:any={}) {
    return this.http.post(`${environment.serverUrl}/${endpoint}`, payload, options);
  }

  delete(endpoint:string, options:any={}) {
    return this.http.delete(`${environment.serverUrl}/${endpoint}`);
  }
}
