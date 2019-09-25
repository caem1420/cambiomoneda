import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database'


import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//import * as PlotlyJS from 'plotly.js/dist/plotly.js';
//import { PlotlyModule } from 'angular-plotly.js';


//PlotlyModule.plotlyjs = PlotlyJS;

export const datosfirebase = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBzI4BOZEMOsgpdLjVy4I4BrhgE6nhKFN8",
    authDomain: "cambiomoneda12.firebaseapp.com",
    databaseURL: "https://cambiomoneda12.firebaseio.com",
    projectId: "cambiomoneda12",
    storageBucket: "",
    messagingSenderId: "1010745232386",
    appId: "1:1010745232386:web:ef20cfd11b708e9cecab1b"
  }
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
    AngularFireModule.initializeApp(datosfirebase.firebase), AngularFireAuthModule,
    AngularFireDatabaseModule, IonicStorageModule.forRoot()], //PlotlyModule
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
