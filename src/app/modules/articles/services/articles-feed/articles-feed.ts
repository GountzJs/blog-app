import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { GetAllArticlesFeedRequestDTO } from '../../models/dtos/get-all-articles-feed-request.dto';
import { Article } from '../../models/entities/article.entity';

@Injectable()
export class ArticlesFeed {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll({ limit, offset }: GetAllArticlesFeedRequestDTO): Observable<{
    articles: Article[];
    articlesCount: number;
  }> {
    const params: Record<string, string | number | boolean> = {};
    if (limit) params['limit'] = limit;
    if (offset) params['offset'] = offset;

    return this.httpClient.get<{ articles: Article[]; articlesCount: number }>(
      `${this.apiUrl}/articles/feed`,
      {
        params,
      },
    );
  }
}
