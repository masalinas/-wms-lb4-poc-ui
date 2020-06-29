import { Component, ViewChild, ViewContainerRef, Inject, OnInit, OnDestroy, HostListener } from '@angular/core';

import { GroupDescriptor, SortDescriptor, process, State } from '@progress/kendo-data-query';
import { GridComponent, GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { DialogService, DialogCloseResult } from '@progress/kendo-angular-dialog';

import { PalletFormComponent } from './pallet-form/pallet-form.component';

import { Pallet } from './shared/services/backend/model/models';
import { UserControllerService, PalletControllerService } from './shared/services/backend/api/api';

const MENU_PALLET_EDIT: number = 0;
const MENU_PALLET_REMOVE: number = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public pageHeight = window.innerHeight - 35;

  public menuData: Array<any> = [{menuCode: MENU_PALLET_EDIT, icon: 'pencil', text: 'Edit Pallet'},
                                 {menuCode: MENU_PALLET_REMOVE, icon: 'trash', text: 'Remove Pallet'}];

  public loading: boolean = false;
  public state: State = {
    group: Array<GroupDescriptor>(),
    sort: Array<SortDescriptor>(),
    skip: 0,
    take: 10
  }

  public palletData: GridDataResult;
  public pallets: Pallet[];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.pageHeight = event.target.innerHeight - 35;
  }

  constructor(private dialogService: DialogService,
              private userControllerService: UserControllerService,
              private palletControllerService: PalletControllerService) {
  }

  ngOnInit(): void {
    this.login();
  }

  private login() {
    this.userControllerService.userControllerLogin({email: 'masalinas.gancedo@gmail.com', password: 'underground'}).subscribe((result: any) => {
      localStorage.setItem('token', result.token);

      this.getPallets();
    },
    err => {
      console.log(err);
      this.loading = false;
    });
  }

  private getPallets() {
    this.loading = true;

    let filter: any = {filter: JSON.stringify({include: [{relation: "palletType"}]})};

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

  public onDataStateChange(state: DataStateChangeEvent): void {
    this.state = state;

    this.loadGrid();
  }

  public onPalletRefreshClick(event: any) {
    this.getPallets();
  }

  public onMenuClick(event: any, pallet: any) {
      event.dataItem = pallet;

      if (event.menuCode == MENU_PALLET_EDIT)
        this.editPalletHandler(event);
      else if (event.menuCode == MENU_PALLET_REMOVE)
        this.removePalletHandler(event);
  }

  public addPalletHandler(event: any) {
    const pallet = {} as Pallet;

    const dialogRef = this.dialogService.open({
      title: 'Add Pallet',
      content: PalletFormComponent,
    });

    const palletEditForm = dialogRef.content.instance;
    palletEditForm.pallet = pallet;

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

  public editPalletHandler(event: any) {
    const pallet: Pallet = event.dataItem;

    const dialogRef = this.dialogService.open({
      title: 'Edit Pallet',
      content: PalletFormComponent
    });

    const palletEditForm = dialogRef.content.instance;
    palletEditForm.pallet = pallet;

    dialogRef.result.subscribe((palletUpdated: any) => {
      if (!(palletUpdated instanceof DialogCloseResult)) {
        this.loading = true;

        this.palletControllerService.palletControllerUpdateById(pallet.id, palletUpdated).subscribe((pallet: any) => {
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
