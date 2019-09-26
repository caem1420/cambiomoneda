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
  canvas: ElementRef<HTMLCanvasElement>;

  chart: Chart;
  contexto: any;
  barChartData: any;
  database: Observable<any>;
  monedasorigen: Array<any> = [];
  datosmonedasorigen: Array<any> = [];

  constructor(public alertController: AlertController, public db: AngularFireDatabase, public datos: DatosService, public storage: Storage) {
    this.storage.get("usuario").then(async valor => {
      if (valor != null) {
        this.database = db.list("registros", ref => ref.orderByChild("usuario").equalTo("anonimo")).valueChanges();
        this.datosmonedasorigen = [{ "monedas": this.datos.getmonedas(), "valores": [] }]


        this.database.subscribe(valor => {
          valor.forEach(dato => {
            this.monedasorigen.push(dato["origen"])
          })
          for (let i = 0; i < this.datos.getmonedas().length; i++) {
            //this.datosmonedasorigen[0]["valores"].push(Math.floor(Math.random() * 10))
            this.datosmonedasorigen[0]["valores"].push(0)
          }

          console.log(this.datosmonedasorigen);
          console.log(this.monedasorigen.length);
          console.log(this.monedasorigen)

          for (let i = 0; i < this.datosmonedasorigen[0]["monedas"].length; i++) {

            for (let j = 0; j < this.monedasorigen.length; j++) {
              console.log(this.monedasorigen + ":  :" + this.datosmonedasorigen[0]["monedas"][i]);
              if (this.monedasorigen[j] === this.datosmonedasorigen[0]["monedas"][i]) {
                this.datosmonedasorigen[0]["valores"][i] ++;
                console.log("hola " + i)
              }
            }
          }
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
        this.contexto = this.canvas.nativeElement.getContext('2d');
        this.barChartData = {
          labels: this.datosmonedasorigen[0]["monedas"],
          datasets: [{
            label: 'Anonimo',
            backgroundColor: "red",
            borderColor: "black",
            borderWidth: 1,
            data: this.datosmonedasorigen[0]["valores"]
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

