import { UpdateUserRequestDTO } from '@/modules/user/models/dtos/update-user-request.dto';
import { UserEntity } from '@/modules/user/models/entities/user.entity';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class User {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  get(): Observable<{ user: UserEntity }> {
    return this.httpClient.get<{ user: UserEntity }>(`${this.apiUrl}/user`);
  }

  update({
    email,
    username,
    password,
    bio,
    image,
  }: UpdateUserRequestDTO): Observable<{ user: UserEntity }> {
    return this.httpClient.put<{ user: UserEntity }>(`${this.apiUrl}/user`, {
      user: {
        email,
        username,
        password,
        bio,
        image,
      },
    });
  }
}
