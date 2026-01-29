import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { UserEntity } from '../../models/entities/user.entity';

@Injectable()
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  get(): Observable<{ user: UserEntity }> {
    return this.httpClient.get<{ user: UserEntity }>(`${this.apiUrl}/user`);
  }
}
