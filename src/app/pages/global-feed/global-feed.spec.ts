import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalFeed } from './global-feed';

describe('Home', () => {
  let component: GlobalFeed;
  let fixture: ComponentFixture<GlobalFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(GlobalFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
