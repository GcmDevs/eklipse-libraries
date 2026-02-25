import { NgModule } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { getSpanishMatPaginatorIntl } from './mat-paginator.translation';
import { TakTableNoRecordsComponent } from './no-records.component';

const modules = [MatTableModule, MatSortModule, MatPaginatorModule, TakTableNoRecordsComponent];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [{ provide: MatPaginatorIntl, useValue: getSpanishMatPaginatorIntl() }],
})
export class TakTablesModule {}
