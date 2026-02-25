import { Pipe, PipeTransform } from '@angular/core';
import * as lang from './lang';

@Pipe({ standalone: true, name: 'errorMsg' })
export class TakErrorMsgPipe implements PipeTransform {
  transform(parameter: string, aditionalValue?: any): string {
    let resources = lang.es;
    if (aditionalValue) return resources[parameter](aditionalValue);
    else return resources[parameter];
  }
}
