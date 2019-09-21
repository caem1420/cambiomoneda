import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  email: any;

  constructor() { }


  setemail(email){
    this.email = email;
  }

  getemail(){
    return this.email;
  }
}
