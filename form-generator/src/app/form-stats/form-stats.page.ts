import { Component } from '@angular/core';
import * as HighCharts from 'highcharts';
import { VariousRequestsService } from '../services/various-requests.service';

@Component({
  selector: 'app-form-stats',
  templateUrl: './form-stats.page.html',
  styleUrls: ['./form-stats.page.scss'],
})
export class FormStatsPage{

  constructor(private requests: VariousRequestsService) { }

  ionViewWillEnter() {
    this.formStats();
  }

  async formStats(){
    let results = await this.requests.getGlobalFormStats();
    this.arrangeFormData(results);
  }

  async usersStats(){
    let results = await this.requests.getGlobalUserStats();
    this.arrangeUserData(results);
  }

  renderChart(title: string, categories: string[], series: any[]) {
    HighCharts.chart('chartDiv', {
      chart: {
        type: 'bar'
      },
      title: {
        text: title
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'Form data'
        }
      },
      series: series
    });
  }

  arrangeFormData(stats: any){
    let series = [];
    let title = 'Global form usage';
    let categories = ['Questions', 'Views', 'Total answers', 'Average answers per user'];
    stats.questions.forEach(element => {
      series.push({ name: element.form_name, type: undefined, data: [parseInt(element.count)], id: element.form_id });
    })
    stats.viewsNanswers.forEach(element => {
      for (let i = 0; i < series.length; i++){
        if (element.form_id == series[i].id){
          series[i].data.push(parseInt(element.count), parseInt(element.sum));
          break;
        }
      }
    });
    stats.prom.forEach(element => {
      for (let i = 0; i < series.length; i++){
        if (element.form_id == series[i].id){
          series[i].data.push(element.prom);
          break;
        }
      }
    });
    this.renderChart(title, categories, series);
  }

  arrangeUserData(stats: any){
    let series = [];
    let title = 'Global users stats';
    let categories = ['Forms visited', 'Answers submitted', 'Forms completed'];
    stats.views_answers.forEach(element => {
      series.push({ id: element.user_id, name: element.username, type: undefined, data: [parseInt(element.visited_forms_count), parseInt(element.total_answers_sum)] });
    })
    stats.completed_forms.forEach(element => {
      for (let i = 0; i < series.length; i++){
        if (series[i].id == element.user_id){
          series[i].data.push(parseInt(element.completed_forms_count));
          break;
        }
      }
    })
    this.renderChart(title, categories, series);
  }

  segmentChanged(event){
    let value: string = event.target.value;
    if (value == "users"){
      this.usersStats();
    }
    else{
      this.formStats();
    }
  }
}
