import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyModalComponent } from './buy-modal.component';

describe('BuyModalComponent', () => {
  let component: BuyModalComponent;
  let fixture: ComponentFixture<BuyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
