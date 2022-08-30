import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statistics.service';
import { NativeDateAdapter, MatDateFormats, DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

//Date custom formatter
export class AppDateAdapter extends NativeDateAdapter
{
  override format(date: Date, displayFormat: Object): string
  {
    if (displayFormat === 'input')
    {
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${month}-${year}`;
    }
    return date.toDateString();
  }
}

//Date field types
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
   dateInput: { month: 'short', year: 'numeric' },
 },
 display: {
   dateInput: 'input',
   monthYearLabel: { year: 'numeric', month: 'numeric' },
   dateA11yLabel: { year: 'numeric', month: 'long' },
   monthYearA11yLabel: { year: 'numeric', month: 'long' },
 }
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [
    //Use the custom date formats
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class StatisticsComponent
{
  //Table to filter and sort
  dataSource?: MatTableDataSource<Selection>;

  //Paginator of the table
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Sort of the table
  @ViewChild(MatSort) sort!: MatSort;

  //The base chart object to update the changes to the canvas
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  //The 'x' and 'y' of the chart, with the title and chart colors
  chartData?: ChartConfiguration['data'];

  //Line tension and display legend
  chartOptions: ChartConfiguration['options'] = { elements: { line: { tension: 0.3 } }, plugins: { legend: { display: true } } };
  
  //Chart type
  chartType: ChartType = 'doughnut';

  //Range date
  range = new FormGroup({ start: new FormControl(Validators.required), end: new FormControl(Validators.required) });

  //The stats mode to display: 1 = getInterviewsFrom
  statsMode = 0;

  //The latest stats mode before the cleaning of filters
  lastStatsMode = 0;

  //The selected process ID
  processId = 0;

  //The stats panel is opened
  panelOpenState = false;

  //Inject statistics service, to do calls to the backend
  constructor(private service: StatisticsService)
  {
    this.stats();
  }

  //Get the range of months into an String array
  getMonths(from: Date, to: Date): String[]
  {
    let m: String[]=[''];
    const fromYear = from.getFullYear();
    const toYear = to.getFullYear();
    for(let x = fromYear; x <= toYear; ++x)
      for(let y = (x == fromYear ? from.getMonth() + 1 : 1); y <= (x == toYear ? to.getMonth() + 1 : 12); ++y)
        switch(y)
        {
          case 1:
            m.push("Ene " + x.toString());
          break;
          case 2:
            m.push("Feb");
          break;
          case 3:
            m.push("Mar");
          break;
          case 4:
            m.push("Abr");
          break;
          case 5:
            m.push("May");
          break;
          case 6:
            m.push("Jun");
          break;
          case 7:
            m.push("Jul");
          break;
          case 8:
            m.push("Ago");
          break;
          case 9:
            m.push("Sep");
          break;
          case 10:
            m.push("Oct");
          break;
          case 11:
            m.push("Nov");
          break;
          case 12:
            m.push("Dic");
          break;
        }
    return m;
  }

  //Show stats
  stats()
  {
    switch(this.statsMode)
    {
      case 0:
        this.service.getDefault().subscribe(
          {
            next: (value)=>
            {
              this.chartType = 'doughnut';
              this.chartData = {datasets: [
                {
                  data: [value.totalCandidates?value.totalCandidates:0, value.totalActiveSelections?value.totalActiveSelections:20, value.totalAverageHiringTime?value.totalAverageHiringTime:10],
                  fill: 'origin'
                }],
                labels: ["Total Candidatos", "Procesos Activos", "Tiempo medio de proceso activo(días)"]
              };
              this.chart?.update();
            },
            error: ()=>
            {

            }
          }
        );
      break;
      case 1:
        const from = this.range.get('start')?.value as Date;
        const to = this.range.get('end')?.value as Date;
        if(from <= to)
        {
          this.service.getInterviewsInMonthlyRange(from.getFullYear(), from.getMonth() + 1, to.getFullYear(), to.getMonth() + 1).subscribe(
            {
              next: (value)=>
              {
                this.chartType = 'line';
                this.chartData = {datasets: [
                  {
                    data: value,
                    label: 'Entrevistas',
                    backgroundColor: 'rgba(0, 0, 210, 0.4)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                    fill: 'origin'
                  }],
                  labels: this.getMonths(from, to)
                };
                this.chart?.update();
              },
              error: ()=>
              {
                
              }
            }
          );
        }
      break;
      case 2:
        if(this.processId)
          this.service.getCandidatesPerMonth(this.processId).subscribe({
            next: (value)=>
              {
                this.chartType = 'line';
                this.chartData = {datasets: [
                  {
                    data: value.candidates?value.candidates:[],
                    label: 'Candidatos',
                    backgroundColor: 'rgba(0, 0, 210, 0.4)',
                    borderColor: 'rgba(255, 255, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                    fill: 'origin'
                  }],
                  labels: value.months?value.months:[]
                };
                this.chart?.update();
              },
              error: ()=>
              {
                
              }
          });
      break;
    }
  }
}