import { GetAllRequestDTO } from '@/modules/articles/models/dtos/get-all-request.dto';
import { Article } from '@/modules/articles/models/entities/article.entity';
import { Articles } from '@/modules/articles/services/articles/articles';
import { InfiniteScrollComponent } from '@/modules/common/components/infinite-scroll/infinite-scroll.component';
import { SubManager } from '@/modules/common/services/sub-manager/sub-manager';
import { Component, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfo } from '../user-info/user-info';

@Component({
  selector: 'app-list-articles',
  imports: [UserInfo, RouterLink, InfiniteScrollComponent],
  templateUrl: './list-articles.html',
  styleUrl: './list-articles.css',
  providers: [Articles, SubManager],
})
export class ListArticles implements OnChanges {
  @Input() tag: string | undefined = undefined;

  private readonly articlesService = inject(Articles);
  private readonly subManager = inject(SubManager);
  articles = signal<Article[]>([]);
  errorMsg = signal('');
  noMoreItems = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tag'] && !changes['tag'].isFirstChange()) {
      this.articles.set([]);
      this.noMoreItems.set(false);
      this.getArticles(0);
    }
  }

  private getArticles(offset: number): void {
    const params: GetAllRequestDTO = {
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
