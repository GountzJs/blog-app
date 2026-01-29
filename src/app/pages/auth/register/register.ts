import { FormRegister } from '@/modules/auth/components/form-register/form-register';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormRegister, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly router = inject(Router);

  onRegisterSuccess(): void {
    this.router.navigate(['/']);
  }
}
