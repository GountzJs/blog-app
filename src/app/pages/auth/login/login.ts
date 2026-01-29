import { FormLogin } from '@/modules/auth/components/form-login/form-login';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormLogin],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly router = inject(Router);

  onLoginSuccess(): void {
    this.router.navigate(['/']);
  }
}
