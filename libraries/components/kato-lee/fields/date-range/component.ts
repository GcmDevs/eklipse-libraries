import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { TakAutocompleteFieldType, TAK_DEFAULT_APPEARANCE_FORM } from '../common';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TakErrorComponent } from '../error/component';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    TakErrorComponent,
    FormsModule,
    CommonModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  selector: 'tak-date-range-field',
  templateUrl: './component.html',
})
export class TakDateRangeFieldComponent implements OnInit {
  @Input() autocomplete: TakAutocompleteFieldType = 'off';
  @Input() startPlaceholder: string = 'Inicio';
  @Input() endPlaceholder: string = 'Fin';

  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() color: ThemePalette = 'primary';

  @Input() start!: FormControl;
  @Input() end!: FormControl;
  @Input() notInput = false;

  @Input() disabled = false;

  private _required = false;

  public ngOnInit(): void {
    const start: any = this.start;
    const end: any = this.end;
    if (start?._rawValidators) {
      start._rawValidators.map((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }
    if (end?._rawValidators) {
      end._rawValidators.map((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }
    if (this.disabled) {
      this.start.disable();
      this.end.disable();
    }
  }

  get required() {
    return this._required;
  }

  get isDisabled() {
    return this.start.disabled || this.end.disabled;
  }
}
