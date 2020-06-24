import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Kendo-UI modules
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';

// Loopback services
import { ApiModule, Configuration, ConfigurationParameters, BASE_PATH } from './shared/services/backend';

import { PalletFormComponent } from './pallet-form/pallet-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PalletFormComponent
  ],
  imports: [
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
