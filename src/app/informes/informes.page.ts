import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from "chart.js";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DatosService } from '../../app/datos.service'
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.page.html',
  styleUrls: ['./informes.page.scss'],
})
export class InformesPage implements OnInit {

  @ViewChild('canvaschart', { static: true })
  private canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvaschart2', { static: false })
  private canvas2: ElementRef<HTMLCanvasElement>;

  chart: Chart;
  chart2: Chart;
  contexto: any;
  contexto2: any;
  barChartData: any;
  barChartData2: any;
  database: Observable<any>;
  monedasorigen: Array<any> = [];
  datosmonedasorigen: Array<any> = [];
  databasaeusuarios: Observable<any>;
  numerousuarios: any;

  constructor(public alertController: AlertController, public db: AngularFireDatabase, public datos: DatosService, public storage: Storage) {
    this.numerousuarios = 0;
    this.storage.get("usuario").then(async valor => {
      if (valor != null) {
        this.database = db.list("registros", ref => ref.orderByChild("usuario").equalTo("anonimo")).valueChanges();
        this.databasaeusuarios = db.list("usuarios").valueChanges()
        this.datosmonedasorigen = [{ "monedas": this.datos.getmonedas(), "valores": [] }]

        console.log("graficando")

        this.database.subscribe(valor => {
          valor.forEach(dato => {
            this.monedasorigen.push(dato["origen"])
          })
          for (let i = 0; i < this.datos.getmonedas().length; i++) {
            //this.datosmonedasorigen[0]["valores"].push(Math.floor(Math.random() * 10))
            this.datosmonedasorigen[0]["valores"].push(0)
          }


          for (let i = 0; i < this.datosmonedasorigen[0]["monedas"].length; i++) {

            for (let j = 0; j < this.monedasorigen.length; j++) {
              if (this.monedasorigen[j] === this.datosmonedasorigen[0]["monedas"][i]) {
                this.datosmonedasorigen[0]["valores"][i]++;
                console.log("hola " + i)
              }
            }
          }


          this.contexto = this.canvas.nativeElement.getContext('2d');
        this.barChartData = {
          labels: this.datosmonedasorigen[0]["monedas"],
          datasets: [{
            label: 'Anonimo',
            backgroundColor: "red",
            borderColor: "white",
            borderWidth: 1,
            data: this.datosmonedasorigen[0]["valores"]
          }]

        };
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
              text: 'Uso de monedas de origen'
            }
          }

        })
        })




        this.databasaeusuarios.subscribe(valor => {
          valor.forEach(p => {
            this.numerousuarios++;
          })

          this.contexto2 = this.canvas2.nativeElement.getContext('2d');
          this.barChartData2 = {
            labels: ["1", "2", "3","4"],
            datasets: [{
              borderColor: "red",
              backgroundColor: "white",
              label: 'Anonimo',
              data: [0,2,3, this.numerousuarios]
            }]

          };

          console.log(this.barChartData2)
          this.chart2 = new Chart(this.contexto2, {
            type: 'line',
            data: this.barChartData2,
            options: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 80,
                  fontColor: 'black'
                }
              }
            }
          })
          console.log("numero de usuarios ", this.numerousuarios)
        })



      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: "Zona solo para Administradores",
          buttons: [{
            text: 'Okey',
            handler: () => {
              window.location.replace("/home")
            }
          }],
          mode: "ios"
        });

        await alert.present();
      }
    });

  }



  ngOnInit() {
    //console.log(this.datosmonedasorigen);

    this.storage.get("usuario").then(async valor => {
      if (valor != null) {
        




      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: "Zona solo para Administradores",
          buttons: [{
            text: 'Okey',
            handler: () => {
              window.location.replace("/home")
            }
          }],
          mode: "ios"
        });

        await alert.present();
      }
    })

  }
}

