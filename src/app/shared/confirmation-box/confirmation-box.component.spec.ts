import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationBoxComponent } from './confirmation-box.component';

describe('ConfirmationBoxComponent', () => {
  let component: ConfirmationBoxComponent;
  let fixture: ComponentFixture<ConfirmationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
