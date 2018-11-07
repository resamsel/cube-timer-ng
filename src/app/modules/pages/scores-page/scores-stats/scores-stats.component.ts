import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Score } from '../../../../models/score/score.model';

// const BACKGROUND_COLOR = '#0074D9';
// const PRIMARY_COLOR = 'white';
// const SECONDARY_COLOR = 'rgba(255,255,255,0.4)';

function generateSeries(scores: Score[]): [number, number][] {
  if (scores.length === 0) {
    return [];
  }

  const series: { [key: number]: number } = {};
  const nBins = 30;
  const firstTimestamp = scores[0].timestamp;
  const lastTimestamp = scores[scores.length - 1].timestamp;
  const binWidth = (lastTimestamp - firstTimestamp) / nBins;

  scores.forEach((score: Score) => {
    const index = score.timestamp - score.timestamp % binWidth;

    if (series[index] === undefined) {
      series[index] = 0;
    }

    series[index] = series[index] + 1;
  });

  return Object.entries(series)
    .map(([key, value]) => ([parseInt(key, 10), value as number]))
    .sort((a, b) => a[0] - b[0]) as [number, number][];
}

@Component({
  selector: 'app-scores-stats',
  templateUrl: './scores-stats.component.html',
  styleUrls: ['./scores-stats.component.scss']
})
export class ScoresStatsComponent implements OnInit {
  @Input()
  set scores(scores: Score[]) {
    this.chart.removeSeries(0);
    this.chart.addSeries({data: generateSeries(scores)}, true);
  }

  chart = new Chart({
    chart: {
      type: 'column',
      spacing: [4, 16, 4, 0]
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
        y: 12,
        align: 'left'
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
      borderWidth: 0,
      borderRadius: 4,
      shadow: false,
      formatter: function () {
        return '<b>' + this.y + '</b>';
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
