import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClearTag } from './clear-tag';

describe('ClearTag', () => {
  let component: ClearTag;
  let fixture: ComponentFixture<ClearTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearTag],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
