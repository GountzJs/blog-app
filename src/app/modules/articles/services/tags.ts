import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Tag } from '../models/entities/tag.entity';

@Injectable()
export class Tags {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAll(): Observable<Tag> {
    return this.httpClient.get<Tag>(`${this.baseUrl}/tags`);
  }
}
