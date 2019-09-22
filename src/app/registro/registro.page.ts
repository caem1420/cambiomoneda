import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


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
  database: AngularFireList<any>

  constructor(public db: AngularFireDatabase,public auth: AngularFireAuth, public enrutador: Router, 
    public alertController: AlertController) {
    this.regemail = /\S+@\S+\.\S+/;

    this.database = db.list("usuarios");
  }

  ngOnInit() {
    console.log("registro")
  }


   registro() {
    if (this.regemail.test(this.email) && this.password != undefined && this.conpassword != undefined) {
      this.auth.auth.createUserWithEmailAndPassword(this.email, this.password).then( async info => {
        console.log("todo bien")
        console.log(info)

        this.database.push({
          email: this.email,
          contra: this.password
        })
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

  registrokey(tecla){
    console.log(tecla.key)

    if(tecla.key === "Enter") this.registro();
  }

}
