import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  email: any;
  monedas: any;

  constructor() { }


  setemail(email){
    this.email = email;
  }

  getemail(){
    return this.email;
  }

  setmonedas(monedas){
    this.monedas = monedas;
  }

  getmonedas(){
    return this.monedas;
  }
}
