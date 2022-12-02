import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient} from '@angular/common/http'
import { MenuController } from '@ionic/angular';


const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.scss'],
})



export class ClimaComponent implements OnInit {
  
  weatherTemp: any
  todayDate = new Date()
  cityName = ""
  weatherIcon: any
  weatherDetails: any


  constructor(public httpClient:HttpClient,
              public menucontroler: MenuController) {
    this.loadData()
  }

  loadData() { 
    this.httpClient.get(`${API_URL}/weather?q=${"santiago"}&appid=${API_KEY}`).subscribe(results => {
       console.log(results);
       this.weatherTemp = results['main']
       this.cityName = results['name']
       console.log(this.weatherTemp);
       this.weatherDetails = results['weather'][0]
       console.log(this.weatherDetails);
       this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png` 
       
       
    })
  }
  ngOnInit() {}

  openMenu() {
    console.log('open menu');
    this.menucontroler.toggle('principal');
  }

}
