import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';  
import { MatListModule } from '@angular/material/list';  
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';  
import { MatChipsModule } from '@angular/material/chips';  
import { MatIconModule } from '@angular/material/icon';  
import { MatInputModule } from '@angular/material/input'; 
import { MatMenuModule } from '@angular/material/menu';  
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatRadioModule } from '@angular/material/radio'; 

import { MatSelectModule } from '@angular/material/select';  

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';  
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule} from '@angular/material/datepicker';


const MATERIAL_MODULES = [
  CommonModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatDatepickerModule,
  
  // These modules include providers.
  MatButtonToggleModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTooltipModule
];
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class AngularMaterialModule { }
