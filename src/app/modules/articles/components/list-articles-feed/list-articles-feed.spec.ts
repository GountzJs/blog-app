import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListArticlesFeed } from './list-articles-feed';

describe('ListArticlesFeed', () => {
  let component: ListArticlesFeed;
  let fixture: ComponentFixture<ListArticlesFeed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListArticlesFeed],
    }).compileComponents();

    fixture = TestBed.createComponent(ListArticlesFeed);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
