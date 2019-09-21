import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: any;
  password: any;
  conpassword: any;
  regemail: any;

  constructor(public auth: AngularFireAuth, public enrutador: Router, 
    public alertController: AlertController) {
    this.regemail = /\S+@\S+\.\S+/;
  }

  ngOnInit() {
    console.log("registro")
  }


   registro() {
    if (this.regemail.test(this.email) && this.password != undefined && this.conpassword != undefined) {
      this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then( async info => {
        console.log("todo bien")
        console.log(info)

        const alert = await this.alertController.create({
          header: 'Correcto',
          subHeader: 'usuario Listo',
          message: "Usuario creado",
          buttons: ['Copas']
        })

        await alert.present();

      }).catch( async error => {
        console.log("error: " + error)

        const alert = await this.alertController.create({
          header: 'Error',
          subHeader: 'Error creando usuario',
          message: error,
          buttons: ['Gonorrea']
        });

        await alert.present();
      })
    }

  }

}
