import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'hoursFromNow' })
export class HoursFromNowPipe implements PipeTransform {
  transform(date: any) {
    const value = Math.floor((((new Date() as any) - date) as any) / (1000 * 60 * 60));
    return value;
  }
}
