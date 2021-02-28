import { Component } from '@angular/core';
import * as HighCharts from 'highcharts'

@Component({
  selector: 'app-form-stats',
  templateUrl: './form-stats.page.html',
  styleUrls: ['./form-stats.page.scss'],
})
export class FormStatsPage{

  private test: number = 0;

  constructor() { }

  ionViewDidEnter() {
    this.plotSimpleBarChart();
  }

  plotSimpleBarChart() {
    HighCharts.chart('chartDiv', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [
        {
          name: 'Jane',
          type: undefined,
          data: [this.test, 0.1, 0.4]
        },
        {
          name: 'John',
          type: undefined,
          data: [0.5, 0.7, 0.3]
        }]
    });
  }

  plusOne(){
    this.test += 1;
    this.plotSimpleBarChart();
  }

}
