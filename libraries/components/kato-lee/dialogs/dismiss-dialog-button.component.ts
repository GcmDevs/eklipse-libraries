import { ChangeDetectionStrategy, ViewEncapsulation, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDividerModule, MatDialogModule],
  selector: 'tak-dismiss-dialog-button',
  host: {
    directive: 'tak-dialog-title',
  },
  template: `
    <div class="tak-modal__top-container--custom">
      <h1 class="tak-modal__top-container--custom--title"><ng-content /></h1>
      <button mat-icon-button (click)="dialogRef.close()"><mat-icon>close</mat-icon></button>
    </div>
    <mat-divider />
    <input style="display: none !important;" cdkFocusInitial />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TakDismissDialogButtonComponent {
  constructor(public dialogRef: MatDialogRef<TakDismissDialogButtonComponent>) {}
}
