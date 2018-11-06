import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DataPoint } from 'highcharts';
import { Score } from '../../../../models/score/score.model';

const BACKGROUND_COLOR = '#0074D9';
const PRIMARY_COLOR = 'white';
const SECONDARY_COLOR = 'rgba(255,255,255,0.4)';

@Component({
  selector: 'app-scores-stats',
  templateUrl: './scores-stats.component.html',
  styleUrls: ['./scores-stats.component.css']
})
export class ScoresStatsComponent implements OnInit {
  private _scores: Score[];
  private series: DataPoint[];

  @Input()
  set scores(scores: Score[]) {
    this._scores = scores;
    this.series = ([] as Score[]).concat(scores).reverse().map((score: Score) => {
      return {
        name: `${score.timestamp}`,
        y: score.value
      };
    });
    console.log('ScoresStatsComponent', this._scores, this.series);
    this.chart.removeSeries(0);
    this.chart.addSeries({data: this.series}, true);
  }

  chart = new Chart({
    chart: {
      type: 'column',
      backgroundColor: BACKGROUND_COLOR,
      spacing: [4, 0, 20, 0]
    },
    title: {
      text: 'Scores',
      style: {
        color: PRIMARY_COLOR,
        fontWeight: '400',
        fontFamily: 'Roboto, "Helvetica Neue", sans-serif'
      }
    },
    legend: {
      enabled: false
    },
    xAxis: {
      categories: [],
      tickWidth: 0,
      labels: {
        enabled: false
      },
      lineWidth: 0
    },
    yAxis: {
      min: 0,
      labels: {
        x: 0,
        y: 16,
        align: 'left',
        style: {
          color: SECONDARY_COLOR
        },
        formatter: function() {
          return `${this.value / 1000} s`;
        }
      },
      gridLineColor: SECONDARY_COLOR,
      gridLineWidth: 1,
      title: {
        text: ''
      }
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.key + '</b><br/>' + (this.y / 1000) + 's';
      }
    },
    plotOptions: {
      column: {
        color: PRIMARY_COLOR,
        borderWidth: 0,
        pointWidth: 4
      }
    }
  });

  constructor() {
  }

  ngOnInit() {
  }
}
