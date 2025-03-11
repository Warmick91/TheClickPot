import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotDashboardComponent } from './pot-dashboard.component';

describe('PotDashboardComponent', () => {
  let component: PotDashboardComponent;
  let fixture: ComponentFixture<PotDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
