import { Component, OnInit } from '@angular/core';

import { GroupDescriptor, SortDescriptor, process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { PalletControllerService } from './shared/services/backend/api/api';
import { Pallet } from './shared/services/backend/model/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading: boolean = false;
  public palletData: GridDataResult;
  public pallets: Pallet[];

  // grid parameters
  public state: State = {
    group: Array<GroupDescriptor>(),
    sort: Array<SortDescriptor>(),
    skip: 0,
    take: 10
  }

  constructor(private palletControllerService: PalletControllerService) {
  }

  private getPallets() {
    this.loading = true;

    this.palletControllerService.palletControllerFind().subscribe((pallets: any) => {
       this.pallets = pallets;

       this.loadGrid();
       this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      });
  }

  private loadGrid(): void {
    this.palletData = process(this.pallets, this.state);
  }

  ngOnInit(): void {
    this.getPallets();
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;

    this.loadGrid();
  }

  public onPalletRefreshClick(event: any) {
    this.getPallets();
  }
}
