import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationSplitterComponent } from './allocation-splitter.component';

describe('AllocationSplitterComponent', () => {
  let component: AllocationSplitterComponent;
  let fixture: ComponentFixture<AllocationSplitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllocationSplitterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllocationSplitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
