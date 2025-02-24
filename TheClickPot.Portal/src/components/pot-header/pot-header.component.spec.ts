import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotHeaderComponent } from './pot-header.component';

describe('PotHeaderComponent', () => {
  let component: PotHeaderComponent;
  let fixture: ComponentFixture<PotHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
