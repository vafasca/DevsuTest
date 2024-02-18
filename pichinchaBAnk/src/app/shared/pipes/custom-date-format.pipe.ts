import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {

  transform(value: any): any {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy-MM-dd');
  }

}
