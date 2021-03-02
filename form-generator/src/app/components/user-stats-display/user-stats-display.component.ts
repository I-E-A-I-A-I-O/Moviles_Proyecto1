import { Component, OnInit } from '@angular/core';
import { VariousRequestsService } from 'src/app/services/various-requests.service';
import * as HighCharts from 'highcharts';

@Component({
  selector: 'app-user-stats-display',
  templateUrl: './user-stats-display.component.html',
  styleUrls: ['./user-stats-display.component.scss'],
})
export class UserStatsDisplayComponent implements OnInit {

  constructor(private requests: VariousRequestsService) { }

  ngOnInit() {
    this.getStats();
  }

  ionViewWillEnter(){
      this.getStats();
  }

  async getStats(){
    let stats = await this.requests.getUserStats();
    let title = "Your stats";
    let categories = ['Forms visited', 'Answers submitted', 'Forms completed'];
    let user_stats = [{ name: stats.views_answers[0].username, type: undefined, data: [parseInt(stats.views_answers[0].visited_forms_count), parseInt(stats.views_answers[0].total_answers_sum), parseInt(stats.completed_forms[0].completed_forms_count)] }];
    this.renderChart(title, categories, user_stats);
  }

  renderChart(title: string, categories: string[], series: any[]) {
    HighCharts.chart('users_stats', {
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
}