// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Kendo-UI modules
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';

// App environment
import { environment } from '../environments/environment';

// Loopback services
import { ApiModule, Configuration, ConfigurationParameters, BASE_PATH } from './shared/services/backend';

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// WMS services
import { PalletFormComponent } from './pallet-form/pallet-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PalletFormComponent
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
    InputsModule,
    DropDownsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogsModule,
    LayoutModule
  ],
  entryComponents: [
    PalletFormComponent,
  ],
  providers: [
    {
      provide: Configuration,
      useFactory: () =>
          new Configuration({ basePath: environment.basePath})
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
