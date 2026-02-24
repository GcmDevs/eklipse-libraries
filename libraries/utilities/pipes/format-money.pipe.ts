import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'formatMoney' })
export class FormatMoneyPipe implements PipeTransform {
  public transform(value: number, round = true): string {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      const numberFt = round ? Math.ceil(value) : +value.toFixed(2);
      return Intl.NumberFormat('en-US').format(numberFt);
    } else return value;
  }
}
