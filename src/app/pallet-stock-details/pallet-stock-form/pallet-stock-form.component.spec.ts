import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletStockFormComponent } from './pallet-stock-form.component';

describe('PalletStockFormComponent', () => {
  let component: PalletStockFormComponent;
  let fixture: ComponentFixture<PalletStockFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletStockFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletStockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
