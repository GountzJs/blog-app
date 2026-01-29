import { PubSub } from '@/core/services/pubsub/pubsub';
import { Session } from '@/core/services/session/session';
import { UserStore } from '@/modules/user/services/user-store/user-store';
import { User } from '@/modules/user/services/user/user';
import { Component, inject, signal } from '@angular/core';
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
  password: string;
  username: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.html',
  styleUrl: './form-user.css',
  imports: [FormField],
  providers: [User],
})
export class FormUser {
  private readonly userStore = inject(UserStore);
  private readonly user = inject(User);
  private readonly session = inject(Session);
  private readonly pubsub = inject(PubSub);
  private readonly dataModel = signal<FormData>({
    email: this.userStore.get()?.email ?? '',
    username: this.userStore.get()?.username ?? '',
    bio: this.userStore.get()?.bio ?? '',
    image: this.userStore.get()?.image ?? '',
    password: '',
  });
  readonly formData = form(this.dataModel, (schemaPath) => {
    required(schemaPath.email, { message: 'El email es requerido' });
    email(schemaPath.email, { message: 'Debe ser un email válido' });
    required(schemaPath.username, { message: 'El username es requerido' });
    minLength(schemaPath.username, 4, { message: 'Mínimo 4 caracteres' });
    maxLength(schemaPath.username, 50, { message: 'Máximo 50 caracteres' });
    required(schemaPath.bio, { message: 'La bio es requerida' });
    minLength(schemaPath.bio, 12, { message: 'Mínimo 12 caracteres' });
    maxLength(schemaPath.bio, 120, { message: 'Máximo 120 caracteres' });
    required(schemaPath.image, { message: 'La imagen es requerida' });
    maxLength(schemaPath.image, 255, { message: 'Máximo 255 caracteres' });
    required(schemaPath.password, { message: 'La contraseña es requerida' });
    minLength(schemaPath.password, 8, {
      message: 'La contraseña debe tener al menos 8 caracteres',
    });
    maxLength(schemaPath.password, 16, {
      message: 'La contraseña debe tener menos de 16 caracteres',
    });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.invalid) return;
    this.user
      .update({
        email: this.formData.email().value(),
        username: this.formData.username().value(),
        bio: this.formData.bio().value(),
        image: this.formData.image().value(),
        password: this.formData.password().value(),
      })
      .subscribe({
        next: ({ user: { token } }) => {
          this.session.set(token);
          this.userStore.set({
            email: this.formData.email().value(),
            username: this.formData.username().value(),
            bio: this.formData.bio().value(),
            image: this.formData.image().value(),
          });
          this.pubsub.publish('snackbar', {
            type: 'success',
            message: 'Usuario actualizado correctamente',
          });
        },
        error: () => {
          this.pubsub.publish('snackbar', {
            type: 'error',
            message: 'Error al actualizar el usuario, vuelva a intentarlo más tarde',
          });
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

  get bio(): FieldTree<string, string> {
    return this.formData.bio;
  }

  get image(): FieldTree<string, string> {
    return this.formData.image;
  }

  get password(): FieldTree<string, string> {
    return this.formData.password;
  }
}
