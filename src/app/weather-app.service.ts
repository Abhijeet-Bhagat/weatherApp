import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAppService {
  apiUrl!: string;

  constructor(private http: HttpClient) { 

   this.apiUrl = "https://weather-app-backend-production-71dd.up.railway.app/weather";

    
  }

   getData(obj: any): Observable<any>{
    return this.http.post(this.apiUrl, obj);
  }

}
