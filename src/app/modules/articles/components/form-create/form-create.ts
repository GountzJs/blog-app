import { PubSub } from '@/core/services/pubsub/pubsub';
import { Articles } from '@/modules/articles/services/articles/articles';
import { Component, inject, signal } from '@angular/core';
import { FieldTree, form, FormField, maxLength, minLength, required } from '@angular/forms/signals';

interface FormData {
  title: string;
  description: string;
  body: string;
  tagsList: string;
}

@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.html',
  styleUrl: './form-create.css',
  imports: [FormField],
  providers: [Articles],
})
export class FormCreate {
  private readonly articlesService = inject(Articles);
  private readonly dataModel = signal<FormData>({
    title: '',
    description: '',
    body: '',
    tagsList: '',
  });
  private readonly pubsub = inject(PubSub);
  readonly formData = form(this.dataModel, (schemaPath) => {
    required(schemaPath.title, { message: 'El título es requerido' });
    minLength(schemaPath.title, 4, { message: 'El título debe tener al menos 4 caracteres' });
    maxLength(schemaPath.title, 50, { message: 'El título debe tener menos de 50 caracteres' });
    required(schemaPath.description, { message: 'La descripción es requerida' });
    minLength(schemaPath.description, 3, {
      message: 'La descripción debe tener al menos 3 caracteres',
    });
    maxLength(schemaPath.description, 80, {
      message: 'La descripción debe tener menos de 80 caracteres',
    });
    required(schemaPath.body, { message: 'El cuerpo es requerido' });
    minLength(schemaPath.body, 4, {
      message: 'El cuerpo debe tener al menos 4 caracteres',
    });
    maxLength(schemaPath.body, 120, {
      message: 'El cuerpo debe tener menos de 120 caracteres',
    });
    required(schemaPath.tagsList, { message: 'Los tags son requeridos' });
    minLength(schemaPath.tagsList, 3, {
      message: 'Los tags deben tener al menos 3 caracteres',
    });
    maxLength(schemaPath.tagsList, 40, {
      message: 'Los tags deben tener menos de 40 caracteres',
    });
  });

  private reset(): void {
    this.formData.title().setControlValue('');
    this.formData.description().setControlValue('');
    this.formData.body().setControlValue('');
    this.formData.tagsList().setControlValue('');
  }

  trimChips(e: Event) {
    const target = e.target as HTMLInputElement;
    target.value = target.value.toLowerCase().replace(/\s+/g, '');
    this.formData.tagsList().setControlValue(target.value);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.invalid) return;
    this.articlesService
      .create({
        title: this.formData.title().value(),
        description: this.formData.description().value(),
        body: this.formData.body().value(),
        tagList: this.tags,
      })
      .subscribe({
        next: () => {
          this.pubsub.publish('snackbar', {
            type: 'success',
            message: 'Artículo creado exitosamente',
          });
          this.reset();
        },
        error: () => {
          this.pubsub.publish('snackbar', {
            type: 'error',
            message: 'Error al crear el artículo, vuelva a intentarlo más tarde',
          });
        },
      });
  }

  get tags(): string[] {
    return this.formData
      .tagsList()
      .value()
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag !== '');
  }

  get invalid(): boolean {
    return this.formData().invalid();
  }

  get title(): FieldTree<string, string> {
    return this.formData.title;
  }

  get description(): FieldTree<string, string> {
    return this.formData.description;
  }

  get body(): FieldTree<string, string> {
    return this.formData.body;
  }

  get tagsList(): FieldTree<string, string> {
    return this.formData.tagsList;
  }
}
