import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  Optional,
  OnInit,
  Input,
  Self,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  FormControl,
  NgControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { TAK_DEFAULT_APPEARANCE_FORM } from '../common';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TakErrorComponent } from '../error/component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    TakErrorComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  selector: 'tak-money-field',
  templateUrl: './component.html',
})
export class TakMoneyFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() autocomplete: 'off' | 'on' = 'off';

  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() color: ThemePalette = 'primary';
  @Input() actionIcon = 'search';

  @Input() defaultFilterStyle = true;
  @Input() hasActionButton = false;
  @Input() hasClearButton = true;
  @Input() countCaracters = false;
  @Input() placeholder = '';

  @Input() maxLength!: number;
  @Input() minLength!: number;

  @Input() disabled = false;

  @Output() onExecuteAction = new EventEmitter();
  @Output() onKeyUp = new EventEmitter();

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  private _isSubmitted = false;
  private _isInvalid = false;
  private _required = false;
  private _value = '';

  private _subscription!: Subscription;

  constructor(
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;

    if (_formGroupDirective) {
      this._subscription = _formGroupDirective.ngSubmit.subscribe(() => {
        this._isSubmitted = true;
        _cd.markForCheck();
      });
    }
  }

  public ngOnInit(): void {
    const form: any = this.control;

    if (form?._rawValidators) {
      form._rawValidators.forEach((r: any) => {
        if (r.name.includes('required')) this._required = true;
      });
    }

    this.control.addValidators(Validators.pattern(/^[0-9.,-]+$/));

    if (['', null, undefined, '-'].indexOf(this.control.value) < 0) this._addCurrencyMask();

    if (this.disabled) this.control.disable();
  }

  public writeValue(value: string): void {
    if (value === null) {
      this._isInvalid = false;
    }
    this._value = value;
    this._isSubmitted = false;
    this._cd.markForCheck();
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
    this._addCurrencyMask();
    if (this.control.touched) this._onValidate();
  }

  private _addCurrencyMask() {
    const valueFormatted = this.control.value
      .toString()
      .replace(/,/g, '')
      .replace(/ /g, '')
      .replace('$', '');

    if (['', null, undefined, '-'].indexOf(valueFormatted) < 0 && !isNaN(Number(valueFormatted))) {
      const value = '$ ' + Intl.NumberFormat('en-US').format(Number(valueFormatted));
      this.control.setValue(+valueFormatted);
      this._value = value;
    } else if (['-'].indexOf(valueFormatted) >= 0) this.control.setValue('-');
    else this.control.setValue(null);
  }

  public onFocusOut(): void {
    this.onTouchFn(true);
    //this._executeIfIsMoneyField();
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this._isInvalid = true;
    else this._isInvalid = false;
  }

  public onKeyDown(event: any) {
    const pattern = /[0-9.-]/i.test(event.key);
    const validKeyCodes = [8, 46, 37, 39, 9, 17, 16, 67, 86, 109, 189];
    return pattern || validKeyCodes.indexOf(event.keyCode) >= 0;
  }

  public onClearControl(): void {
    if (['', null, undefined].indexOf(this.control.value) >= 0) {
      this.control.setValue('', { emitEvent: false });
    } else {
      this.control.setValue('');
    }

    this._value = '';
  }

  public ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }

  get control(): FormControl {
    return this._ngControl.control as FormControl;
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
