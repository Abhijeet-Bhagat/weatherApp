import { Component } from '@angular/core';
import { WeatherAppService } from './weather-app.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherApp';
//------------------variable declaration----------------------//
  location: String = '';
  tableshow: boolean = true;
  daysarr: any[] =[];
  dayShow: String="";
  temp_c: any;
  weatherForm!: FormGroup;
  humidity: any;
  condition: any;
  UVIndex: any;
  daymax: any[]=[];
  daymin: any[]=[];
  loading: boolean = false

  constructor(private service: WeatherAppService, private fb: FormBuilder){

    this.weatherForm = this.fb.group(
      {
        location: ['London']
      }
    );
  }

  ngOnInit(): void {
    this.getWeather();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct', 'Nov','Dec'];
const today = new Date();

const date = today.getDate();
const month = today.getMonth();

 this.dayShow = date + " "+ months[month];

const nextDays = [today];

for (let i = 1; i < 7; i++) {
  nextDays.push(new Date(today.getTime() + (24 * 60 * 60 * 1000 * i))); // 24 hours in milliseconds * i days
}

console.log(nextDays);

for (let i = 0; i < nextDays.length; i++) {
  const day = nextDays[i].getDay();
  console.log(days[day]);
  this.daysarr.push(days[day]);
  console.log(this.daysarr);
}
  }

  //----------------find function--------------------//
  getWeather(){
    //api call
    this.tableshow = true
    this.location = this.weatherForm.get('location')?.value;
  
    var obj = {
      "name" : this.location
    }

    console.log('Printing Object ', obj);
    this.loading= true;
    this.service.getData(obj).subscribe((response) => {
      this.loading = false;
      console.log(response.location.name);

      this.temp_c = response.current.temp_c;
      this.humidity = response.current.humidity;
      this.condition = response.current.condition.text;
      this.UVIndex = response.current.uv;

      console.log(response.forecast.forecastday.length);
      console.log(response.forecast.forecastday[0].day.maxtemp_c)
      let j=0;
      for(let i=1; i< response.forecast.forecastday.length; i++){
      
        this.daymax[j] = response.forecast.forecastday[i].day.maxtemp_c;
        this.daymin[j]= response.forecast.forecastday[i].day.mintemp_c;
        j++;
        console.log(this.daymax)
      }
      
    
    });
  }

}

