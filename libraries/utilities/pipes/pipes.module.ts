import { NgModule } from '@angular/core';
import { FormatDatePipe } from './format-date.pipe';
import { FormatDecimalPipe } from './format-decimal.pipe';
import { FormatMoneyPipe } from './format-money.pipe';
import { SumColumnValuesPipe } from './sum-column-values.pipe';
import { TimeFromNowPipe } from './time-from-now.pipe';
import { HoursFromNowPipe } from './hours-from-now.pipe';

const pipes = [
  HoursFromNowPipe,
  FormatDatePipe,
  FormatDecimalPipe,
  FormatMoneyPipe,
  SumColumnValuesPipe,
  TimeFromNowPipe,
  TimeFromNowPipe,
];

@NgModule({
  imports: pipes,
  exports: pipes,
})
export class PipesModule {}
