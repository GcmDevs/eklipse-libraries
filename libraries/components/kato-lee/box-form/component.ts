import {
  ChangeDetectorRef,
  ViewEncapsulation,
  EventEmitter,
  ElementRef,
  Component,
  ViewChild,
  Output,
  Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
  ],
  selector: 'tak-box-form',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TakBoxFormComponent {
  @ViewChild('content') content!: ElementRef;

  @Output() ngSubmit = new EventEmitter();
  @Output() ngReset = new EventEmitter();

  @Output() onBack = new EventEmitter();

  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() takTitle = '';
  @Input() takSubtitle = '';

  @Input() showActionButtons = true;
  @Input() hasResetButton = false;
  @Input() hasBreadcrumbs = false;
  @Input() hasBackButton = false;
  @Input() hasBranding = true;
  @Input() isLoading = false;

  @Input() exedentInPx = 265;

  @Input() submitButton = '';
  @Input() resetButton = '';

  private _submitButton = '';
  private _resetButton = '';

  private _formGroupSubs!: Subscription;

  constructor(
    private _href: ElementRef,
    private _cd: ChangeDetectorRef
  ) {
    _href.nativeElement.classList.add('tak-box-form');
  }

  public ngOnInit(): void {
    this._formGroupSubs = this.formGroup.statusChanges.subscribe(() => {
      this._cd.markForCheck();
    });

    if (!this.showActionButtons) this.exedentInPx -= 58;

    this._submitButton = this.submitButton ? this.submitButton : 'ENVIAR';
    this._resetButton = this.resetButton ? this.resetButton : 'REINICIAR';

    if (this.hasBreadcrumbs) this.exedentInPx = this.exedentInPx + 45;
  }

  public clickOnReset() {
    if (this.formGroup) this.formGroup.reset();
    this.ngReset.emit();
  }

  public ngOnDestroy(): void {
    if (this._formGroupSubs) this._formGroupSubs.unsubscribe();
  }

  get orSubmitButton() {
    return this._submitButton;
  }

  get orResetButton() {
    return this._resetButton;
  }
}
