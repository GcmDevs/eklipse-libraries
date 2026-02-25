import {
  ChangeDetectorRef,
  OnDestroy,
  Component,
  Optional,
  Input,
  Self,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatOptionSelectionChange, ThemePalette } from '@angular/material/core';
import { TakAutocompleteFieldType, TAK_DEFAULT_APPEARANCE_FORM } from '../common';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TakErrorComponent } from '../error/component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  imports: [
    MatTooltipModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    TakErrorComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
  ],
  selector: 'tak-select-field',
  templateUrl: './component.html',
})
export class TakSelectFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() autocomplete: TakAutocompleteFieldType = 'off';
  @Input() appearance: MatFormFieldAppearance = TAK_DEFAULT_APPEARANCE_FORM;
  @Input() color: ThemePalette = 'primary';
  @Input() suggestions: any[] = [];
  @Input() disabled = false;

  @Input() type: 'menu' | 'select' = 'select';
  @Input() tooltip = '';
  @Input() icon = 'filter_list';

  @Input() option = 'option';
  @Input() extraInfo = '';

  @Input() hasDefaultValue = false;

  @Output() onSelect = new EventEmitter<any>();

  public onChangeFn = (_: any) => {};
  public onTouchFn = (_: any) => {};

  public isInvalid = false;
  public isSubmitted = false;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    @Self() @Optional() private _ngControl: NgControl,
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _cd: ChangeDetectorRef
  ) {
    if (_ngControl) this._ngControl.valueAccessor = this;
    if (_formGroupDirective) {
      _formGroupDirective.ngSubmit.pipe(takeUntil(this._unsubscribe$)).subscribe(() => {
        this.isSubmitted = true;
        _cd.markForCheck();
      });
    }
  }

  public ngOnInit(): void {
    if (this.suggestions.length && this.hasDefaultValue) {
      this._ngControl.control?.setValue(this.suggestions[0]);
    }

    if (this.disabled) this.control.disable();
  }

  public writeValue(value: string): void {}

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  public onChange(event: any): void {
    this.onChangeFn(event.target.value);
    if (this.control.touched) this._onValidate();
  }

  public emit(el: MatOptionSelectionChange) {
    if (el.isUserInput) {
      this.onSelect.emit(el.source.value);
      this.isInvalid = false;
    }
  }

  public justEmit(el: any) {
    this.control.setValue(el);
    this.onSelect.emit(el);
    this.isInvalid = false;
  }

  public onFocusOut() {
    this._onValidate();
  }

  private _onValidate(): void {
    if (this.control.invalid) this.isInvalid = true;
    else this.isInvalid = false;
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
}
