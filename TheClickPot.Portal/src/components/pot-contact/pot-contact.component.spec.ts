import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotContactComponent } from './pot-contact.component';

describe('PotContactComponent', () => {
  let component: PotContactComponent;
  let fixture: ComponentFixture<PotContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
