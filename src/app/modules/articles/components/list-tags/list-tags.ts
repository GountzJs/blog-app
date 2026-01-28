import { Icons } from '@/modules/common/components/icons/icons';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Tags } from '../../services/tags';

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

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getAll().subscribe({
      next: ({ tags }) => {
        this.tags.set(tags);
      },
      error: () => {
        this.errorMsg.set('Error al cargar las etiquetas');
      },
    });
  }
}
