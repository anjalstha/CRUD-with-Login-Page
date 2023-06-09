import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImdbPageRoutingModule } from './imdb-routing.module';

import { ImdbPage } from './imdb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImdbPageRoutingModule
  ],
  declarations: [ImdbPage]
})
export class ImdbPageModule {}
