import { SubManager } from '@/core/services/sub-manager/sub-manager';
import { GetAllArticlesRequestDTO } from '@/modules/articles/models/dtos/get-all-articles-request.dto';
import { Article } from '@/modules/articles/models/entities/article.entity';
import { Articles } from '@/modules/articles/services/articles/articles';
import { ElipsisText } from '@/modules/common/directives/elipsis-text/elipsis-text';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArticleTags } from '../article-tags/article-tags';
import { UserInfo } from '../user-info/user-info';

@Component({
  selector: 'app-list-articles',
  imports: [UserInfo, RouterLink, ElipsisText, ArticleTags],
  templateUrl: './list-articles.html',
  styleUrl: './list-articles.css',
  providers: [Articles, SubManager],
})
export class ListArticles implements OnInit, OnChanges, OnDestroy {
  @Input() tag: string | undefined = undefined;

  private readonly articlesService = inject(Articles);
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
    const params: GetAllArticlesRequestDTO = {
      limit: 10,
      offset,
    };
    if (this.tag) params.tag = this.tag;
    const sub = this.articlesService.getAll(params).subscribe({
      next: ({ articles, articlesCount }) => {
        this.articles.set([...this.articles(), ...articles]);
        this.noMoreItems.set(articlesCount === this.articles().length);
      },
      error: () => {
        this.errorMsg.set('Error al cargar los artículos');
      },
    });
    this.subManager.add(sub, 'get-articles');
  }

  loadMore(): void {
    this.getArticles(this.articles().length);
  }

  get isLoading(): boolean {
    return this.subManager.isLoading('get-articles');
  }
}
