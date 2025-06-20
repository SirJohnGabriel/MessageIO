import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  http = inject(HttpClient);
  forecast: any[] = [];
  protected title = 'MessageIO';

  ngOnInit() {
    this.getWeatherForecast();
  }

  private getWeatherForecast() {
    this.http.get<any[]>('https://localhost:7218/api/weatherforecast').subscribe({
      next: data => {
        console.log('Forecast loaded:', data);
        this.forecast = data;
      },
      error: err => {
        console.error('Error fetching weather:', err);
      }
    });
  }

}
