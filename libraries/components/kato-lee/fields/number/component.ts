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
  selector: 'tak-number-field',
  templateUrl: './component.html',
})
export class TakNumberFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() autocomplete: 'off' | 'on' = 'off';

  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() color: ThemePalette = 'primary';
  @Input() actionIcon = 'search';

  @Input() hasActionButton = false;
  @Input() hasClearButton = false;
  @Input() countCaracters = false;
  @Input() placeholder = '';

  @Input() min!: number;
  @Input() max!: number;

  @Input() minLength!: number;
  @Input() maxLength!: number;

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

    if (this.min) this.control.addValidators(Validators.min(this.min));
    if (this.max) this.control.addValidators(Validators.max(this.max));

    if (this.disabled) this.control.disable();
  }

  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
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
    this.onChangeFn(
      ['', null, undefined].indexOf(event.target.value) < 0 ? +event.target.value : null
    );
    if (this.control.touched) this._onValidate();
  }

  public onFocusOut(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this._isInvalid = true;
    else this._isInvalid = false;
  }

  public onClearControl(): void {
    if (['', null, undefined].indexOf(this.control.value) >= 0) {
      this.control.setValue('', { emitEvent: false });
    } else this.control.setValue('');
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
