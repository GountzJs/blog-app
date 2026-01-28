import { Tags } from '@/modules/articles/services/tags/tags';
import { Icons } from '@/modules/common/components/icons/icons';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-list-tags',
  imports: [Icons],
  templateUrl: './list-tags.html',
  styleUrl: './list-tags.css',
  providers: [Tags],
})
export class ListTags implements OnInit {
  private readonly tagsService = inject(Tags);
  tags = signal<string[]>([]);
  errorMsg = signal('');
  isLoading = signal(false);

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.isLoading.set(true);
    this.tagsService
      .getAll()
      .subscribe({
        next: ({ tags }) => {
          this.tags.set(tags);
        },
        error: () => {
          this.errorMsg.set('Error al cargar las etiquetas');
        },
      })
      .add(() => this.isLoading.set(false));
  }
}
