import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'sumColumnValues' })
export class SumColumnValuesPipe implements PipeTransform {
  public transform(arr: any[], columnName: string, tipeFormat: 1 | 2 = 1): number | string {
    try {
      const result: number = arr.map((t) => t[columnName]).reduce((acc, value) => acc + value, 0);
      const value = Math.ceil(result);
      if (tipeFormat === 1) return Intl.NumberFormat('en-US').format(value);
      if (tipeFormat === 2) return value.toFixed(2);
      return value;
    } catch (error) {
      return 'isNaN';
    }
  }
}
