import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Kendo-UI modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';

// Loopback services
//import { ApiModule, Configuration, ConfigurationParameters, BASE_PATH } from './shared/services/backend';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    // Kendo-UI modules
    ButtonsModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
