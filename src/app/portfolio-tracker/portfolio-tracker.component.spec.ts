import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioTrackerComponent } from './portfolio-tracker.component';

describe('PortfolioTrackerComponent', () => {
  let component: PortfolioTrackerComponent;
  let fixture: ComponentFixture<PortfolioTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
