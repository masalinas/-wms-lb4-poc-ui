import { Component, OnInit } from '@angular/core';

import { GroupDescriptor, SortDescriptor, process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loading: boolean = false;
  public palletData: GridDataResult;
  //public pallets: Pallet[];

  // grid parameters
  public state: State = {
    group: Array<GroupDescriptor>(),
    sort: Array<SortDescriptor>(),
    skip: 0,
    take: 10
  }

  private getPallets() {
  }

  private loadGrid(): void {
    //this.palletData = process(this.pallets, this.state);
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
