import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotHomeComponent } from './pot-home.component';

describe('PotHomeComponent', () => {
  let component: PotHomeComponent;
  let fixture: ComponentFixture<PotHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
