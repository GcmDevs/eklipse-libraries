import { Pipe, PipeTransform } from '@angular/core';
import {
  FormatTimes,
  removeTimeZone,
  TimerService,
  TimeOptions,
} from '@eklipse/ng-utilities/services';

@Pipe({ standalone: true, name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  constructor(private _timeUtilities: TimerService) {}

  public transform(item: any, format: FormatTimes = 1, options: TimeOptions = {}) {
    if (format === 12) item = removeTimeZone(item as Date);
    return this._timeUtilities.formatDate(item, format, options);
  }
}
