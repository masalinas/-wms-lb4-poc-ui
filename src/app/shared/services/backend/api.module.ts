import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { PalletControllerService } from './api/palletController.service';
import { PalletPalletTypeControllerService } from './api/palletPalletTypeController.service';
import { PalletStockControllerService } from './api/palletStockController.service';
import { PalletTypeControllerService } from './api/palletTypeController.service';
import { PingControllerService } from './api/pingController.service';
import { ProductControllerService } from './api/productController.service';
import { StockControllerService } from './api/stockController.service';
import { StockPalletControllerService } from './api/stockPalletController.service';
import { StockProductControllerService } from './api/stockProductController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
