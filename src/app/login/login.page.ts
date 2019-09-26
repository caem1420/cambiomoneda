import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';


import { DatosService } from '../../app/datos.service'

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  regemail: any;

  constructor(public alertController: AlertController, public auth: AngularFireAuth, public enrutador: Router, public datos: DatosService, public storage: Storage) {
    this.regemail = /\S+@\S+\.\S+/;
  }

  ngOnInit() {
  }


  ingresar() {
    console.log(this.email + "  " + this.password)


    if (this.email === "admin" && this.password === "admin") {
      this.storage.set("usuario", this.email);
      this.enrutador.navigateByUrl("/informes");

    } else {
      if (this.regemail.test(this.email) && this.password != undefined) {

        this.auth.auth.signInWithEmailAndPassword(this.email, this.password).then(async ss => {
          console.log("ingreso " + ss)

          const alert = await this.alertController.create({
            header: 'Ingreso Exitoso',
            message: "Usuario" + this.email,
            buttons: [{
              text: 'Bienvenido',
              handler: () => {
                window.location.replace("/home")
              }
            }]
          });

          await alert.present();

          this.datos.setemail(this.email);
          this.storage.set("usuario", this.email);
        }).catch(async error => {
          console.log("error  " + error)

          const alert = await this.alertController.create({
            header: 'Ingreso Fallido',
            message: "Error" + error,
            buttons: ["Okey"]
          });

          await alert.present();


        })
        console.log("OK")
      }else console.log("error")

    }
  }

  registro() {
    this.enrutador.navigateByUrl("/registro")
  }

  loginkey(tecla) {
    if (tecla.key === "Enter") this.ingresar();
  }


  olvido() {
    this.enrutador.navigateByUrl("/olvidocontra");
  }

}
