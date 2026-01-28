import { TestBed } from '@angular/core/testing';
import { ArticlesFeed } from './articles-feed';

describe('ArticlesFeed', () => {
  let service: ArticlesFeed;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesFeed);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
