import {
  ControlValueAccessor,
  ReactiveFormsModule,
  FormGroupDirective,
  FormsModule,
  FormControl,
  NgControl,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { AfterViewInit, OnDestroy, Component, OnInit, Input, signal } from '@angular/core';
import { MAT_DATE_LOCALE, MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { TAK_DEFAULT_APPEARANCE_FORM, TakAutocompleteFieldType } from '../common';
import { getSpanishMatDatePickerIntl } from '../mat-date-picker.translation';
import { TakErrorComponent } from '../error/component';

@Component({
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
  providers: [
    FormGroupDirective,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MatDatepickerIntl, useValue: getSpanishMatDatePickerIntl() },
  ],
  selector: 'tak-date-field',
  templateUrl: './component.html',
})
export class TakDateFieldComponent
  implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
  private _unsubscribe$ = new Subject<void>();

  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() autocomplete: TakAutocompleteFieldType = 'off';
  @Input() color: ThemePalette = 'primary';
  @Input() placeholder = '';
  @Input() notInput = false;

  @Input() minDate!: Date | string;
  @Input() maxDate!: Date | string;

  @Input() disabled = false;

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  private _isSubmitted = signal(false);
  private _isInvalid = false;
  private _required = false;
  private _value = '';

  constructor(
    private _ngControl: NgControl,
    private _formGroupDirective: FormGroupDirective,
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;
    if (_formGroupDirective) {
      _formGroupDirective.ngSubmit.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
        this._isSubmitted.set(true);
      });
    }
  }

  public ngOnInit(): void {
    const form: any = this.control;
    if (form?._rawValidators) {
      form._rawValidators.map((r: any) => {
        if (r.name.includes('required')) {
          this._required = true;
        }
      });
    }
    if (this.disabled) this.control.disable();
  }

  public ngAfterViewInit(): void {
    const isValidDate = Date.parse(this.control.value);
    if (isNaN(isValidDate)) this.control.setValue(null);
    else this.control.setValue(new Date(this.control.value));
  }

  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
    this._value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this._value = event.target.value;
    this.onChangeFn(event.target.value);
    if (this.control.touched) this._onValidate();
  }

  public onFocusout(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  public onCloseDatePicker(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  private _onValidate(): void {
    const isValidDate = Date.parse(this.control.value);
    if (
      this.control.invalid ||
      ([undefined, null, ''].indexOf(this.control.value) < 0 &&
        this.control.valid &&
        isNaN(isValidDate))
    ) {
      this._isInvalid = true;
    } else {
      this._isInvalid = false;
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get control(): FormControl {
    return this._ngControl?.control as FormControl;
  }

  get directive(): FormGroupDirective {
    return this._formGroupDirective as FormGroupDirective;
  }

  get isDisabled() {
    return this._ngControl.disabled;
  }

  get isSubmitted() {
    return this._isSubmitted;
  }

  get isInvalid() {
    return this._isInvalid;
  }

  get required() {
    return this._required;
  }

  get value() {
    return this._value;
  }
}
