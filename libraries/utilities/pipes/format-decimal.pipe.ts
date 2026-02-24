import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'formatDecimal' })
export class FormatDecimalPipe implements PipeTransform {
  transform(value: number, fixed = 2): string {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      if (Number.isInteger(value)) return value.toString();
      else return value.toFixed(fixed);
    } else return value;
  }
}
