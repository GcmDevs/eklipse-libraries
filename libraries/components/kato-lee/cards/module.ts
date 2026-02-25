import { NgModule } from '@angular/core';
import { TakSimpleCardComponent } from './component';

const components = [TakSimpleCardComponent];

/** @deprecated Use standalone */
@NgModule({
  imports: components,
  exports: components,
})
export class TakCardsModule {}
