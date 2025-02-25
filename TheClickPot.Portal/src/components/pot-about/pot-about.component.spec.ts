import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotAboutComponent } from './pot-about.component';

describe('PotAboutComponent', () => {
  let component: PotAboutComponent;
  let fixture: ComponentFixture<PotAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PotAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
