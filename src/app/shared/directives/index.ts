// Angular modules
import { NgModule } from '@angular/core';

// Kendo-UI modules
import { KendoGridColumnDateFormatDirective } from './kendo-cell-dateformat.directive';

@NgModule({
  imports: [],
  declarations: [KendoGridColumnDateFormatDirective],
  exports: [KendoGridColumnDateFormatDirective ]
})
export class DirectiveModule { }
