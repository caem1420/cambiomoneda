import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import {Router} from '@angular/router';

import { Storage } from '@ionic/storage';


import {DatosService} from '../../app/datos.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: any;
  password: any;
  regemail: any;

  constructor(public auth : AngularFireAuth, public enrutador: Router, public datos: DatosService, public storage: Storage) {
    this.regemail = /\S+@\S+\.\S+/;
   }

  ngOnInit() {
  }


  ingresar(){
    console.log(this.email + "  " + this.password)
    if(this.regemail.test(this.email) && this.password != undefined){

      this.auth.auth.signInWithEmailAndPassword(this.email, this.password).then(ss=>{
        console.log("ingreso " + ss)

        this.datos.setemail(this.email);
        this.storage.set("usuario", this.email);
      }).catch(error=>{
        console.log("error  " + error)
      })
      console.log("OK")
    }

  }

  registro(){
    this.enrutador.navigateByUrl("/registro")
  }

}
