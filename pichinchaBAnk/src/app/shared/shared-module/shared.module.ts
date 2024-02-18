import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { CustomDateFormatPipe } from '../pipes/custom-date-format.pipe';

/**
 * Módulo compartido que exporta componentes y pipes para ser utilizados en múltiples módulos de Angular.
 */
@NgModule({
  declarations: [
    HeaderComponent, // Componente de encabezado
    CustomDateFormatPipe // Pipe personalizado para formato de fecha
  ],
  imports: [
    CommonModule // Módulo de Angular para funcionalidades comunes
  ],
  exports: [
    HeaderComponent, // Exporta el componente de encabezado
    CustomDateFormatPipe // Exporta el pipe personalizado para formato de fecha
  ]
})
export class SharedModule { }
