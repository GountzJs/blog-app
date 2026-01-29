import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSnackbars } from './list-snackbars';

describe('ListSnackbars', () => {
  let component: ListSnackbars;
  let fixture: ComponentFixture<ListSnackbars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSnackbars],
    }).compileComponents();

    fixture = TestBed.createComponent(ListSnackbars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
