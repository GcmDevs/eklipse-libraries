import {
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
  Component,
  Optional,
  OnInit,
  Input,
  Self,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MAT_DATE_LOCALE, MatNativeDateModule, ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TAK_DEFAULT_APPEARANCE_FORM, TakAutocompleteFieldType } from '../common';
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

  private _isSubmitted = false;
  private _isInvalid = false;
  private _required = false;
  private _value = '';

  constructor(
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;
    if (_formGroupDirective) {
      _formGroupDirective.ngSubmit.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
        this._isSubmitted = true;
        _cd.markForCheck();
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
