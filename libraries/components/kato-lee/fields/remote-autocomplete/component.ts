import {
  ChangeDetectionStrategy,
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Input,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakToast } from '@eklipse/ng-components/kato-lee/toast';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  map,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TAK_PRESS_ESC_KEY } from '../common';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  selector: 'tak-remote-autocomplete-field',
  templateUrl: './component.html',
  styles: [
    `
      mat-spinner.spinner-loading {
        display: inline;
        margin-left: -10px;
        & > svg {
          margin-top: -5px;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakRemoteAutocompleteFieldComponent implements OnInit, OnDestroy {
  @Input() remoteUrl = '';
  @Input() params: any = {};
  @Input() option = 'option';
  @Input() extraInfo = '';
  @Input() justOneLoad = false;

  @Output() onSelect = new EventEmitter<any>();

  public suggestions: any[] = [];
  public autocomplete = new FormControl();

  private _isLoading = false;
  public isValueSelected = false;

  private _unsubscribe$ = new Subject<void>();
  private _isLoadingItem = false;
  private _isRequired = true;

  private _filteredOptions!: Observable<any>;
  private _value = '';
  private _notSuggestions = false;

  public wasLoaded = false;

  constructor(
    private _http: HttpClient,
    private _cd: ChangeDetectorRef,
    private _toast: TakToast,
  ) {}

  public async ngOnInit(): Promise<any> {
    if (!this.justOneLoad) {
      this.autocomplete.valueChanges
        .pipe(takeUntil(this._unsubscribe$), debounceTime(500), distinctUntilChanged())
        .subscribe(async (value) => {
          if (
            value &&
            !this.suggestions.filter((suggestion) => suggestion.getNombre() === value).length
          ) {
            this._isLoading = true;
            this._cd.markForCheck();

            try {
              const result = await firstValueFrom(
                this._http.get<any[]>(this.remoteUrl, {
                  params: this.params,
                }),
              );

              if (result.length !== 0) {
                this.suggestions = result;
                if (
                  `${value}`.toLocaleLowerCase() ===
                  `${this.suggestions[0][this.option]}`.toLocaleLowerCase()
                ) {
                  this.autocomplete.setValue(`${this.suggestions[0][this.option]}`, {
                    emitEvent: false,
                  });
                  this.onSelect.emit(this.suggestions[0]);
                  document.body.dispatchEvent(TAK_PRESS_ESC_KEY);
                }
              } else {
                this._toast.notification('No existen items que contengan esta palabra clave');
              }
            } catch (error: any) {
              this._toast.danger(error.error.message);
            }

            this._isLoading = false;
            this._cd.markForCheck();
          }
        });
    } else {
      try {
        const result = await firstValueFrom(
          this._http.get<any[]>(this.remoteUrl, {
            params: this.params,
          }),
        );

        this.suggestions = result;
        this.wasLoaded = true;
        this._cd.markForCheck();

        this._filteredOptions = this.autocomplete.valueChanges.pipe(
          takeUntil(this._unsubscribe$),
          map(() => this._filter()),
        );
      } catch (error: any) {
        this._toast.danger(error.error.message);
      }
    }
  }

  private _filter(): any[] {
    const value =
      typeof `${this.autocomplete.value}` === 'string'
        ? `${this.autocomplete.value}`.toLowerCase()
        : `${this.autocomplete.value[this.option]}`.toLowerCase();
    const option = this.suggestions.filter((res) =>
      `${res[this.option]}`.toLowerCase().includes(value),
    );
    if (!option.length) this._notSuggestions = true;
    else this._notSuggestions = false;
    return option;
  }

  async refresh() {
    try {
      const result = await firstValueFrom(
        this._http.get<any[]>(this.remoteUrl, {
          params: this.params,
        }),
      );

      this.suggestions = result;
      this.autocomplete.setValue('');
      this._toast.notification('Data actualizada correctamente');
      this._cd.markForCheck();
    } catch (error: any) {
      this._toast.danger(error.error.message);
    }
  }

  public reset() {
    if (!this.justOneLoad) {
      this.autocomplete.reset();
    } else {
      this.autocomplete.setValue('');
    }
    this.onSelect.emit(null as any);
  }

  emit(el: any, option: any) {
    if (el.isUserInput) {
      this.onSelect.emit(option);
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  get isLoading() {
    return this._isLoading;
  }

  get isRequired() {
    return this._isRequired;
  }

  get isLoadingItem() {
    return this._isLoadingItem;
  }

  get filteredOptions() {
    return this._filteredOptions;
  }

  get value() {
    return `${this._value}`;
  }

  get notSuggestions() {
    return this._notSuggestions;
  }
}
