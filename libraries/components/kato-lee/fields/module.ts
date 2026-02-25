import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TakSelectFieldComponent } from './select/component';
import { TakDateFieldComponent } from './date/component';
import { TakAutocompleteFieldComponent } from './autocomplete/component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TakDateRangeFieldComponent } from './date-range/component';
import { TakMoneyFieldComponent } from './money/component';
import { TakGeneralFieldComponent } from './general/component';
import { TakNumberFieldComponent } from './number/component';
import { TakTextareaComponent } from './text-area/component';
import { TakRemoteAutocompleteFieldComponent } from './remote-autocomplete/component';

const components = [
  TakSelectFieldComponent,
  TakDateFieldComponent,
  TakAutocompleteFieldComponent,
  TakDateRangeFieldComponent,
  TakGeneralFieldComponent,
  TakMoneyFieldComponent,
  TakTextareaComponent,
  TakNumberFieldComponent,
];

/** @deprecated Use standalone */
@NgModule({
  imports: [
    ...components,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule,
    TakRemoteAutocompleteFieldComponent,
  ],
  exports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatNativeDateModule,
    TakRemoteAutocompleteFieldComponent,
    ...components,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
})
export class TakFieldsModule {}
