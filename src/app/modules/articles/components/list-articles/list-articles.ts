import { GetAllRequestDTO } from '@/modules/articles/models/dtos/get-all-request.dto';
import { Article } from '@/modules/articles/models/entities/article.entity';
import { Articles } from '@/modules/articles/services/articles/articles';
import { InfiniteScrollComponent } from '@/modules/common/components/infinite-scroll/infinite-scroll.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserInfo } from '../user-info/user-info';

@Component({
  selector: 'app-list-articles',
  imports: [UserInfo, RouterLink, InfiniteScrollComponent],
  templateUrl: './list-articles.html',
  styleUrl: './list-articles.css',
  providers: [Articles],
})
export class ListArticles implements OnInit {
  private readonly articlesService = inject(Articles);
  private readonly router = inject(ActivatedRoute);
  articles = signal<Article[]>([]);
  errorMsg = signal('');
  isLoading = signal(false);
  tag = signal<string | undefined>(undefined);
  noMoreItems = signal(false);

  ngOnInit(): void {
    this.getParams();
  }

  private getParams(): void {
    this.router.params.subscribe((params) => {
      const tag = params['tag'] || undefined;
      this.tag.set(tag);
      this.getArticles(0);
    });
  }

  loadMore(): void {
    this.getArticles(this.articles().length);
  }

  getArticles(offset: number): void {
    this.isLoading.set(true);
    const params: GetAllRequestDTO = {
      limit: 10,
      offset,
    };
    if (this.tag()) params.tag = this.tag()!;
    this.articlesService
      .getAll(params)
      .subscribe({
        next: ({ articles, articlesCount }) => {
          this.articles.set([...this.articles(), ...articles]);
          this.noMoreItems.set(articlesCount === this.articles().length);
        },
        error: () => {
          this.errorMsg.set('Error al cargar los artículos');
        },
      })
      .add(() => this.isLoading.set(false));
  }
}
