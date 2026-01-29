import { CreateArticleRequestDTO } from '@/modules/articles/models/dtos/create-request.dto';
import { GetAllArticlesRequestDTO } from '@/modules/articles/models/dtos/get-all-articles-request.dto';
import { Article } from '@/modules/articles/models/entities/article.entity';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class Articles {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll({
    tag,
    author,
    favorited,
    limit,
    offset,
  }: GetAllArticlesRequestDTO): Observable<{ articles: Article[]; articlesCount: number }> {
    const params: Record<string, string | number | boolean> = {};
    if (tag) params['tag'] = tag;
    if (author) params['author'] = author;
    if (favorited) params['favorited'] = favorited;
    if (limit) params['limit'] = limit;
    if (offset) params['offset'] = offset;

    return this.httpClient.get<{ articles: Article[]; articlesCount: number }>(
      `${this.apiUrl}/articles`,
      {
        params,
      },
    );
  }

  create({ title, description, body, tagList }: CreateArticleRequestDTO): Observable<Article> {
    return this.httpClient.post<Article>(`${this.apiUrl}/articles`, {
      article: {
        title,
        description,
        body,
        tagList,
      },
    });
  }
}
