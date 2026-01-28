import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleTags } from './article-tags';

describe('ArticleTags', () => {
  let component: ArticleTags;
  let fixture: ComponentFixture<ArticleTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleTags],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleTags);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
