import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YourFeed } from './your-feed';

describe('YourFeed', () => {
  let component: YourFeed;
  let fixture: ComponentFixture<YourFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(YourFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
