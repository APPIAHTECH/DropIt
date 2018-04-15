import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input('options') options: Array<string> = [];
  @Input('values') values: Array<number> = [];

  constructor() { }

  ngOnInit() { }

  // public doughnutChartLabels:string[] = this.options;
  // public doughnutChartData:number[] = this.values;
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
