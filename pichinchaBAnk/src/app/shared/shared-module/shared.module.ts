import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CustomDateFormatPipe } from '../pipes/custom-date-format.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    CustomDateFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    CustomDateFormatPipe
  ]
})
export class SharedModule { }
