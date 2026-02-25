import { NgModule } from '@angular/core';
import { TakBoxFormComponent } from './component';

/** @deprecated Use standalone */
@NgModule({
  imports: [TakBoxFormComponent],
  exports: [TakBoxFormComponent],
})
export class TakBoxFormModule {}
