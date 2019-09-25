import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-olvidocontra',
  templateUrl: './olvidocontra.page.html',
  styleUrls: ['./olvidocontra.page.scss'],
})
export class OlvidocontraPage implements OnInit {

  email: any;

  constructor(public auth: AngularFireAuth, public alert: AlertController) { }

  ngOnInit() {
  }


  olvido() {
    this.auth.auth.sendPasswordResetEmail(this.email).then(async respond => {
      const alert = await this.alert.create({
        header: 'Contraseña',
        message: "El correo para restablecer la contraseña fue enviado a" + this.email,
        buttons: [{
          text: 'Okey',
          handler: () => {
            window.location.replace("/home")
          }
        }],
        mode: "ios"
      })
      

      await alert.present();
      

    }).catch( async error=>{
      const alert = await this.alert.create({
        header: 'Contraseña',
        message: error,
        buttons: [{
          text: 'Okey'
        }],
        mode: "ios"
      })
      

      await alert.present();
    })
  }

}
