import { NgModule } from '@angular/core';
import { TakCapsuleComponent } from './component';

/** @deprecated Use standalone */
@NgModule({
  imports: [TakCapsuleComponent],
  exports: [TakCapsuleComponent],
})
export class TakCapsuleModule {}
