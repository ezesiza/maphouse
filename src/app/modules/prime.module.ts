import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';

const primeModules = [
  TableModule,
  CardModule,
  DividerModule,
  PanelModule,
  ContextMenuModule,
];

@NgModule({
  declarations: [],
  imports: [...primeModules],
  exports: [...primeModules],
})
export class PrimeModules {}
