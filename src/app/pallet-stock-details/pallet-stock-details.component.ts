import { Component, ViewChild, ViewContainerRef, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupDescriptor, SortDescriptor, process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { PalletStockFormComponent } from './pallet-stock-form/pallet-stock-form.component';

import { Pallet, Stock } from '../shared/services/backend/model/models';
import { PalletStockControllerService } from '../shared/services/backend/api/api';

@Component({
    selector: 'pallet-stock-details',
    styleUrls: ['pallet-stock-details.component.css'],
    templateUrl: 'pallet-stock-details.component.html'
  })
export class PalletStockDetailsComponent implements OnInit {
  @Input() public pallet: Pallet;

  // grid parameters
  public state: State = {
    group: Array<GroupDescriptor>(),
    sort: Array<SortDescriptor>(),
    skip: 0,
    take: 10
  };

  public loading: boolean = false;

  public stockData: GridDataResult;
  public stocks: Stock[];

  constructor(private dialogService: DialogService,
              private palletStockControllerService: PalletStockControllerService) {
  }

  private loadGrid(stocks: Stock[]): void {
    this.stockData = process(stocks, this.state);
  }

  private getStocks() {
    this.loading = true;

    let filter: any = {filter: JSON.stringify({include: [{relation: "product"}]})};

    this.palletStockControllerService.palletStockControllerFind(this.pallet.id, filter).subscribe((stocks: any) => {
      this.loadGrid(stocks);

      this.loading = false;
    },
    err => {
      console.log(err);
      this.loading = false;
    });
  }

  public ngOnInit(): void {
    this.getStocks();
  }

  /*ngAfterViewInit(): void {
    // set hierarchy column width
    var elems = document.querySelectorAll('.k-grid .k-group-col, .k-grid .k-hierarchy-col');

    [].forEach.call(elems, function(elem) {
        elem.style.width = '5px';
    });
  }*/

  public getStocksHandler(event: any) {
    this.getStocks();
  }

  public onAddStockPalletClick(event: any) {
    const stock = {} as Stock;

    const dialogRef = this.dialogService.open({
      title: 'Add Stock',
      content: PalletStockFormComponent,
    });

    const palletStockEditForm = dialogRef.content.instance;
    palletStockEditForm.model = stock;

    dialogRef.result.subscribe((stock: any) => {
      if (!(stock instanceof DialogCloseResult)) {
        /*this.loading = true;

        this.palletControllerService.palletControllerCreate(pallet).subscribe((pallet: Pallet) => {
          this.loading = false;

          this.getStocks();
        },
        err => {
          console.log(err);
          this.loading = false;
        });*/
      }
    });
  }

  public onRemoveStockPalletClick(event: any) {
    const stock = {} as Stock;

    const dialogRef = this.dialogService.open({
      title: 'Remove Stock',
      content: PalletStockFormComponent,
    });

    const palletStockEditForm = dialogRef.content.instance;
    palletStockEditForm.model = stock;

    dialogRef.result.subscribe((stock: any) => {
      if (!(stock instanceof DialogCloseResult)) {
        /*this.loading = true;

        this.palletControllerService.palletControllerCreate(pallet).subscribe((pallet: Pallet) => {
          this.loading = false;

          this.getStocks();
        },
        err => {
          console.log(err);
          this.loading = false;
        });*/
      }
    });
  }

  public stockStateChange(state: DataStateChangeEvent): void {
    this.state = state;

    this.loadGrid(this.stocks);
  }
}
