import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { RouterModule } from '@angular/router';
import { UpdateUserPopupComponent } from './update-user-popup/update-user-popup.component';
import { TableComponent } from './table/table.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';

@NgModule({
  declarations: [
    ProfileComponent,
    LandingComponent,
    UpdateUserPopupComponent,
    TableComponent,
    ConfirmationPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    ProfileComponent,
    LandingComponent,
    TableComponent
  ]
})
export class SharedModule { }
