import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService {
  apiUrl!: string;

  constructor(private http: HttpClient) { 

   this.apiUrl = "http://localhost:8080/weather";

    
  }

   getData(obj: any): Observable<any>{
    return this.http.post(this.apiUrl, obj);
  }

}
