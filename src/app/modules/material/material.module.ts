import { NgModule } from '@angular/core';

import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MatComponents = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  FormsModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule,
  MatChipsModule,
  MatSelectModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: [MatComponents],
  exports: [MatComponents],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class MaterialModule {}
