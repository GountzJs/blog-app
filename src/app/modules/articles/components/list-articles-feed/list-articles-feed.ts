import { SubManager } from '@/core/services/sub-manager/sub-manager';
import { ArticleTags } from '@/modules/articles/components/article-tags/article-tags';
import { UserInfo } from '@/modules/articles/components/user-info/user-info';
import { GetAllArticlesFeedRequestDTO } from '@/modules/articles/models/dtos/get-all-articles-feed-request.dto';
import { Article } from '@/modules/articles/models/entities/article.entity';
import { ArticlesFeed } from '@/modules/articles/services/articles-feed/articles-feed';
import { ElipsisText } from '@/modules/common/directives/elipsis-text/elipsis-text';
import {
  Component,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-articles-feed',
  imports: [ElipsisText, UserInfo, ArticleTags, RouterLink],
  templateUrl: './list-articles-feed.html',
  styleUrl: './list-articles-feed.css',
  providers: [ArticlesFeed, SubManager],
})
export class ListArticlesFeed implements OnInit, OnChanges, OnDestroy {
  private readonly articlesFeedService = inject(ArticlesFeed);
  private readonly subManager = inject(SubManager);
  articles = signal<Article[]>([]);
  errorMsg = signal('');
  noMoreItems = signal(false);

  ngOnInit(): void {
    this.getArticles(0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tag'] && !changes['tag'].isFirstChange()) {
      this.articles.set([]);
      this.noMoreItems.set(false);
      this.getArticles(0);
    }
  }

  ngOnDestroy(): void {
    this.subManager.destroy();
  }

  private getArticles(offset: number): void {
    const params: GetAllArticlesFeedRequestDTO = {
      limit: 10,
      offset,
    };
    const sub = this.articlesFeedService.getAll(params).subscribe({
      next: ({ articles, articlesCount }) => {
        this.articles.set([...this.articles(), ...articles]);
        this.noMoreItems.set(articlesCount === this.articles().length);
      },
      error: () => {
        this.errorMsg.set('Error al cargar los artículos');
      },
    });
    this.subManager.add(sub, 'get-articles-feed');
  }

  loadMore(): void {
    this.getArticles(this.articles().length);
  }

  get isLoading(): boolean {
    return this.subManager.isLoading('get-articles-feed');
  }
}
