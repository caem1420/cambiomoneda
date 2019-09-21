import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

import {DatosService} from '../../app/datos.service'
import { Storage } from '@ionic/storage';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuariobool: boolean;
  email: any;
  origen: any;
  destino: any;
  valor: any;
  resultado: any;
  monedas: any;
  origenbool: boolean;
  destinobool: boolean;
  valorbool: boolean;

  constructor(public storage: Storage,public http: HttpClient, public alertController: AlertController, public enrutador:Router, public datos: DatosService) {
    this.origenbool = false;
    this.destinobool = false;
    this.valorbool = false;

    if(this.storage.get("usuario") != undefined){
      
      this.storage.get("usuario").then(valor=>{
        console.log(valor);
        this.email = valor;
      })
    }else{
      this.usuariobool = true;

    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.http.get('http://104.42.169.237:3000/?monedas=1').subscribe(response => {
      this.monedas = response;
      console.log(response);
    });

    

    
  }

  hola(tipo) {
    switch (tipo) {
      case 'origen':
        this.origenbool = true;
        break;
      case 'destino':
        this.destinobool = true;
        break;
      case 'valor':
        this.valorbool = true;
    }
  }


  async enviar() {

    if (this.origen !== undefined && this.destino !== undefined && this.valor !== undefined || this.valor !== null) {
      this.http.get('http://104.42.169.237:3000/?origen=' + this.origen + '&destino=' + this.destino + '&valor=' + this.valor)
        .subscribe(response => {
          this.resultado = response['RESULTADO'];
          console.log(this.resultado);
        });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        subHeader: 'Faltan argumentos',
        message: 'No ingreso todo los campos necesarios debe llenar los campos identificados con *.',
        buttons: ['Copas'],
        mode: 'ios'
      });

      await alert.present();
    }
  }


  ingreso(){
    this.enrutador.navigateByUrl("/login")
  }


}



//haga un analisis de requerimientos de un inicio de sesion 
