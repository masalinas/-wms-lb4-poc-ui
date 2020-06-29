import { Component, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { DialogRef } from '@progress/kendo-angular-dialog';

import { Pallet, Stock, Product } from '../../shared/services/backend/model/models';
import { ProductControllerService } from '../../shared/services/backend/api/api';

@Component({
  selector: 'pallet-stock-form',
  templateUrl: './pallet-stock-form.component.html',
  styleUrls: ['./pallet-stock-form.component.css']
})
export class PalletStockFormComponent {
  @Input() public set stock(stock: Stock) {
    this.stockFormGroup.reset(stock);
  }

  public stockFormGroup = this.fb.group({
    productId: ['', Validators.required],
    lot: [''],
    expeditionDate: [''],
    serialNumber: [''],
    quantity: ['', Validators.required]
  });

  public pallet: Pallet;
  public products: Product[] = [];

  constructor(private fb: FormBuilder,
              private dialog: DialogRef,
              private productControllerService: ProductControllerService) {
     this.getProducts();
  }

  private getProducts() {
    this.productControllerService.productControllerFind().subscribe((products: any) => {
      this.products = products;
    },
    err => {
      console.log(err);
    });
  }

  private closeForm(event): void {
    this.dialog.close();
  }

  public onSave(event): void {
    event.preventDefault();

    this.dialog.close(this.stockFormGroup.value);
  }

  public onCancel(event): void {
    event.preventDefault();

    this.closeForm(event);
  }
}
