import { Component, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { DialogRef } from '@progress/kendo-angular-dialog';

import { Pallet, PalletType } from '../shared/services/backend/model/models';
import { PalletTypeControllerService } from '../shared/services/backend/api/api';

@Component({
  selector: 'pallet-form',
  templateUrl: './pallet-form.component.html',
  styleUrls: ['./pallet-form.component.css']
})
export class PalletFormComponent {
  public palletFormGroup = this.fb.group({
    sscc: ['', Validators.required],
    palletTypeId: ['', Validators.required],
  });

  public palletTypes: PalletType[] = [];

  @Input() public set pallet(pallet: Pallet) {
    this.palletFormGroup.reset(pallet);
  }

  constructor(private fb: FormBuilder,
              private dialog: DialogRef,
              private palletTypeControllerService: PalletTypeControllerService) {
     this.getPalletTypes();
  }

  private getPalletTypes() {
    this.palletTypeControllerService.palletTypeControllerFind().subscribe((palletTypes: any) => {
      this.palletTypes = palletTypes;
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

    this.dialog.close(this.palletFormGroup.value);
  }

  public onCancel(event): void {
    event.preventDefault();

    this.closeForm(event);
  }
}
