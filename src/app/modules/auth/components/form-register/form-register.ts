import { Session } from '@/core/services/session';
import { Auth } from '@/modules/auth/services/auth';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import {
  email,
  FieldTree,
  form,
  FormField,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';

interface FormData {
  email: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.html',
  styleUrl: './form-register.css',
  imports: [FormField, NgClass],
  providers: [Auth],
})
export class FormRegister {
  @Output() registerSuccess = new EventEmitter<void>();
  private readonly session = inject(Session);
  private readonly auth = inject(Auth);
  private readonly dataModel = signal<FormData>({
    email: '',
    username: '',
    password: '',
  });
  readonly formData = form(this.dataModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El email es requerido' });
    email(schemaPath.email, { message: 'Debe ser un email válido' });
    required(schemaPath.username, { message: 'El nombre de usuario es requerido' });
    minLength(schemaPath.username, 4, { message: 'Mínimo 4 caracteres' });
    maxLength(schemaPath.username, 50, { message: 'Máximo 50 caracteres' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 8, { message: 'Mínimo 8 caracteres' });
    maxLength(schemaPath.password, 16, { message: 'Máximo 16 caracteres' });
  });
  readonly errorMessage = signal<string | null>(null);

  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.invalid) return;
    this.errorMessage.set(null);
    this.auth
      .signUp({
        email: this.formData.email().value(),
        username: this.formData.username().value(),
        password: this.formData.password().value(),
      })
      .subscribe({
        next: ({ user }) => {
          this.session.set(user.token);
          this.registerSuccess.emit();
        },
        error: () => {
          this.errorMessage.set('No se pudo registrar el usuario, vuelva a intentarlo más tarde');
        },
      });
  }

  get invalid(): boolean {
    return this.formData().invalid();
  }

  get email(): FieldTree<string, string> {
    return this.formData.email;
  }

  get username(): FieldTree<string, string> {
    return this.formData.username;
  }

  get password(): FieldTree<string, string> {
    return this.formData.password;
  }
}
