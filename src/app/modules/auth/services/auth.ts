import { SignInRequestDTO } from '@/modules/auth/models/dtos/sign-in-request.dto';
import { SignUpRequestDTO } from '@/modules/auth/models/dtos/sign-up-request.dto';
import { UserAuthEntity } from '@/modules/auth/models/entities/user-auth.entity';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable()
export class Auth {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  signIn({ email, password }: SignInRequestDTO): Observable<{ user: UserAuthEntity }> {
    return this.httpClient.post<{ user: UserAuthEntity }>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  signUp({ email, username, password }: SignUpRequestDTO): Observable<{ user: UserAuthEntity }> {
    return this.httpClient.post<{ user: UserAuthEntity }>(`${this.apiUrl}/auth/register`, {
      email,
      username,
      password,
    });
  }
}
