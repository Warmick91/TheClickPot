import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotAuthComponent } from './pot-auth.component';

describe('PotAuthComponent', () => {
  let component: PotAuthComponent;
  let fixture: ComponentFixture<PotAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PotAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
