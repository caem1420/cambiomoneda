import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";

@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

  @ViewChild('canvaschart', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement>;

  chart: Chart;
  contexto: any;
  barChartData: any;

  constructor() {
    
  }

  
  ngOnInit() {
    this.contexto = this.canvas.nativeElement.getContext('2d');
    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Dataset 1',
        backgroundColor: "red",
        borderColor:"black",
        borderWidth: 1,
        data: [1,2,3,4,5,6,7,8]
      }]

    };


    this.contexto = this.canvas.nativeElement.getContext('2d'); 


    this.chart = new Chart(this.contexto, {

      type: 'bar',
      data: this.barChartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }

    })
  }
}

