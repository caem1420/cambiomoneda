import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlvidocontraPage } from './olvidocontra.page';

const routes: Routes = [
  {
    path: '',
    component: OlvidocontraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OlvidocontraPage]
})
export class OlvidocontraPageModule {}
