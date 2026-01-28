import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListTags } from './list-tags';

describe('ListTags', () => {
  let component: ListTags;
  let fixture: ComponentFixture<ListTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTags],
    }).compileComponents();

    fixture = TestBed.createComponent(ListTags);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
