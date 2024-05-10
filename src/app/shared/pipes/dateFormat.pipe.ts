import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      const dateObject = value.toDate();
      return new DatePipe('en-US').transform(dateObject, 'yyyy-MM-dd HH:mm:ss');
    }
    return null;
  }
}
