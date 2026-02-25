import { NgModule } from '@angular/core';
import { TakDismissDialogButtonComponent } from './dismiss-dialog-button.component';
import { MatDialogModule } from '@angular/material/dialog';

const components = [TakDismissDialogButtonComponent];

@NgModule({
  imports: [...components],
  exports: [...components, MatDialogModule],
})
export class TakDialogModule {}
