import { MatDatepickerIntl } from '@angular/material/datepicker';

export function getSpanishMatDatePickerIntl() {
  const datePickerIntl = new MatDatepickerIntl();

  datePickerIntl.prevMonthLabel = '';
  datePickerIntl.nextMonthLabel = '';
  datePickerIntl.prevYearLabel = '';
  datePickerIntl.nextYearLabel = '';
  datePickerIntl.prevMultiYearLabel = '';
  datePickerIntl.nextMultiYearLabel = '';

  return datePickerIntl;
}
