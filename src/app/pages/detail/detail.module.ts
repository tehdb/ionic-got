
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TooltipsModule } from 'ionic4-tooltips';

import { DetailPage } from './detail.page';
import { HouseDetailsComponent } from '../../houses/house-details/house-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TooltipsModule.forRoot(),
    RouterModule.forChild([{ path: '', component: DetailPage } ])
  ],
  declarations: [DetailPage, HouseDetailsComponent]
})
export class DetailPageModule {}
