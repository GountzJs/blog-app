import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BtnProfile } from './btn-profile';

describe('BtnProfile', () => {
  let component: BtnProfile;
  let fixture: ComponentFixture<BtnProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(BtnProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
