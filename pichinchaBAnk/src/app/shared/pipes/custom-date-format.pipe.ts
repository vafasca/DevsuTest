import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Pipe personalizado para formatear fechas en un formato personalizado.
 */
@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  /**
   * Transforma una fecha en el formato 'yyyy-MM-dd'.
   * @param value La fecha a formatear.
   * @returns La fecha formateada en el formato 'yyyy-MM-dd'.
   */
  transform(value: any): any {
    // Instancia de DatePipe con configuración de idioma 'en-US'
    const datePipe: DatePipe = new DatePipe('en-US');
    // Aplicar formato de fecha 'yyyy-MM-dd'
    return datePipe.transform(value, 'yyyy-MM-dd');
  }

}
