import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalletStockDetailsComponent } from './pallet-stock-details.component';

describe('PalletStockDetailsComponent', () => {
  let component: PalletStockDetailsComponent;
  let fixture: ComponentFixture<PalletStockDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalletStockDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalletStockDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
