import { Component, ViewChild, ViewContainerRef, Inject, OnInit, OnDestroy } from '@angular/core';

import { GroupDescriptor, SortDescriptor, process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { Pallet } from './shared/services/backend/model/models';
import { PalletControllerService } from './shared/services/backend/api/api';

import { PalletFormComponent } from './pallet-form/pallet-form.component';

const MENU_PALLET_EDIT: number = 0;
const MENU_PALLET_REMOVE: number = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public menuData: Array<any> = [{menuCode: MENU_PALLET_EDIT, icon: 'pencil', text: 'Edit Pallet'},
                                 {menuCode: MENU_PALLET_REMOVE, icon: 'trash', text: 'Remove Pallet'}];

  public loading: boolean = false;
  public palletData: GridDataResult;
  public pallets: Pallet[];

  @ViewChild("palletEditForm", { read: ViewContainerRef })
  public palletEditFormRef: ViewContainerRef;

  // initialize grid state
  public state: State = {
    group: Array<GroupDescriptor>(),
    sort: Array<SortDescriptor>(),
    skip: 0,
    take: 10
  }

  constructor(private dialogService: DialogService,
              private palletControllerService: PalletControllerService) {
  }

  private getPallets() {
    this.loading = true;

    let filter: any = {"include": [{"relation": "palletType"}]};

    this.palletControllerService.palletControllerFind(filter).subscribe((pallets: any) => {
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

  public addPalletHandler(event: any) {
    const pallet = {} as Pallet;

    const dialogRef = this.dialogService.open({
      appendTo: this.palletEditFormRef,
      content: PalletFormComponent,
      title: 'Add Pallet'
    });

    const palletEditForm = dialogRef.content.instance;
    palletEditForm.model = pallet;

    dialogRef.result.subscribe((pallet: any) => {
      if (!(pallet instanceof DialogCloseResult)) {
        this.loading = true;

        this.palletControllerService.palletControllerCreate(pallet).subscribe((pallet: Pallet) => {
          this.loading = false;

          this.getPallets();
        },
        err => {
          console.log(err);
          this.loading = false;
        });
      }
    });
  }

  public onMenuClick(event: any, pallet: any) {
      event.dataItem = pallet;

      if (event.menuCode == MENU_PALLET_EDIT)
        this.editPalletHandler(event);
      else if (event.menuCode == MENU_PALLET_REMOVE)
        this.removePalletHandler(event);
  }

  public editPalletHandler(event: any) {
    const pallet: Pallet = event.dataItem;

    const dialogRef = this.dialogService.open({
      appendTo: this.palletEditFormRef,
      content: PalletFormComponent,
      title: 'Edit Pallet'
    });

    const palletEditForm = dialogRef.content.instance;
    palletEditForm.model = pallet;

    dialogRef.result.subscribe((palletEdited: any) => {
      if (!(palletEdited instanceof DialogCloseResult)) {
        this.loading = true;

        this.palletControllerService.palletControllerUpdateById(pallet.id, palletEdited).subscribe((pallet: any) => {
          this.loading = false;

          this.getPallets();
        },
        err => {
          console.log(err);
          this.loading = false;
        });
      }
    });
  }

  public removePalletHandler(event: any) {
    const pallet: Pallet = event.dataItem;

    const dialogRef = this.dialogService.open({
      appendTo: this.palletEditFormRef,
      title: "Remove Pallet",
      content: "Are you sure?",
      actions: [{ text: "Yes" }, { text: "No" }]
    });

    dialogRef.result.subscribe((result: any) => {
      if (!(result instanceof DialogCloseResult)) {
        if (result.text == 'Yes') {
          this.loading = true;

          this.palletControllerService.palletControllerDeleteById(pallet.id).subscribe((count: any) => {
            this.loading = false;

            this.getPallets();
          },
          err => {
            console.log(err);
            this.loading = false;
          });
        }
      }
    });
  }
}
