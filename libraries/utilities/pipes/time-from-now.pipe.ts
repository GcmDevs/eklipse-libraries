import { Pipe, PipeTransform } from '@angular/core';
import { TimerService, TimeOptions } from '@eklipse/ng-utilities/services';

@Pipe({ standalone: true, name: 'timeFromNow' })
export class TimeFromNowPipe implements PipeTransform {
  constructor(private _timer: TimerService) {}

  public transform(date: Date, options: TimeOptions = {}) {
    return this._timer.timeFromNow(date, options);
  }
}
