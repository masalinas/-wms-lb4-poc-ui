// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Kendo-UI modules
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

// Interceptors
import { AuthInterceptorService } from './auth-interceptor.service';

// App environment
import { environment } from '../environments/environment';

// Loopback services
import { ApiModule, Configuration, ConfigurationParameters, BASE_PATH } from './shared/services/backend';

// directives module
import { DirectiveModule } from './shared/directives';

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// WMS services
import { PalletFormComponent } from './pallet-form/pallet-form.component';
import { PalletStockDetailsComponent } from './pallet-stock-details/pallet-stock-details.component';
import { PalletStockFormComponent } from './pallet-stock-details/pallet-stock-form/pallet-stock-form.component';



@NgModule({
  declarations: [
    AppComponent,
    PalletFormComponent,
    PalletStockDetailsComponent,
    PalletStockFormComponent,
  ],
  imports: [
    // Angular modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Kendo-UI modules
    ButtonsModule,
    DateInputsModule,
    InputsModule,
    DropDownsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogsModule,
    LayoutModule,
    TooltipModule,
    // Customer modules
    DirectiveModule,
  ],
  entryComponents: [
    PalletFormComponent,
    PalletStockFormComponent,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
          new Configuration({ basePath: environment.basePath})
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
