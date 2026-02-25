import {
  Component,
  OnDestroy,
  Optional,
  Input,
  Self,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  FormControl,
  NgControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, map, Observable, Subject, takeUntil } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatOptionSelectionChange, ThemePalette } from '@angular/material/core';
import {
  TakAutocompleteFieldType,
  TAK_DEFAULT_APPEARANCE_FORM,
  TAK_PRESS_ESC_KEY,
} from '../common';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TakErrorComponent } from '../error/component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TakErrorComponent,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatInputModule,
  ],
  selector: 'tak-autocomplete-field',
  templateUrl: './component.html',
})
export class TakAutocompleteFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private _unsubscribe$ = new Subject<void>();

  @Input() option = 'option';
  @Input() extraInfo = '';
  @Input() autocomplete: TakAutocompleteFieldType = 'off';
  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() color: ThemePalette = 'primary';
  @Input() hasClearButton = true;
  @Input() suggestions: any[] = [];
  @Input() disabled = false;
  @Input() hasTitle = false;

  @Input() isLoading = false;
  @Input() isRemoteSearch = false;
  @Input() debounceTimeForRemoteSearch = 500;

  @Output() onSelect = new EventEmitter<any>();
  @Output() onSearch = new EventEmitter<any>();

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  private _isSubmitted = false;
  private _isInvalid = false;
  private _required = false;
  private _value = '';
  private _filteredOptions!: Observable<any>;
  private _notSuggestions = false;
  private _lastValue = '';

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
        if (r.name.includes('required')) this._required = true;
      });
    }

    this._filteredOptions = this.control.valueChanges.pipe(
      takeUntil(this._unsubscribe$),
      map(() => this._filter())
    );

    if (this.isRemoteSearch) {
      this.control.valueChanges
        .pipe(takeUntil(this._unsubscribe$), debounceTime(this.debounceTimeForRemoteSearch))
        .subscribe(() => {
          if (this._lastValue !== `${this._value}` && `${this._value}` && !this.control.value) {
            this.onSearch.emit(`${this._value}`);
            this._setValue(`${this._value}`);
          }

          this._lastValue = `${this._value}`;
        });
    }
    if (this.disabled) this.control.disable();
  }

  private _filter(): any[] {
    const value =
      typeof `${this._value}` === 'string'
        ? `${this._value}`.toLowerCase()
        : `${this.control.value[this.option]}`.toLowerCase();
    const option = this.suggestions.filter(res =>
      `${res[this.option]}`.toLowerCase().includes(value)
    );
    if (!option.length) this._notSuggestions = true;
    else this._notSuggestions = false;
    return option;
  }

  public writeValue(value: string): void {
    if (value === null) this._isInvalid = false;
    this._value = value || '';
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
    if (event.target.value !== `${this._value}`) {
      this._value = event.target.value;

      if (!this.isRemoteSearch) this._setValue(`${this._value}`);

      this.onChangeFn(
        this.suggestions.filter(
          sug => `${sug[this.option]}`.toLowerCase() === `${`${this._value}`}`.toLowerCase()
        )[0] || null
      );

      if (this.control.touched) {
        this._onValidate();
      }
    }
  }

  private _setValue(value: string) {
    if (!this.isRemoteSearch) {
      const suggestionsFiltered = value
        ? this.suggestions.filter(
            el =>
              `${el[this.option]}`.toLowerCase().trim() === (value as string).toLowerCase().trim()
          )
        : [];

      if (suggestionsFiltered.length) {
        document.body.dispatchEvent(TAK_PRESS_ESC_KEY);
      }

      try {
        this.control.setValue(suggestionsFiltered[0][this.option], {
          emitEvent: false,
        });
        this.onSelect.emit(suggestionsFiltered[0]);
      } catch (error) {}
    }
  }

  public emit(el: MatOptionSelectionChange) {
    if (el && el.isUserInput) this._isInvalid = false;
  }

  public emitWithClick(suggestionOption: any) {
    this.control.setValue(suggestionOption);
    this._value = `${suggestionOption[this.option]}`;
    this._isInvalid = false;
  }

  public onFocusout(): void {
    this.onTouchFn(true);
    this._onValidate();
  }

  public setValue(value: any) {
    this.control.setValue(value);
    this._value = `${value[this.option]}`;
  }

  public onUpdateSuggestions(suggestions: any[]) {
    this.suggestions = suggestions;
    this._cd.markForCheck();

    this.onChangeFn(
      this.suggestions.filter(
        sug => `${sug[this.option]}`.toLowerCase() === `${this._value}`.toLowerCase()
      )[0] || null
    );
  }

  private _onValidate(): void {
    if (this.control.invalid) this._isInvalid = true;
    else this._isInvalid = false;
  }

  public onFocus() {
    if (!`${this._value}`) {
      this.control.setValue('');
      this._value = '';
    }
  }

  public onClearControl(): void {
    this.control.setValue('', { emitEvent: false });
    this._value = '';
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
    return `${this._value}`;
  }

  get filteredOptions() {
    return this._filteredOptions;
  }

  get notSuggestions() {
    return this._notSuggestions;
  }

  get lastValue() {
    return this._lastValue;
  }
}
