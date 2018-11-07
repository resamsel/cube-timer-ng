import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Score } from '../../../../models/score/score.model';

// const BACKGROUND_COLOR = '#0074D9';
// const PRIMARY_COLOR = 'white';
// const SECONDARY_COLOR = 'rgba(255,255,255,0.4)';

@Component({
  selector: 'app-scores-stats',
  templateUrl: './scores-stats.component.html',
  styleUrls: ['./scores-stats.component.scss']
})
export class ScoresStatsComponent implements OnInit {
  private _scores: Score[];
  private series: [number, number][];

  @Input()
  set scores(scores: Score[]) {
    this._scores = scores;
    this.series = ([] as Score[]).concat(scores).reverse().map((score: Score) => {
      return [score.timestamp, score.value] as [number, number];
    });
    console.log('ScoresStatsComponent', this._scores, this.series);
    this.chart.removeSeries(0);
    this.chart.addSeries({data: this.series}, true);
  }

  chart = new Chart({
    chart: {
      type: 'column',
      spacing: [4, 0, 20, 0]
    },
    title: {
      text: 'Scores'
    },
    legend: {
      enabled: false
    },
    xAxis: {
      className: 'color-0',
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      tickWidth: 0,
      lineWidth: 0
    },
    yAxis: {
      className: 'color-0',
      min: 0,
      labels: {
        x: 0,
        y: 16,
        align: 'left',
        formatter: function () {
          return `${this.value / 1000} s`;
        }
      },
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
        borderWidth: 0,
        pointWidth: 3
      }
    }
  });

  constructor() {
  }

  ngOnInit() {
  }
}
